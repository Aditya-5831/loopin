import { Prisma } from "@prisma/client";

export const usersDataSelect = {
  username: true,
  displayName: true,
  avatarUrl: true,
  id: true,
} satisfies Prisma.UserSelect;

export const PostDataInclude = {
  user: {
    select: usersDataSelect,
  },
} satisfies Prisma.PostInclude;

export type PostData = Prisma.PostGetPayload<{
  include: typeof PostDataInclude;
}>;

export interface PostPage {
  posts: PostData[];
  nextCursor: string | null;
}
