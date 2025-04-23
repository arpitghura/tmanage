import { hashPassword } from './hashing';

export const generateRandomHashedPassword = async () => {
  // generate password that contains 8 Characters with a combination of numbers and alphabets and a upper case letter
  const randomPassword = Math.random().toString(36).slice(-8);
  console.log(randomPassword, "randomPassword");
  return await hashPassword(randomPassword);
};
