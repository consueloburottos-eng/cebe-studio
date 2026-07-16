import { NextRequest, NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

// Local-dev-only convenience endpoint: lets ProjectMedia's click-to-upload
// overlay overwrite a project asset under public/projects/ without touching
// the terminal. Refuses to run at all outside `next dev`.
export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "solo disponible en desarrollo local" }, { status: 403 });
  }

  const form = await req.formData();
  const file = form.get("file");
  const targetPath = form.get("path");

  if (!(file instanceof File) || typeof targetPath !== "string") {
    return NextResponse.json({ error: "falta archivo o ruta" }, { status: 400 });
  }

  let normalized = path.posix.normalize(targetPath);
  if (!normalized.startsWith("/projects/") || normalized.includes("..")) {
    return NextResponse.json({ error: "ruta no permitida" }, { status: 400 });
  }

  // placeholder uploads pass an extension-less path — borrow the real one
  // from the uploaded file so the saved asset stays a valid image/video
  if (!path.extname(normalized)) {
    normalized += path.extname(file.name) || ".jpg";
  }

  const destination = path.join(process.cwd(), "public", normalized);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, Buffer.from(await file.arrayBuffer()));

  return NextResponse.json({ ok: true, path: normalized });
}
