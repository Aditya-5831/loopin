import { validateRequest } from "@/auth";
import db from "@/lib/prisma";
import { getPostDataInclude, PostPage } from "@/lib/types";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  context: { params: { userId: string } },
) => {
  try {
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
    const { userId } = await context.params;
    const pageSize = 10;

    const { user } = await validateRequest();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const posts = await db.post.findMany({
      where: { userId },
      include: getPostDataInclude(user.id),
      orderBy: { createdAt: "desc" },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const nextCursor = posts.length > pageSize ? posts[pageSize].id : null;

    const data: PostPage = {
      posts: posts.slice(0, pageSize),
      nextCursor,
    };

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
};
