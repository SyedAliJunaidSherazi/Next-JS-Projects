
//Note32: in order to access the database, we have to create Prisma Client.
// we can use the instance of prisma client for inserting, deleting, fetching data from db.
import { PrismaClient } from "@prisma/client";
export const db = new PrismaClient();

// for example, 
// db.snippet.create({
//     data:{
//         title: "Title!",
//         code: "const abc = () => {}"
//     }
// })