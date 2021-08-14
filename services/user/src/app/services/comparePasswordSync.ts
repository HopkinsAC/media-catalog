import bcrypt from 'bcryptjs';

export const comparePasswordSync = (passwordToTest: string, passwordHash: string) =>
  bcrypt.compareSync(passwordToTest, passwordHash);
