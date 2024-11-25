// Note#1: Prisma is a library that is used as a layer of any db for simplifying db transactions. we can create multiple models inside it and then we just have to migrate our changes to the real db using cmd npx prisma migrate dev.
// to initialize a db with prisma we use a cmd ->  npx prisma init --datasource-provider sqlite

import { db } from "@/db";
import Link from "next/link";

// Note#4: In Next jS, Some of our code executes on browser and some on next js sever.
// we have submit a form, its values are first passed to next js server.
// Next js server then passed them to server action function
// then as soon as we redirects the user to home or anywhere, next js send back response to display the home page ot any particular route

// Note#5: A Next js is made up of two types of components
// Client Component and Server Component
// By default, all the components in Next js that we create are Server Components
// Server Components donot requires hooks and event handlers and if you try to use them inside the server component, you will get errrors.
// It is recommeneded to use only Server components for better ui/ux and performance
// We cannot use or import a Server component inside a Client Component.
// in Server Componenets ,we can directly fetch the data from db by declaring server actions , async and can use them without the use of hooks and states such as useState and useEffect etc.
// For creating a Client Component, we have to delare a  statement 'use client" at the top of our client component file.
// A client component is a tradtional functional component of React with which we can use hooks , states and Event handlers
// Every Client component gets rendered 1 times at Next js Server when a client first request to the Next js Server.
// Only use Client component if there is a need to use hooks, states and event handlers.
// There is no need to use redux with Server components.
// Both Client and Server Components are rendered as Html file on next js file, then they are send back to browser, the html file has a script in it, its gets excetues on server and downlaods the javascript.


//Note#12: In Next for routing to  a specific page using the id of a snippet oranything, we use dynamic path by declaring folder name as [id or ay key used to fetch ur particular data].
// then inside this folder, we can make our page.tsx that will render specific data based on the dynamic id or key passed in the folder.
// then we can pass it as prop value to our component present in page.tsx file.
// It is bascially a Wild card in Next JS

// Note#16:
//We cannot define a server action inside a Client componnent, if we try to, we will have an error
//To handle this situation, we have to Scenerios
//Scenerio#1
//We can define our server action inside our parent Server component that will utlize the child client component and can pass the server action as props
// for example <EditorForm onSubmit={serverActionFunc} />
//But we cannot pass the event handlers from server comppnennt to client components, this is one exception
//Scenerio#2:
//We can create a seperate file called actions.ts, and can define all our server actions as exportabale and can simply import them in our Client components for use.

//Note #17
// when we want to use a server action inside a client component without using our formdata, instead relying on state value, there arw two ways to do so:
//Way No 1: Using bind() function
// we can just pass our server action inside the action prop of form, and when we will use bind function on our serve action funct, it will not use the form data, instead it will reply on the value of state var that we wiill just pass to it
// here is the example :
//const editSnippetAction = actions.editSnippet.bind(null, code)
// here code is the state hook value, it will utlize that instead of replying on formdata values
// <form action={editSnippetAction} /> -> here, now ir will not get the form data, instead will use state value
// this approch is usable when the user's browser have javascript as disabled to avoid fishing attacks.
// So in order to enable the user to still access our react or next app, we will use this approach.
//Way No 2: Using simple functiom with startTransition function which will direclty be called in the desired input's submit property as we are not dealing with whole formData
// here is the example
// const handleClick= () => {
//    startTransition async () =? {
//          await actions.editSnippet(code);
//      }
//}
// <button onSubmit={handleClick} />

//Note # 18:
//As we know Server Component dont execute javascript in the server, only Client component can
// Now for form validations, we have to find a way so that our server action can communicate back with our formData to let them know that hey, your form values are invalid or has some issue
// To do so, we have to use a hook from react-dom called useFormstate.
// and as we know, we can only use hooks in client component so we have to convert our server components containing form into client component in order to use useformstate. so now when we will use useformstate hook, now aas soon as formData is provided to our server action, thr formstate that will be a object with initals valeus such as message=" ", code=" " ect, will also be automaticlaly embeded with that and will be recieved my next js server along with form data
// now in order to communicqte back with formdata, we have to send values back to componetn contang error messages etc.

//Note #19:
//Next Js has 5 types of caching system. Top three really runs behind the scenes so we don't have to worry about them.
//However we have to understand the 4th one called "Full route caching system" to avoid our app running into unexpected behaviors
//So when we run our app locally in production mode, the full route caching system gets the route in our main folder "app" which is home "/" and checks whether it is static or dynamic
// if it is static , it renders the ui on that page and saves as html on our device hardrive.
//so now when ever we refresh or re-loads our page, it reads from there which is an issue if have have updated the ui component , it will still read from drive and render that.
// when we run "npm run build", next will tell us which route is static and which dynamic.
// the circle shape icon tells about static routes
// the lambda shape icon tells about dynamic routes
// Next determines  whether a route is dynamic when we do follwing things
//1. when we are trying to fetch data
//2. when we are using wild card in routes, means using id or anything
// when we are setting or deleting a cookie etc
// whwn aew doing some search query
// when are exporting "force-dynamic" or setting revalidate var to 0.

// Note #20
// There are three ways to control caching in Next js
//1. Time-based  (we use it, when the data is contineosly changing and updating, for example front page of Reddit website.in that case we can simple export special var using "export const revalidate=x (eg: 3)", it tell next to update the wdiget by fetching data after every 3 seconds and ignore the cached data)
//2. On-Demand   (we use it when we exaclty know, when our data will change or modify, fo example when the server actions for edit or delete snippet is called. so we can ignore cached data when required. For this, we can import, revalidate path function then that pass our route inside the function "revalidate("/snippets")")
//3. Disable Caching (we use it, when we dont know when the data will be changed. For example when Next js Server used outside api like google maps etc, in that case we exportthe special var to 0 to disable caching completely like this: "export const revalidate=0" or "export const dynamic="force-dynamic" )

// Note #21
// We can still covery our dynamic routes marked as lambda using Generative Static params
// for example if we have a route for edit like /snippet[id], if we use generative static params, it will convert our route into a collection and each value in the collection value have a static value like /snippet[1], /snippet[2], etc, and they all be cached and now it has been converted to static route
export default async function Home() {

  // this will return list of snippet objects
  const snippets = await db.snippet.findMany();
  const renderedSnippets = snippets.map((snippet) => {
    // we can use Link component from Next js for navigating to our individual snippet component
    // we can replace a div with Link
    // return (
    //   <div key={snippet.id}>
    //     {snippet.title}
    //   </div>);
    return (
      <Link key={snippet.id} className="flex justify-between items-center p-2 border rounded" href={`/snippets/${snippet.id}`}>
        <div> {snippet.title}</div>
        <div> View</div>


      </Link>);

  });

  return (
    <div>
      <div className="flex m-2 justify-between items-center">
        <h1 className="text-xl font-bold">Snippets</h1>
        <Link className="border p-2 rounded" href={"/snippets/new"}>New</Link>
        
      </div>
      <div className="flex flex-col gap-2">
        {renderedSnippets}
      </div>
    </div>

  );
}
