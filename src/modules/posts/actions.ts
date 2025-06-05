"use server";

import { validateRequest } from "@/auth";
import db from "@/lib/prisma";
import { getPostDataInclude } from "@/lib/types";
import { createPostSchema } from "@/lib/validation";

export const submitPost = async (input: string) => {
  const { user } = await validateRequest();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { content } = createPostSchema.parse({ content: input });

  const newPost = await db.post.create({
    data: {
      content,
      userId: user.id,
    },
    include: getPostDataInclude(user.id),
  });

  return newPost;
};

export const deletePost = async (id: string) => {
  const { user } = await validateRequest();

  if (!user) {
    throw Error("Unauthorized");
  }

  const post = await db.post.findUnique({
    where: { id },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  if (post.userId !== user.id) {
    throw new Error("Unauthorized");
  }

  const deletedPost = await db.post.delete({
    where: { id },
    include: getPostDataInclude(user.id),
  });

  return deletedPost;
};
