export async function GET(request){
    const {searchParams} = new URL(request.url);
    const fileUrl = searchParams.get("url");
  
    if (!fileUrl) {
        return new Response("Missing URL", { status: 400 });
    }

    const res = await fetch(fileUrl)
    const blob = await res.arrayBuffer();

 
  return new Response(blob, {
    headers: {
      "Content-Type": res.headers.get("content-type") || "application/octet-stream",
      "Access-Control-Allow-Origin": "*",
    },
  });
}