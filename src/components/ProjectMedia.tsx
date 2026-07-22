"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MediaAsset } from "@/data/projects";
import MediaPlaceholder from "./MediaPlaceholder";

// dead-code-eliminated from production builds — Next inlines NODE_ENV at build time
const DEV_UPLOAD_ENABLED = process.env.NODE_ENV === "development";

type UploadCacheEntry = MediaAsset & { version: number };

function readUploadCache(path?: string): UploadCacheEntry | null {
  if (!path || typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(`cb-dev-upload:${path}`);
    return raw ? (JSON.parse(raw) as UploadCacheEntry) : null;
  } catch {
    return null;
  }
}

function writeUploadCache(path: string, entry: UploadCacheEntry) {
  try {
    window.localStorage.setItem(`cb-dev-upload:${path}`, JSON.stringify(entry));
  } catch {
    // ignore — worst case the tile just won't remember across reloads
  }
}

type ProjectMediaProps = {
  media?: MediaAsset;
  label: string;
  className?: string;
  compact?: boolean;
  sizes?: string;
  // dev-only: destination to save a file when there's no media yet, e.g.
  // "/projects/my-slug/cover" (no extension — the upload route appends the
  // real one). Lets placeholder tiles accept an upload too.
  uploadPath?: string;
  // "cover" (default) fills the parent box, cropping the photo. "natural"
  // instead fixes the height and lets width follow the photo's own aspect
  // ratio, for strips where each photo's real proportions should show.
  fit?: "cover" | "natural";
};

export default function ProjectMedia({
  media,
  label,
  className = "",
  compact = false,
  sizes = "100vw",
  uploadPath,
  fit = "cover",
}: ProjectMediaProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const identityPath = media?.src ?? uploadPath;
  const [cached, setCached] = useState<UploadCacheEntry | null>(null);

  // an upload writes the file to disk fine, but without this a remount
  // (navigating away and back) forgets it ever happened: an overwritten
  // existing file still shows the browser's stale cached bytes, and a
  // placeholder upload reverts to "no media" since project data itself
  // never changes. localStorage makes it survive navigation and reloads.
  useEffect(() => {
    if (!DEV_UPLOAD_ENABLED || !identityPath) return;
    const found = readUploadCache(identityPath);
    if (found) setCached(found);
  }, [identityPath]);

  const effectiveMedia = media ?? (cached ? { type: cached.type, src: cached.src } : undefined);
  const canUpload = false;

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !identityPath) return;
    const form = new FormData();
    form.append("file", file);
    form.append("path", identityPath);
    const res = await fetch("/api/dev-upload", { method: "POST", body: form });
    if (!res.ok) {
      alert(`No se pudo subir el archivo: ${await res.text()}`);
      return;
    }
    const { path: savedPath }: { path: string } = await res.json();
    const entry: UploadCacheEntry = {
      type: file.type.startsWith("video/") ? "video" : "image",
      src: savedPath,
      version: Date.now(),
    };
    writeUploadCache(identityPath, entry);
    setCached(entry);
  }

  const uploadOverlay = canUpload && (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        className="hidden"
        onChange={handleFile}
      />
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          inputRef.current?.click();
        }}
        title="Subir archivo (solo en desarrollo local)"
        className="absolute inset-0 z-10 flex items-center justify-center bg-black/0 text-[13px] font-semibold text-transparent transition hover:bg-black/45 hover:text-white"
      >
        subir archivo
      </button>
    </>
  );

  if (!effectiveMedia) {
    return (
      <div className={`relative h-full ${fit === "natural" ? "w-[340px] flex-none" : "w-full"} ${className}`}>
        <MediaPlaceholder label={label} compact={compact} />
        {uploadOverlay}
      </div>
    );
  }

  const src = cached ? `${effectiveMedia.src}?v=${cached.version}` : effectiveMedia.src;

  if (effectiveMedia.type === "video") {
    return (
      <div className={`relative h-full ${fit === "natural" ? "w-auto flex-none" : "w-full"} ${className}`}>
        <video
          className={`h-full ${fit === "natural" ? "w-auto" : "w-full"} object-cover`}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          aria-label={label}
        />
        {uploadOverlay}
      </div>
    );
  }

  if (fit === "natural") {
    return (
      <div className={`relative h-full w-auto flex-none ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img key={cached?.version ?? 0} src={src} alt={label} className="h-full w-auto object-contain" />
        {uploadOverlay}
      </div>
    );
  }

  return (
    <div className={`relative h-full w-full ${className}`}>
      <Image
        key={cached?.version ?? 0}
        src={src}
        alt={label}
        fill
        sizes={sizes}
        className="object-cover"
        unoptimized={DEV_UPLOAD_ENABLED || effectiveMedia.src.endsWith(".gif")}
      />
      {uploadOverlay}
    </div>
  );
}
