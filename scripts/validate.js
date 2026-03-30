const { z } = require("zod");
const fs = require("fs");

const dateSchema = z
  .string()
  .regex(
    /^(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-\d{4}$/,
    "Date must be in DD-MM-YYYY format with valid day (01-31) and month (01-12)",
  );

const auditSchema = z
  .object({
    provider: z.string().min(1),
    report: z.url().max(150),
    date: dateSchema,
  })
  .strict();

const contractSchema = z
  .object({
    name: z.string().min(1).max(50),
    version: z.number().int().nonnegative(),
    language: z.enum(["PLUTUS", "NATIVESCRIPT"]),
    languageVersion: z.number().int().nonnegative(),
    scriptHash: z
      .string()
      .length(56)
      .regex(/^[0-9a-f]{56}$/, "Must be a 56-character hex string"),
    github: z.url().max(100).optional(),
    description: z.string().max(140).optional(),
    audit: z.array(auditSchema).optional(),
  })
  .strict();

const schema = z
  .object({
    projectName: z.string().min(1).max(50),
    labelPrefix: z.string().min(1).max(16),
    github: z.url().max(100).optional(),
    website: z.url().max(100).optional(),
    twitter: z.string().max(100).optional(),
    discord: z.string().max(100).optional(),
    category: z
      .enum([
        "DEX",
        "DEFI",
        "REALFI",
        "MARKETPLACE",
        "NFT",
        "GAMING",
        "TOKEN",
        "ORACLE",
        "TOOLS",
        "EDUCATIONAL",
      ])
      .optional(),
    description: z.string().max(140).optional(),
    contracts: z.array(contractSchema).min(1),
  })
  .strict();

const files = fs
  .readdirSync("./projects")
  .filter((file) => file.endsWith(".json"));

const errors = [];

for (const filePath of files) {
  const contents = fs.readFileSync(`./projects/${filePath}`, "utf8");

  let data;
  try {
    data = JSON.parse(contents);
  } catch (e) {
    errors.push(e.message);
    console.log(`Invalid JSON in ${filePath}: ${e.message}\n`);
    continue;
  }

  const result = schema.safeParse(data);
  if (!result.success) {
    const errs = result.error.issues.map(
      (issue) => `${issue.path.join(".")}: ${issue.message}`,
    );
    errors.push(...errs);
    console.log(`Validation failed for ${filePath}\n${errs.join("\n")}\n`);
  }
}

if (errors.length) {
  process.exit(1);
}
