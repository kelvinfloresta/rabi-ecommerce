import { compareSync, hashSync, genSaltSync } from 'bcryptjs';

export default class Encrypt {
  public static compare(encodedPassword: string, value: string): boolean {
    return compareSync(value, encodedPassword);
  }

  public static encrypt(value: string) {
    const salt = genSaltSync();
    return hashSync(value, salt);
  }
}
