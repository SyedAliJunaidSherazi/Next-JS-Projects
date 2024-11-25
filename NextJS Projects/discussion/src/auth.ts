//Note #1:
/**
The Prisma Adapter is a package for integrating Prisma with NextAuth.js (now referred to as @auth). It allows you to use Prisma, a popular ORM (Object-Relational Mapping) tool, to manage your application's database in a way that is compatible with NextAuth's requirements for handling user authentication and session management.
Key Features of the Prisma Adapter
Database Abstraction: The Prisma Adapter maps NextAuth's models (such as users, accounts, and sessions) directly to database tables, making it easy to interact with your database.
ORM Convenience: By using Prisma, you get a robust ORM for your database that enables type-safe database operations in your application.
Flexibility: The Prisma Adapter supports a variety of databases that Prisma supports, such as PostgreSQL, MySQL, SQLite, and MongoDB (experimental support), allowing you to use the database best suited to your needs.
Scalability: The adapter is designed to scale well with Prisma’s query optimization features and supports advanced queries for handling sessions and accounts in NextAuth.
Why Use the Prisma Adapter?
NextAuth.js provides several adapters to allow different databases or ORMs to be used for managing user data. The Prisma Adapter is especially useful if:

You already use Prisma in your project.
You want type safety and ease of use for interacting with the database.
You need to easily define and manage relationships between models (like Users, Sessions, and Accounts) that NextAuth uses.
 we need specific models in our prisma schema file inorder to work with prisma adapter. for that, we can refer to the official documentation
 */


import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import {db} from "@/db";

// const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
// const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

const GITHUB_CLIENT_ID = "Ov23liKn5pWfCcbNwfpJ";
const GITHUB_CLIENT_SECRET = "f2f53a8d6366402141c17272829e9d4660d38558";

if(!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET){
    throw new Error("Misssing Github oauth credentials");
}

// Here will be do some configuration of Next Auth like registering a adaptor to it and github for auth

// we will finally export it and will get neccessary functions directly from Github Servers using object destructuring from NextAuth
// auth will tell use about the existance of user
export const { handlers:{GET,POST}, auth, signOut, signIn}= NextAuth({
    adapter: PrismaAdapter(db),
    providers:[
        GitHub(
            {
                clientId: GITHUB_CLIENT_ID,
                clientSecret: GITHUB_CLIENT_SECRET
            }
        )
    
    ],
    callbacks:{
        // Usually not needed. here we are fixing a bug in nextauth
        async session({session, user} : any){

            if(session && user){
                session.user.id = user.id;
            }
            return session;

        }
    }
})