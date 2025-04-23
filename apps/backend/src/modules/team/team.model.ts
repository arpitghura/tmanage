import { prisma } from '../../core/prismaClient';
import { MEMBER, Roles, TEAM_LEAD } from '../../interfaces/auth/roles.interface';

export const TeamModel = {
  create: async (name: string, description: string | undefined, organizationId: string, createdById: string) => {
    return prisma.team.create({
      data: {
        name,
        description,
        organization: { connect: { id: organizationId } },
        // members: {
        //   create: {
        //     user: { connect: { id: createdById } },
        //     organization: { connect: { id: organizationId } },
        //     role: TEAM_LEAD,
        //   },
        // },
      },
    });
  },

  getTeamDetails: async (teamId: string) => {
    return prisma.team.findUnique({
      where: {
        id: teamId,
      },
    });
  },

  checkMembershipByEmail: async (teamId: string, userId: string) => {
    return prisma.teamMember.findUnique({
      where: {
        teamId_userId: {
          teamId,
          userId,
        },
      },
    });
  },

  addMember: async (teamId: string, organizationId: string, userId: string) => {
    return prisma.teamMember.create({
      data: {
        team: { connect: { id: teamId } },
        user: { connect: { id: userId } },
        organization: { connect: { id: organizationId } },
        role: MEMBER,
      },
    });
  },

  createInvitation: async (organizationId: string, memberEmail: string, role: Roles, invitationToken: string, teamId: string) => {
    return prisma.organizationInvitation.create({
      data: {
        organization: { connect: { id: organizationId } },
        user: { connect: { email: memberEmail } },
        team: { connect: { id: teamId } },
        role,
        invitationToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days expiration
      },
    });
  },

  removeMember: async (teamId: string, userId: string) => {
    return prisma.teamMember.delete({
      where: {
        teamId_userId: {
          teamId,
          userId,
        },
      },
    });
  },
};
