// 'use server'
//  import * as auth from "@/auth";

//  // this is optional but highly recomended  to make server actions for signin and signout
//  export async function signin() {
//     // pass the provider name inthe constructor of function
//     return auth.signIn("github");
    
//  }

//  export async function signOut() {
//     return auth.signOut();
    
//  }


// 'use server' ensures this code is executed on the server side
// 'use server'

// import { signIn as nextAuthSignIn, signOut as nextAuthSignOut } from "next-auth/react";

// // SignIn function to handle authentication via GitHub provider
// export async function signin(): Promise<void> {
//   // Pass the provider name in the signIn function
//   await nextAuthSignIn("github");
// }

// // SignOut function to handle sign out
// export async function signOut(): Promise<void> {
//   await nextAuthSignOut();
// }


// we can export our server action here
export {createComment} from "./create-comment";
export {createPost} from "./create-post";
export {createTopic} from "./create-topic";