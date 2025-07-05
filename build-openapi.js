const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config(); // load .env

const templatePath = './api.template.yaml';
const outputPath = './api.yaml';

let content = fs.readFileSync(templatePath, 'utf8');

Object.keys(process.env).forEach((key) => {
  const value = process.env[key];
  content = content.replace(new RegExp(`\\$\\{${key}\\}`, 'g'), value);
});

fs.writeFileSync(outputPath, content);
console.log(`✅ Generated ${outputPath} from template`);
