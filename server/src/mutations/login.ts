import { comparePassword, createJWT } from "../modules/auth.js";
import { MutationResolvers } from "../types";

export const login: MutationResolvers["login"] = async (
  _,
  { email, password },
  { dataSources }
) => {
  try {
    const user = await dataSources.db.user.findUniqueOrThrow({
      where: {
        email,
      },
    });

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = createJWT({
      id: user.id,
      username: user.username,
    });

    return {
      code: 200,
      message: "User logged in successfully.",
      success: true,
      token,
    };
  } catch (e) {
    return {
      code: 400,
      message: (e as Error).message,
      success: false,
      token: null,
    };
  }
};
