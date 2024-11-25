//Note#13
// now we can pass the id or whatever key you want to use as prop in the server component that we to render the information
// what every type of key you passes , in this case it is a number, Next js precieves it as String.
//{ params: { id: '1' }, searchParams: {} }
// so we might have to convert it to int or whatever type we want.
// also the id name will deponds on what name we give to it
// for example if we renamed id=> snippetId, THEN we will get follwing console
// //{ params: { snippetId: '1' }, searchParams: {} }

import { db } from "@/db";
import Link from "next/link";
// IN CASE of no value returned from prisma, we can redirect the user to page provided by Next Js that will display 404 error
import { notFound } from "next/navigation";
import * as actions from "@/actions";


//Note#14
// Best practices in typescript is always define teh type of any object instead of using any.
// so we will define a interface for it

interface ShowSnippetPageProps {
    params: {
        id: string
    }
}

export default async function ShowSnippetPage(props: ShowSnippetPageProps) {

    // we added a artifical delay of 2 sec just for testing our loading page
    await new Promise((r) => setTimeout(r, 2000));

    const snippet = await db.snippet.findFirst({
        where: { id: parseInt(props.params.id) }
    })
    
    console.log(props);
    if (!snippet) {
        return notFound();
    }
    const deleteSnippetAction = actions.deleteSnippet.bind(null, snippet.id);
    return (
        <div className="flex flex-col m-4 gap-4">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold">{snippet.title}</h1>
                <div className="flex items-center space-x-4">
                    <Link href={`/snippets/${snippet.id}/edit`} className="p-2 border rounded">
                        Edit
                    </Link>
                    <form action={deleteSnippetAction}>
                        <button type="submit" className="p-2 border rounded">
                            Delete
                        </button>
                    </form>
                </div>

            </div>

            <pre className="p-3 border rounded bg-gray-200 border-gray-200">
                <code>
                    {snippet.code}
                </code>
            </pre>
        </div>
    )

}

export async function generateStaticParams(){

    // next will exceute this function and will set the pages with multiple routes with values like 1, 2, ect and cach them all. as we know, next used widl card as String, so we have to convert it to string
    const snippets = await db.snippet.findMany();
    return snippets.map((snippet)=>{
        return {
            id: snippet.id.toString(),
        }

    })

}
