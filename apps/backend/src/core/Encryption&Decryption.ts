import CryptoJS from 'crypto-js';
import { ENCRYPTION_SECRET_KEY, StatusCode, SALT_ROUNDS } from '../config';
import bcrypt from 'bcryptjs';

export class EncryptionAndDecryption {
  static encryptionKey: any = ENCRYPTION_SECRET_KEY;

  public static encryption(body: any) {
    return CryptoJS.AES.encrypt(JSON.stringify(body), EncryptionAndDecryption.encryptionKey).toString();
  }

  public static decryption(body: any) {
    try {
      if (body) {
        console.log('EncryptionAndDecryption.encryptionKey', EncryptionAndDecryption.encryptionKey);
        const bytes = CryptoJS.AES.decrypt(body, EncryptionAndDecryption.encryptionKey);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      } else {
        return {};
      }
    } catch (err) {
      return StatusCode.INVALID_ENCRYPTED_INPUT;
    }
  }

  public static saltEncryption(data: any) {
    return new Promise((resolve, reject) => {
      bcrypt
        .hash(data, SALT_ROUNDS)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public static saltCompare(data: any, hash: any): any {
    return new Promise((resolve, reject) => {
      bcrypt
        .compare(data, hash)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
