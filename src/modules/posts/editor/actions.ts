"use server";

import { validateRequest } from "@/auth";
import db from "@/lib/prisma";
import { createPostSchema } from "@/lib/validation";

export const submitPost = async (input: string) => {
  const { user } = await validateRequest();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { content } = createPostSchema.parse({ content: input });

  await db.post.create({
    data: {
      content,
      userId: user.id,
    },
  });
};
