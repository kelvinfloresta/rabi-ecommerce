import bcrypt from 'bcryptjs';
import { IEncrypt } from './IEncrypt';

export class Encrypt implements IEncrypt {
  private bcrypt = bcrypt;

  public compare(encodedPassword: string, value: string): boolean {
    return this.bcrypt.compareSync(value, encodedPassword);
  }

  public encrypt(value: string): string {
    const salt = this.bcrypt.genSaltSync();
    return this.bcrypt.hashSync(value, salt);
  }
}
