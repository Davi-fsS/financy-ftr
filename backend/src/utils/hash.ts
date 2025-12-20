import bcryptjs from "bcryptjs";

export const hashPassword = async (plainPassword: string) : Promise<string> => {
    const salt = await bcryptjs.genSalt(10);

    return bcryptjs.hash(plainPassword, salt);
}