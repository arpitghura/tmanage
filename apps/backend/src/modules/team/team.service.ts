import { BasicError } from '../../core/ApiError';
import { MEMBER } from '../../interfaces/auth/roles.interface';
import { EmailService } from '../../utils/email/email.util';
import { invitationTemplate } from '../../utils/email/templates/invitation.template';
import { generateRandomHashedPassword } from '../../utils/password';
import { OrganizationModel } from '../org/organization.model';
import { TeamModel } from './team.model';
import { v4 as uuidv4 } from 'uuid';

export class TeamService {
  async createTeam(name: string, description: string, organizationId: string, createdById: string) {
    const isOrgExist = await OrganizationModel.getOrganization(organizationId);

    if (!isOrgExist) {
      throw new BasicError('Organization not found');
    }

    console.log('Organization exists', { isOrgExist }, organizationId, isOrgExist.id === organizationId);

    const team = await TeamModel.create(name, description, organizationId, createdById);
    return team;
  }

  async addTeamMember(organizationId: string, teamId: string, memberEmail: string) {
    // Check if user exists in the team / organization
    const userId = await OrganizationModel.getUserIdByEmail(memberEmail);
    if (!userId) {
      throw new BasicError('User does not exist');
    }

    const isUserExistInTeam = await TeamModel.checkMembershipByEmail(teamId, userId.id);
    if (isUserExistInTeam) {
      throw new BasicError('User is already a part of the team');
    }

    // Check if user exists in the organization
    // const isUserExistInOrg = await OrganizationModel.checkMembershipByEmail(organizationId, memberEmail);
    // if (!isUserExistInOrg) {
    //   throw new BasicError('User is not a part of the organization');
    // }

    // Add user to the team
    const teamMemberData = await TeamModel.addMember(teamId, organizationId, memberEmail);
    return teamMemberData;
  }

  async inviteMember(organizationId: string, teamId: string, memberEmail: string) {
    const isOrgExist = await OrganizationModel.getOrganization(organizationId);

    if (!isOrgExist) {
      throw new BasicError('Organization not found');
    }

    const isTeamExist = await TeamModel.getTeamDetails(teamId);

    if (!isTeamExist) {
      throw new BasicError('Team not found');
    }

    const user = await OrganizationModel.checkMembershipByEmail(organizationId, memberEmail);
    const invitationToken = uuidv4();
    if (user) {
      // Scenario 1: User exists in the system

      await TeamModel.addMember(teamId, organizationId, user.id);
      // sent a mail regarding the addition in the team
      return 'Member added Successfully.';
    } else {
      const isUserExistInSystem = await OrganizationModel.getUserIdByEmail(memberEmail);
      console.log('isUserExistInSystem', isUserExistInSystem);
      if (!isUserExistInSystem) {
        // Scenario 2: User does not exist in the system
        const hashedRandomPassword = await generateRandomHashedPassword();
        const first_name = memberEmail.split('@')[0];
        const last_name = '';

        // Add user and create invitation concurrently
        await OrganizationModel.createUser(first_name, last_name, memberEmail, hashedRandomPassword, invitationToken);
      } else {
        await OrganizationModel.updateUser(isUserExistInSystem?.id, invitationToken);
      }
      await TeamModel.createInvitation(organizationId, memberEmail, MEMBER, invitationToken, teamId);
      await this.sendInvitationEmail(memberEmail, isTeamExist?.name, invitationToken);
      return 'Invitation sent successfully';
    }
  }

  async acceptInvitation(invitationToken: string) {
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
    return 'Invitation accepted successfully';
  }

  async removeTeamMember(teamId: string, memberEmail: string) {
    const user = await TeamModel.checkMembershipByEmail(teamId, memberEmail);

    if (!user) {
      throw new BasicError('User is not a part of the team');
    }

    await TeamModel.removeMember(teamId, user?.id);
  }

  async sendInvitationEmail(email: string, teamName: string, invitationToken?: string) {
    const EmailData = {
      email: email,
      subject: 'Invitation to join the Team',
      html: invitationTemplate(email, teamName, invitationToken, true),
    };
    await EmailService.sendEmail(EmailData);
  }
}
