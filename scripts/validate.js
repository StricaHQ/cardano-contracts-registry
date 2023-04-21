const Joi = require("joi").extend(require("@joi/date"));
const fs = require("fs");

const auditSchema = Joi.object({
  provider: Joi.string().required(),
  report: Joi.string().required(),
  date: Joi.date().format("DD-MM-YYYY").required(),
});

const contractSchema = Joi.object({
  name: Joi.string().max(25).required(),
  version: Joi.number().required(),
  language: Joi.string().valid("PLUTUS", "NATIVESCRIPT").required(),
  languageVersion: Joi.number().required(),
  scriptHash: Joi.string().length(56).required(),
  github: Joi.string().max(80),
  description: Joi.string().max(140),
  audit: Joi.array().items(auditSchema),
});

const schema = Joi.object({
  projectName: Joi.string().max(30).required(),
  labelPrefix: Joi.string().max(16).required(),
  website: Joi.string().max(35),
  twitter: Joi.string().max(16),
  discord: Joi.string().max(40),
  category: Joi.string().valid(
    "DEX",
    "DEFI",
    "REALFI",
    "MARKETPLACE",
    "NFT",
    "GAMING",
    "TOKEN",
    "ORACLE"
  ),
  description: Joi.string().max(140),
  contracts: Joi.array().items(contractSchema),
});

const files = fs
  .readdirSync("./projects")
  .filter((file) => file.endsWith(".json"));

const errors = [];

for (const filePath of files) {
  const contents = fs.readFileSync(`./projects/${filePath}`, "utf8");
  const data = JSON.parse(contents);
  const result = schema.validate(data, { abortEarly: false });
  if (result.error) {
    const errs = result.error.details.map((detail) => detail.message);
    errors.push(...errs);
    console.log(`Validation failed for ${filePath}\n${errs.join("\n")}\n`);
  }
}

if (errors.length) {
  process.exit(1);
}
