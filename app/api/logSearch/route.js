import postgres from "postgres";
import { NextResponse } from "next/server";

const sql = postgres(process.env.DATABASE_URL, {
  ssl: "require",
});


export async function POST(req) {
  try {
    const { searchParams } = new URL(req.url);

    const tags = searchParams.get("tags");
    const rating = searchParams.get("rating");
    const score = searchParams.get("score");
    const upload = searchParams.get("upload");

    if (!tags && !rating && !score && !upload) {
      return NextResponse.json({ ok: true });
    }

    await sql`
      INSERT INTO searches (tags, rating, score, upload)
      VALUES (${tags}, ${rating}, ${score}, ${upload})
    `;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
