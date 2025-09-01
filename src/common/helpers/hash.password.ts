import { compare, hash } from "bcryptjs";

export const hashPassword = async (password: string): Promise<string> => {
   return await hash(password, 10);
};

export const comparePassword = async (password: string, hashPassword: string): Promise<boolean> => {
   return await compare(password, hashPassword);
};
