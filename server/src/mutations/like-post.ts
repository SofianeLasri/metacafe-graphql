import { MutationResolvers } from "../types";

export const likePost: MutationResolvers["likePost"] = async (
  _,
  { postId },
  { dataSources, user }
) => {
  if (!user) {
    throw new Error("Unauthenticated");
  }

  const liker = await dataSources.db.user.findUnique({
    where: { id: user.id },
  });

  const post = await dataSources.db.post.findUnique({
    where: { id: postId },
    include: { author: true },
  });

  if (!post) {
    throw new Error("Invalid post");
  }

  await dataSources.db.like.create({
    data: {
      post: { connect: { id: postId } },
      user: { connect: { id: liker.id } },
    },
  });

  return {
    code: 200,
    message: "Like registered successfully.",
    success: true,
  };
};
