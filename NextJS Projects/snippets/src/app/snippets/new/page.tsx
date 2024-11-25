
'use client'
import { useFormState } from "react-dom";
import * as actions from "@/actions";
export default function SnippetCreatePage() {

    const [formState, action] = useFormState(actions.createSnippet, {message: ""});

    // Note#3: In next, Server Actions are one way to change the data in the database
    // they are super close to html forms
    // they are functions that are direclty called with values inside the html forms
    // A server action, for beginners, now as we need form validations, so no need to keep it here, we will move our action to actions file
    //  async function createSnippet(formData: FormData) {
    //     //1:  this needs to be a server action
    //     // this is non javascript statment  specific to next. when next js sees a asyn function with this statmnt, it preceives it as a server action
    //     'use server';

    //     //2: Check the user's input and make sure they are valid

    //     // cz we have same id names in input, it will direclty get the value using those id
    //     const title = formData.get('title') as string;
    //     const code = formData.get('code') as string;

    //     //3:  Create a new record in the database using prisma client

    //     const snippet = await db.snippet.create({
    //         data:{
    //             title,
    //             code,
    //         }
    //     })

    //     console.log(snippet);

    //     //4:Redirect the user back to the root Route
    //     redirect('/');
        
    //  }
    return (
        <form action={action}>
            <h3 className="font-bold m-3">Create a Snippet</h3>
            <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                    <label className="w-12" htmlFor="title">
                        Title
                    </label>
                    <input
                        name="title"
                        className="border rounded p-2 w-full"
                        id="title"
                    />
                </div>
                <div className="flex gap-4">
                    <label className="w-12" htmlFor="code">
                        Code
                    </label>
                    <textarea
                        name="code"
                        className="border rounded p-2 w-full"
                        id="code"
                    />
                </div>
                {formState.message? <div className="my-2 p-2 bg-red-200 border rounded border-red-400">{formState.message}</div>: null}
                
                <button type="submit" className="rounded p-2 bg-blue-200">Create</button>

            </div>

        </form>

    )
}
