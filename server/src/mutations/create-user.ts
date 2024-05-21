import { createJWT, hashPassword } from "../modules/auth.js";
import { MutationResolvers } from "../types.js";

export const createUser: MutationResolvers["createUser"] = async (
  _,
  { email, username, password },
  { dataSources }
) => {
  try {
    const user = await dataSources.db.user.create({
      data: {
        email,
        username,
        password: await hashPassword(password),
      },
    });

    return {
      code: 201,
      message: "User created successfully.",
      success: true,
      user,
      token: createJWT({
        id: user.id,
        username: user.username,
      }),
    };
  } catch (e) {
    return {
      code: 400,
      message: (e as Error).message,
      success: false,
    };
  }
};
