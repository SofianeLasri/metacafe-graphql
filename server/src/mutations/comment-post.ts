import { MutationResolvers } from "../types";

export const commentPost: MutationResolvers["commentPost"] = async (
  _,
  { postId, body },
  { dataSources, user }
) => {
  if (!user) {
    throw new Error("Unauthenticated");
  }

  const commentAuthor = await dataSources.db.user.findUnique({
    where: { id: user.id },
  });

  const post = await dataSources.db.post.findUnique({
    where: { id: postId },
    include: { author: true },
  });

  if (!post) {
    throw new Error("Invalid post");
  }

  const comment = await dataSources.db.comment.create({
    data: {
      body,
      post: { connect: { id: postId } },
      user: { connect: { id: commentAuthor.id } },
    },
  });

  return { ...comment, user: commentAuthor, post };
};
