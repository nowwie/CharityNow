export function slugify(text?: string) {
  if (!text || typeof text !== "string") return "untitled";

  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
