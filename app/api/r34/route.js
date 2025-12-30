import { NextResponse } from "next/server";
import { fetchPosts } from "@/app/actions/fetchPost";

const limit = 20;

export async function POST(req) {
  try {
    const { pageNumber, tags } = await req.json();

    console.log("TAGS:", tags);

    const res = await fetchPosts(pageNumber, tags, limit);

    if (typeof res === "string") {
      return NextResponse.json(
        { error: "Invalid API key" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      posts: res,
      hasMore: res.length === limit,
    });

  } catch (err) {
    console.error("Fetch error:", err);
    return NextResponse.json(
      { posts: [], hasMore: false },
      { status: 500 }
    );
  }
}
