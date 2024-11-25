import PostCreateForm from "@/app/components/common/posts/post-create-form";
import { fetchPostsByTopicSlug } from "@/db/queries/post";
import PostList from "@/app/components/posts/post-list";

interface ShowTopicPageProps {
  params: {
    slug: string;
  };
}

export default async function ShowTopicPage({ params }: ShowTopicPageProps) {
  // Await params if necessary (ensure async is being handled properly)
  const { slug } = await params;  // Ensures the params are properly awaited
// we will use our postlist component  here and will pass the function with slug
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-2">{slug}</h1>
        <PostList fetchData={()=> fetchPostsByTopicSlug(slug)}/>
      </div>
      <div>
        <PostCreateForm slug={slug} />
      </div>
    </div>
  );
}
