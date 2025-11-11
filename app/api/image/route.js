import { NextResponse } from "next/server";

export async function GET(request) {
    const {searchParams} = new URL(request.url);
    const imageUrl = searchParams.get("url");

    try{
    const res = await fetch(imageUrl);
    const blob = await res.blob();
    return new NextResponse(blob , {
        headers : {
            "Content-Type" : res.headers.get("content-type") || "image/jpeg",
            "Cache-Control" : "public , max-age=86400",
        },
    });
}
catch (err){
    return new NextResponse("Failed to load image", {status : 500});
}
}