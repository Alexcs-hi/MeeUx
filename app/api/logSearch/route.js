import postgres from "postgres";
import { NextResponse } from "next/server";

const sql = postgres(process.env.DATABASE_URL, {
  ssl: "require",
  max: 1,
});

export async function POST(req) {
  try {
    const { tags, rating, score, upload } = await req.json();

    if (!tags && !rating && !score && !upload) {
      return NextResponse.json({ ok: true });
    }

    await sql`
      INSERT INTO searches (tags, rating, score, upload)
      VALUES (${tags}, ${rating}, ${score}, ${upload})
    `;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("SEARCH LOG ERROR:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
