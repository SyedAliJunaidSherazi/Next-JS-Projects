// Note #15:
// We will keep all our Client Components that has to use hooks and event handlers in a seperate folder called components inside src folder

// this import will return the type of the model that we have impored and already created my primsa, in this case snippets

// we can use editor from monaco to eidt the code

'use client'
import { Editor } from "@monaco-editor/react"
import { Snippet } from "@prisma/client"
import { useState } from "react"
// it is a way to access all actions inside the actions file by using actions.actionname
import * as actions from "@/actions"
interface SnippetEditFormProps{
    snippet: Snippet
}

// here object destructuring has been used to passs snippet form props, its smillet to props.snippet
export default function SnippetEditForm( {snippet}: SnippetEditFormProps ) {

    const [code, setCode] = useState(snippet.code);

  const handleEditorChange = (value: string="") => {
    setCode(value);
    console.log(value);
  }

  // using Approach 1 by using bind function
  const editSnippetAction  =actions.editSnippet.bind(null, snippet.id, code);
  return (
    <div>
     <Editor
     height="40vh"
     defaultLanguage="javascript"
     theme="vs-dark"
     defaultValue={snippet.code}
     options={{minimap: {enabled: false}}}
     onChange={handleEditorChange}
     />
     <form action={editSnippetAction}>
      <button type="submit" className="p-2 border rounded">Save</button>

     </form>
    </div>
  )
}
