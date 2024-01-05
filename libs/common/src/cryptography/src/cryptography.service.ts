import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class CryptographyService {
  private SALT_ROUNDS = 10;

  async hash(stringToHash: string): Promise<string> {
    return await bcrypt.hash(stringToHash, this.SALT_ROUNDS);
  }

  async compareStrings(stringOne: string, stringTwo: string): Promise<boolean> {
    return await bcrypt.compare(stringOne, stringTwo);
  }
}
