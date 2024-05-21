import { Resolvers } from "./types.js";

const users = [
  {
    id: "user#1",
    username: "user1",
    password: "123",
  },
];

const posts = [
  {
    id: "post#1",
    title: "Post 1",
    content: "Content 1",
    authorId: "user#1",
  },
  {
    id: "post#2",
    title: "Post 2",
    content: "Content 2",
    authorId: "user#1",
  },
];

export const resolvers: Resolvers = {
  Query: {
    users: () => users,
    posts: () =>
      posts.map((post) => {
        const author = users.find((user) => user.id === post.authorId)!;

        return { ...post, author };
      }),
  },
  Mutation: {
    createUser: (_, { username, password }) => {
      const user = { id: `user#${users.length + 1}`, username, password };
      users.push(user);

      return user;
    },
  },
};
