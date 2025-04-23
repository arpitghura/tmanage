import { BasicError, ConflictError } from '../../core/ApiError';
import { hashPassword, verifyPassword } from '../../utils/hashing';
import { signJWT, verifyJWT } from '../../utils/jwt';
import { OrganizationModel } from '../org/organization.model';
import { AuthModel } from './auth.model';

export class AuthService {
  async signup(first_name: string, last_name: string, email: string, password: string) {
    const isUserExist = await AuthModel.checkUserExistence(email);

    if (isUserExist) {
      throw new ConflictError('User already exists');
    }

    const hashedPassword = await hashPassword(password);

    const user: any = await AuthModel.createUser(first_name, last_name, email, hashedPassword);

    return `${user.role} created successfully`;
  }

  async signin(email: string, password: string) {
    const isUserAlreadyExist = await AuthModel.checkUserExistence(email);

    if (!isUserAlreadyExist) {
      throw new BasicError('User does not exist');
    }

    const isCorrectPassword = await verifyPassword(password, isUserAlreadyExist.password);

    if (!isCorrectPassword) {
      throw new BasicError('Incorrect Password');
    }

    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24-hour token expiry

    const token = signJWT(
      { userId: isUserAlreadyExist.id, email: isUserAlreadyExist.email, validUpto: expiresAt },
      {
        expiresIn: '24h', // Token expiry period
      },
    );

    await AuthModel.createSession(token, isUserAlreadyExist.id, expiresAt);

    const result = {
      userId: isUserAlreadyExist.id,
      token: token,
      role: isUserAlreadyExist.role,
    };

    return result;
  }

  async signout(token: string) {
    const decoded = verifyJWT(token);

    if (!decoded) {
      throw new BasicError('Invalid Token');
    }

    await AuthModel.expireSession(token);

    return 'Logged out successfully';
  }

  async resetPassword(email: string, password: string) {
    const userId = await OrganizationModel.getUserIdByEmail(email);

    if (!userId) {
      throw new BasicError('User not found');
    }

    const hashedPassword = await hashPassword(password);

    await AuthModel.resetPassword(userId.id, hashedPassword);

    return 'Password reset successfully';
  }
}
