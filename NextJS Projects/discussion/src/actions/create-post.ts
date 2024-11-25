"use server";
"use server";
import { z } from "zod";
import type { Post } from "@prisma/client";
import paths from "@/paths";
import { db } from "@/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";


const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});

interface CreateActionStateProps {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}
export async function createPost(
  slug: string,
  userId: string,
  actionState: CreateActionStateProps,
  formData: FormData
): Promise<CreateActionStateProps> {
  // now we can get our final output using safe parse function of zod.
  // in case of sucess, it will return a success true flag along with valid data object
  // in case of failure, it will return success false flag along with error object
  // we can safe the return object in our result variable as follow
  const result = createPostSchema.safeParse({
    title: formData.get("title") || "", // Fallback to an empty string if `null`
    content: formData.get("content") || "", // Fallback to an empty string if `null`
  });
  // in case of errors, we will return error object will list of errors for name or deacription
  if (!result.success) {
    // using flatten().fieldErrrors function direclty tells the actual errors instead of whole list of errors.
    console.log(result.error.flatten().fieldErrors);
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
// here using slug, we are finding if a particular topic exists in db
  const topic = await db.topic.findFirst({
    where: {slug}
  })
  if(!topic){
    return {
        errors: {
            _form: ["Cannot find topic"]
        }
    }
  }
  let post: Post;
  try{
    post = await db.post.create({
        data:{
            title: result.data.title,
            content:result.data.content,
            userId,
            topicId:topic.id,
           
        }
    })

  }catch(err: unknown){
    if(err instanceof Error){
        return {
            errors:{
                _form: [err.message]
            }
        }
    }else{
        return{
            errors:{
                _form:["Failed to create Post"]
            }
        }
    }
  }
 // here we will revalidate our path for updating cache
  revalidatePath(paths.topicShow(slug));
  // here we will redirect to the post we have just created
  redirect(paths.postShow(slug, post.id));

  return {
    errors: {},
  };
}
