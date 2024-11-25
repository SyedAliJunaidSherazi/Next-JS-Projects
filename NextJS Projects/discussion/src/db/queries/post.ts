import { Post } from "@prisma/client";
import { db } from "@/db";



export type PostWithData = (
    Post & {
        topic: {slug:string};
        user: {name: string | null};
        _count: {comments: number};
    }
)

// this is one way to automate the return type of any db query
// it will use the return type of the passwed function inside it and it will check each item type in the list using [number]
// for using it, there is no need to specifcy the return type Promise for the db function
// export type PostWithData = Awaited<ReturnType<typeof fetchPostsByTopicSlug>>[number];

// here we will use a prisma query to find post and additional data
export function fetchPostsByTopicSlug(slug: string): Promise<PostWithData[]> {
    return db.post.findMany({
        where: {
            topic: {
                slug: slug,
            },
        },
        include: {
            topic: {
                select: { slug: true },
            },
            user: {
                select: { name: true },
            },
            _count: {
                select: { comments: true },
            },
        },
    });
}

export async function fetchTopPosts(limit: number = 10): Promise<PostWithData[]> {
    return db.post.findMany({
      orderBy: [
        {
          comments: {
            _count: 'desc', // Sort posts by the number of comments in descending order
          },
        },
      ],
      take: limit, // Limit the number of posts returned
      include: {
        topic: {
          select: { slug: true },
        },
        user: {
          select: { name: true },
        },
        _count: {
          select: { comments: true },
        },
      },
    });
  }