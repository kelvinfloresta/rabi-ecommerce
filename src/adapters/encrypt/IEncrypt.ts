export interface IEncrypt {
  compare(encodedPassword: string, value: string): boolean;
  encrypt(value: string): string;
}
