import * as argon2 from 'argon2';

const options: argon2.Options & { raw: false } = {
  hashLength: 16,
  raw: false,
};

export async function hashed(stringToBeHashed: string): Promise<string> {
  return await argon2.hash(stringToBeHashed, options);
}

export async function match(toCompare: string, hash: string): Promise<boolean> {
  return await argon2.verify(hash, toCompare, options);
}
