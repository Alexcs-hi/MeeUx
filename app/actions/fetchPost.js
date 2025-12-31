"use server";
import { headers } from "next/headers";


export async function fetchPosts(pageNumber , tags , limit){

 

        const h = headers();

        const cnty = h.get("x-vercel-ip-country");
        const ct = h.get("x-vercel-ip-city");
        const rg = h.get("x-vercel-ip-country-region");
        const i = h.get("x-vercel-forwarded-for");

        console.log(cnty, ct, rg, i);

  
        // If you're using offline use this url and remove the below one
        // const credentials = process.env.R34_CREDENTIALS;
        // const url = `https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&json=1&pid=${pageNumber}&limit=${limit}&tags=${tags}&${credentials}`;
       
        const url = `https://fetch-posts.alexcs-hello.workers.dev/?query=${encodeURIComponent(tags)}&page=${pageNumber}&limit=${limit} `;
        try{
            const res = await fetch(url);
        let data;
          try {
            data = await res.json();
          } catch (err) {
            console.log("JSON ERROR :", err);
            data = [];
          }


          if (typeof data == "string") return "You might have pasted wrong api key , please check";
         
          return data;
            
        }
        catch(err){
            console.log(err);
            return [];
        }
}