const fs = require("fs");
const path = require("path");

const schemaDir = path.join("prisma", "schema");
const outputFile = path.join("prisma", "schema.prisma");

const files = fs
  .readdirSync(schemaDir)
  .filter((file) => file.endsWith(".prisma"))
  .sort();

let content = "";

for (const file of files) {
  content += fs.readFileSync(path.join(schemaDir, file), "utf8");
  content += "\n\n";
}

fs.writeFileSync(outputFile, content);
console.log("✅ Prisma schema generated");