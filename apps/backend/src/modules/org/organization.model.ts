import { prisma } from '../../core/prismaClient';
import { ORG_HEAD, Roles } from '../../interfaces/auth/roles.interface';

export const OrganizationModel = {
  create: async (name: string, description: string | undefined, createdById: string) => {
    return prisma.organization.create({
      data: {
        name,
        description,
        createdBy: { connect: { id: createdById } },
      },
    });
  },

  addMember: async (organizationId: string, userId: string, role: string) => {
    return prisma.organizationMember.create({
      data: {
        organization: { connect: { id: organizationId } },
        user: { connect: { id: userId } },
        role,
      },
    });
  },

  createInvitation: async (organizationId: string, memberEmail: string, role: Roles, invitationToken: string) => {
    return prisma.organizationInvitation.create({
      data: {
        organization: { connect: { id: organizationId } },
        user: { connect: { email: memberEmail } },
        role,
        invitationToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days expiration
      },
    });
  },

  removeMember: async (organizationId: string, userId: string) => {
    return prisma.organizationMember.delete({
      where: {
        organizationId_userId: {
          organizationId,
          userId,
        },
      },
    });
  },

  updateMemberRole: async (organizationId: string, userId: string, role: Roles) => {
    return prisma.organizationMember.update({
      where: {
        organizationId_userId: {
          organizationId,
          userId,
        },
      },
      data: { role },
    });
  },

  getAdminDetails: async (organizationId: string) => {
    return prisma.organizationMember.findMany({
      where: {
        organizationId: organizationId,
        role: ORG_HEAD,
      },
      include: {
        user: true,
      },
    });
  },

  checkMembership: async (organizationId: string, userId: string) => {
    return prisma.organizationMember.findUnique({
      where: { organizationId_userId: { organizationId: organizationId, userId: userId } },
    });
  },

  checkMembershipByEmail: async (organizationId: string, email: string) => {
    return prisma.organizationMember.findFirst({
      where: { organizationId: organizationId, user: { email: email } },
    });
  },

  getUserIdByEmail: async (email: string) => {
    return prisma.user.findUnique({
      where: { email: email },
      select: { id: true },
    });
  },

  getOrganization: async (id: string) => {
    return prisma.organization.findUnique({
      where: { id },
    });
  },

  getInvitation: async (invitationToken: string) => {
    return prisma.organizationInvitation.findUnique({
      where: { invitationToken },
    });
  },

  getInvitationByEmail: async (organizationId: string, email: string) => {
    return prisma.organizationInvitation.findUnique({
      where: {
        organizationId_email: {
          email: email,
          organizationId: organizationId,
        },
      },
    });
  },

  deleteInvitation: async (invitationToken: string) => {
    return prisma.organizationInvitation.update({
      where: { invitationToken },
      data: { acceptedAt: new Date() },
    });
  },

  acceptInvitation: async (invitationToken: string, email: string) => {
    return prisma.user.update({
      where: { email },
      data: { updatedAt: new Date(), is_accept_invitation: true, OrganizationInvitation: { connect: { invitationToken } } },
    });
  },

  createUser: async (first_name: string, last_name: string, email: string, password: string, invitation_token: string) => {
    return prisma.user.create({
      data: {
        first_name,
        last_name,
        email,
        password,
        invitation_token,
        is_invited: true,
      },
    });
  },

  updateUserInvitation: async (userId: string, invitation_token: string) => {
    return prisma.user.update({
      where: { id: userId },
      data: {
        invitation_token,
        is_invited: true,
      },
    });
  },

  updateUser: async (id: string, invitation_token: string) => {
    return prisma.user.update({
      where: { id },
      data: {
        invitation_token,
        is_invited: true,
      },
    });
  },
};
