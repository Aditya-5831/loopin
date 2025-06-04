import { validateRequest } from "@/auth";
import db from "@/lib/prisma";
import { PostDataInclude } from "@/lib/types";

export const GET = async () => {
  try {
    const { user } = await validateRequest();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 404 });
    }

    const posts = await db.post.findMany({
      include: PostDataInclude,
      orderBy: { createdAt: "desc" },
    });

    return Response.json(posts);
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal sever error" }, { status: 500 });
  }
};
