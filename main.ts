// gta6-meme-x-01: the entry's program. It copies POST.json, which names the
// X post carrying the GTA 6 meme, from this repository into the output dir.
// That is all it has to do: the house reads the post itself from X.
// Run locally: mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? ".";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const src = join(botDir, "POST.json");

const text = readFileSync(src, "utf8");
const post = JSON.parse(text);
if (typeof post.url !== "string" || !post.url.startsWith("https://")) {
  throw new Error("POST.json must hold an https url to the X post");
}

mkdirSync(outDir, { recursive: true });
copyFileSync(src, join(outDir, "POST.json"));
console.log(`copied POST.json -> ${join(outDir, "POST.json")} (${post.url})`);
