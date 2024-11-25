'use server'
import {z} from "zod";
import type { Topic } from "@prisma/client";
import paths from "@/paths";
import { db } from "@/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";


const createTopicSchema  = z.object({
    name: z.string().min(3).regex(/[a-z]/, {message:"Must be lowercase letters or dashes without spaces"}),
    description: z.string().min(10)
})

interface CreateActionStateProps{
    errors:{
        name?: string[],
        description? : string[],
        _form?: string[],
    }

}
export async function createTopic(actionState: CreateActionStateProps, formData: FormData): Promise<CreateActionStateProps> {

// we will add a short delay while creating a topic to give user a feel of something is getting created
    // await new Promise(resolve=> setTimeout(resolve, 2500));



    // const name = formData.get('name');
    // const description  = formData.get('description');
    // console.log(name, description);

    // now we can get our final output using safe parse function of zod.
    // in case of sucess, it will return a success true flag along with valid data object
    // in case of failure, it will return success false flag along with error object
    // we can safe the return object in our result variable as follow
    const result =createTopicSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description')
    })
    // in case of errors, we will return error object will list of errors for name or deacription
    if(!result.success){
        // using flatten().fieldErrrors function direclty tells the actual errors instead of whole list of errors.
        console.log(result.error.flatten().fieldErrors);
        return {
            errors: result.error.flatten().fieldErrors
        }
    }
    // here we are creating a topic in db using parsed values from result object, that zod has returned
    let topic: Topic;
    try{
        topic = await db.topic.create({
            data:{
                slug: result.data.name,
                description: result.data.description
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
            return {
                errors:{
                    _form: ['Something went wrong']
                }
            }
        }

    }
    revalidatePath('/');
    redirect(paths.topicShow(topic.slug));
   
}