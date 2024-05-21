import { comparePassword, createJWT } from "../modules/auth.js";
import { MutationResolvers } from "../types";

export const signIn: MutationResolvers["login"] = async (
  _,
  { username, password },
  { dataSources }
) => {
  try {
    const user = await dataSources.db.user.findUniqueOrThrow({
      where: {
        username,
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
      message: "User has been signed in",
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
