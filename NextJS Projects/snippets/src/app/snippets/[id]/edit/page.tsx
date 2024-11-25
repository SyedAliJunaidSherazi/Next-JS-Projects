// Note#14
// For editing we have created a folder name edit inside our dynamic path folder [id], as page file is inside this folder, it will also recieved the id as props in its server component

import SnippetEditForm from "@/components/snippet-edit-form";
import { db } from "@/db";
import { notFound } from "next/navigation";

interface EditSnippetPageProps{
    params: {
        id: string
    }
}
export default async function EditSnippetPage(props: EditSnippetPageProps) {
    const id = parseInt(props.params.id);
    const snippet = await db.snippet.findFirst({
        where: {id}
    })
    if(!snippet){
        notFound()
    }

    // we can call a client component inside our server component to pass down our fetched snippet as prop
    // so bascially our client component also gets rendered on server and the example is down below
    // our server comppnent is basically renderening the html returned by Next js server when client component got rendered on Next js server
  return (
    <SnippetEditForm  snippet={snippet}/>
   
  )
}
