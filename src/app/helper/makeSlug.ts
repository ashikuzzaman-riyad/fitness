export default function makeSlug(text: string): string {
  return text
    .toLowerCase() // convert to lowercase
    .trim() // remove extra spaces
    .replace(/[^a-z0-9\s-]/g, "") // remove special characters
    .replace(/\s+/g, "-"); // replace spaces with hyphens
}