import fs from "fs";
import path from "path";
import GalleryClient from "./GalleryClient";

export default function PoolGallery() {
  // Read all image filenames from the public/pool-pics directory (server-side)
  const imagesDir = path.join(process.cwd(), "public", "pool-pics");
  let imageFiles: string[] = [];
  try {
    imageFiles = fs.readdirSync(imagesDir).filter((file) =>
      /\.(jpe?g|png)$/i.test(file)
    );
  } catch {
    imageFiles = [];
  }
  // Remove duplicates (case-insensitive)
  const seen = new Set<string>();
  const uniqueFiles = imageFiles.filter((file) => {
    const lower = file.toLowerCase();
    if (seen.has(lower)) return false;
    seen.add(lower);
    return true;
  });

  // Group by prefix before first _ or -
  const groups: Record<string, string[]> = {};
  uniqueFiles.forEach((file) => {
    const match = file.match(/^([^_-]+)/);
    const group = match?.[1] ?? "Other";
    if (!groups[group]) groups[group] = [];
    groups[group].push(file);
  });

  return <GalleryClient groups={groups} />;
}
