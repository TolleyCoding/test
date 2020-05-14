const toml = require("toml");
const fs = require("fs");

let config;

try {
    config = toml.parse(fs.readFileSync("./config/config.toml", "utf-8"));
} catch (e) {
    console.error("Parsing error config on line " + e.line + ", column " + e.column +
      ": " + e.message);
}

module.exports.config = config;
