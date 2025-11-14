import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  if (
    request.headers.get("Authorization") !==
    `Basic ${process.env.REVALIDATE_SECRET}`
  ) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { path } = await request.json();

  revalidatePath(path);

  return new Response("Revalidated", { status: 200 });
}
