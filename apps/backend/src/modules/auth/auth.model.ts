import { prisma } from '../../core/prismaClient';

export class AuthModel {
  static async createUser(first_name: string, last_name: string, email: string, password: string) {
    return await prisma.user.create({
      data: {
        first_name,
        last_name,
        email,
        password,
      },
      select: {
        id: true,
        role: true,
        is_invited: true,
        is_accept_invitation: true,
        invitation_token: true,
        is_not_allowed: true,
        is_su_user:true,
        email: true,
      }
    });
  }

  static async checkUserExistence(email: string) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        role: true,
        password: true,
        is_invited: true,
        is_accept_invitation: true,
        invitation_token: true,
        is_not_allowed: true,
        is_su_user:true,
        email: true,
      }
    });
  }

  static async createSession (sessionToken: string, userId: string, expiresAt: Date) {
    return await prisma.session.create({
      data: {
        sessionToken,
        userId,
        expiresAt,
        isLoggedIn: true,
      },
    });
  }

  static async expireSession (sessionToken: string) {
    return await prisma.session.update({
      where: { sessionToken },
      data: { isLoggedIn: false, expiresAt: new Date() },
    });
  }

  static async resetPassword (id: string, password: string) {
    return await prisma.user.update({
      where: { id },
      data: { password },
    });
  }
};
