import { MutationResolvers } from "../types";

export const createPost: MutationResolvers["createPost"] = async (
  _,
  { title, content },
  { dataSources, user }
) => {
  if (!user) {
    throw new Error("Unauthenticated");
  }

  const post = await dataSources.db.post.create({
    data: {
      title,
      content,
      author: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  const author = await dataSources.db.user.findUnique({
    where: { id: user.id },
  });

  return { ...post, author };
};
