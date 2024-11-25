'use server'
import { db } from "@/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

// we will pass a formstate as arg to as we have to validate th values 
export async function createSnippet(state: { message: string }, formData: FormData) {

    try {
        const title = formData.get('title')
        const code = formData.get('code')

        if (typeof title !== 'string' || title.length < 3) {
            return { message: 'Title must be longer' };

        }
        if (typeof code !== 'string' || code.length < 10) {
            return { message: 'Code must be longer' };

        }
        await db.snippet.create({
            data: {
                title,
                code,
            }
        })

    } catch (err: unknown) {
        if(err instanceof Error){
            return {message: err.message};
        }else{
            return {message: "Something went wrong..."}
        }

    }
    // we will use revalidate for create as we are creating a new snippet
     revalidatePath("/")
    // we cannot keep redirect func inside rry cartch as next caputres it as an error when we try to redirectt the user to any other route
    redirect('/');

}

export async function editSnippet(id: number, code: string) {

    await db.snippet.update({
        where: { id },
        data: { code }
    }) 
    // but we will use revalidate func to discrd chache for a particular  route showing updated snippet
    revalidatePath(`/snippets/${id}`);
// we will not use revalidate for edit as when are just updatng the code value of snippet, not entirely changing the snippet like creatng or deleting it
    redirect(`/snippets/${id}`);

}
export async function deleteSnippet(id: number) {
    await db.snippet.delete({
        where: { id }
    });

    // we will use revalidate for create as we are deleting an entire snippet
    revalidatePath("/")
    redirect("/");
}