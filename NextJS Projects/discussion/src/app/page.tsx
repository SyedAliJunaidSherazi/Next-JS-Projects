//Note#1
/*
Recommended Initial Design for any Next App that we want to create

1. Identify all the different routes you want your app to have + the data that each shows.
2. Make 'path helper' functions.
3. Create your routing folders + page.tsx files based on step #1.
4. Identify the places where data changes in your app.
5. Make empty server actions for each of those.   
6. Add in comments on what paths you'll need to revalidate for each server action.
*/

import TopicCreateForm from "./components/topics/topic-create-form";
import TopicsList from "./components/topics/topic-list";
import { Divider } from "@nextui-org/react";
import PostList from "./components/posts/post-list";
import { fetchTopPosts } from "@/db/queries/post";
//Note#2:
//Path helpers are funtions that returns dynamic paths for our pages so that we can update them from one place only

//Note#3:
//Slug it a term used in Web Development to indicate a save name for some resource such as a subject name (eg: Javascript, Golang etc)

// Note#4:
//we can create seprate files for each server actions

// Note#5:
// We will use install and use Zod library for input validation
// for validating any particulare schema, we can create a schema and wrap it inside zod object and can apply validation on feilds according to our requirements

//Note#6:
// For fetching data from db, we have two options:
//1 Get data in parent page and pass it down to child component
//(Easier to make child components resuable but slower page load speed)
//2: Child Component fetches its own data
//(Faster page load, but components less resuable)
//1.5: Hybrid appoarch between option 1 and 2
//(Parent components can decide what data to fetch , children to fetch)
//(parent component will just import a specific query function and will pass it as prop in its child component with all required values and arguments, and the child component, on receiving the function will fetch the data itself)
// each option has its own pros and cons.

// import Profile from "./components/profile";
export default function Home() {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-xl m-2 pt-2">Top Posts</h1>
        <PostList fetchData={()=> fetchTopPosts()}/>
      </div>
      <div className="border shadow py-3 px-2">
        <TopicCreateForm/>
        <Divider className="my-2"/>
        <h3 className="text-lg">Topics</h3>
        <TopicsList/>
      </div>
    
    </div>
  );
}
