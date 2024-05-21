import { hashPassword } from "../modules/auth.js";
import { MutationResolvers } from "../types.js";

export const createUser: MutationResolvers["createUser"] = async (
  _,
  { email, username, password },
  { dataSources }
) => {
  const user = await dataSources.db.user.create({
    data: {
      email,
      username,
      password: await hashPassword(password),
    },
  });

  return user;
};
