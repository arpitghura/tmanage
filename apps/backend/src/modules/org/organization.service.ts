import { BasicError } from '../../core/ApiError';
import { MEMBER, ORG_HEAD, Roles } from '../../interfaces/auth/roles.interface';
import { EmailService } from '../../utils/email/email.util';
import { invitationTemplate } from '../../utils/email/templates/invitation.template';
import { generateRandomHashedPassword } from '../../utils/password';
import { TeamModel } from '../team/team.model';
import { OrganizationModel } from './organization.model';
import { v4 as uuidv4 } from 'uuid';

export class OrganizationService {
  async createOrganization(name: string, description: string | undefined, userId: string) {
    // Create the organization
    const organization = await OrganizationModel.create(name, description, userId);
    return organization;
  }

  async addAdmin(organizationId: string, userId: string) {
    // Add the user as the head of the organization
    await OrganizationModel.addMember(organizationId, userId, ORG_HEAD);
    return 'Admin Added Successfully';
  }

  async addMember(organizationId: string, userEmail: string) {
    // Get the user id from the email
    const userId = await OrganizationModel.getUserIdByEmail(userEmail);

    if (!userId) {
      throw new BasicError('User not found, Invite the user.');
    }
    // Check if the user is already a member of the organization
    const isUserExistinOrg = await OrganizationModel.checkMembership(organizationId, userId.id);

    if (isUserExistinOrg) {
      throw new BasicError('User already a member of the organization');
    }
    const member = await OrganizationModel.addMember(organizationId, userId.id, MEMBER);
    return member;
  }

  async removeMember(organizationId: string, memberEmail: string) {
    const userId = await OrganizationModel.getUserIdByEmail(memberEmail);

    if (!userId) {
      throw new BasicError('User not found');
    }

    const adminDetails = await OrganizationModel.getAdminDetails(organizationId);

    adminDetails.some((admin: { userId: any }) => {
      if (admin?.userId === userId.id) {
        throw new BasicError('Cannot delete admin');
      }
    });
    // Remove the user from the organization
    await OrganizationModel.removeMember(organizationId, userId.id);

    return 'Member removed successfully';
  }

  async updateRole(organizationId: string, memberEmail: string, role: Roles) {
    const userId = await OrganizationModel.getUserIdByEmail(memberEmail);

    if (!userId) {
      throw new BasicError('User not found');
    }

    const adminDetails = await OrganizationModel.getAdminDetails(organizationId);
    adminDetails.some((admin: { userId: any }) => {
      if (admin?.userId === userId.id) {
        throw new BasicError('Cannot update role of the admin');
      }
    });

    await OrganizationModel.updateMemberRole(organizationId, userId.id, role);
    return 'Member role updated successfully';
  }

  async inviteMembersInOrg(organizationId: string, memberEmail: string, role: Roles) {
    const user = await OrganizationModel.getUserIdByEmail(memberEmail);
    const invitationToken = uuidv4();
    if (user) {
      // Scenario 1: User exists in the system

      // check if invitation already exists
      const existingInvitation = await OrganizationModel.getInvitationByEmail(organizationId, memberEmail);
      console.log(existingInvitation, 'existingInvitation');

      if (existingInvitation?.acceptedAt === null) {
        throw new BasicError('Invitation already sent');
      }

      const isUserExistInOrg = await OrganizationModel.checkMembershipByEmail(organizationId, memberEmail);

      if (isUserExistInOrg) {
        throw new BasicError('User is already a part of the organization');
      }

      await Promise.all([
        OrganizationModel.updateUserInvitation(user.id, invitationToken),
        OrganizationModel.createInvitation(organizationId, memberEmail, role, invitationToken),
        this.sendInvitationEmail(memberEmail, organizationId),
        console.log('Invitation sent successfully for Existing User'),
      ]);

      return 'Invitation sent successfully';
    } else {
      // Scenario 2: User does not exist in the system
      const hashedRandomPassword = await generateRandomHashedPassword();
      const first_name = memberEmail.split('@')[0];
      const last_name = '';

      // Add user and create invitation concurrently
      await OrganizationModel.createUser(first_name, last_name, memberEmail, hashedRandomPassword, invitationToken);
      await Promise.all([OrganizationModel.createInvitation(organizationId, memberEmail, role, invitationToken), this.sendInvitationEmail(memberEmail, organizationId, invitationToken)]);
      return 'Invitation sent successfully';
    }
  }

  async acceptInvite(invitationToken: string) {
    const invitation = await OrganizationModel.getInvitation(invitationToken);
    console.log(invitation, 'invitation');
    if (!invitation) {
      throw new BasicError('Invalid invitation token');
    }

    if (invitation.acceptedAt) {
      throw new BasicError('Invitation already accepted');
    }

    if (invitation.expiresAt < new Date()) {
      throw new BasicError('Invitation expired');
    }

    const updUser = await OrganizationModel.acceptInvitation(invitation.invitationToken, invitation.email);

    await Promise.all([OrganizationModel.addMember(invitation.organizationId, updUser.id, invitation.role), OrganizationModel.deleteInvitation(invitationToken)]);

    if (invitation.teamId !== null) {
      await TeamModel.addMember(invitation.teamId, invitation.organizationId, updUser.id);
    }

    return 'Invitation accepted successfully';
  }

  private sendInvitationEmail = async (email: string, organizationId: string, invitationToken?: string) => {
    const orgData = await OrganizationModel.getOrganization(organizationId);

    if (!orgData) {
      throw new BasicError('Organization not found');
    }

    const EmailData = {
      email: email,
      subject: 'Invitation to join the organization',
      html: invitationTemplate(email, orgData?.name, invitationToken, false),
    };
    await EmailService.sendEmail(EmailData);
  };
}
