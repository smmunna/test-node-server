#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to create a module
function createModule(moduleName) {
  if (!moduleName) {
    console.error('❌ Please provide a module name!');
    return;
  }

  // Ensure basePath points to 'src/app/modules' no matter where the script is run from
  const basePath = path.join(__dirname, '..', 'src', 'app', 'modules', moduleName);

  // Check if the directory already exists
  if (fs.existsSync(basePath)) {
    console.error(`❌ Module "${moduleName}" already exists!`);
    return;
  }

  // Create the module directory
  fs.mkdirSync(basePath, { recursive: true });
  console.log(`✅ Created module directory at ${basePath}`);

  // Define files to be created with predefined content
  const files = [
    {
      name: `${moduleName}.interface.ts`,
      content: `// Creating ${moduleName} interface with their fields and data type\n\ninterface ${capitalize(moduleName)} {\n    // username: string;\n    // Add other fields here\n}\n\nexport default ${capitalize(moduleName)};`
    },
    {
      name: `${moduleName}.model.ts`,
      content: `// Creating ${moduleName} interface\n\nimport { Schema, model } from 'mongoose';\nimport ${capitalize(moduleName)} from './${moduleName}.interface';\n\n// Creating Schema\nconst ${moduleName}Schema = new Schema<${capitalize(moduleName)}>({\n    // name: { type: String, required: true },\n});\n\n// Creating a Model\nconst ${moduleName}Model = model<${capitalize(moduleName)}>('${capitalize(moduleName)}', ${moduleName}Schema);\n\nexport default ${moduleName}Model;`
    },
    {
      name: `${moduleName}.controller.ts`,
      content: `import { NextFunction, Request, Response } from 'express';\n\nconst index${capitalize(moduleName)} = async (req: Request, res: Response, next: NextFunction) => {\n    // Add your contents here...\n};\nconst create${capitalize(moduleName)} = async (req: Request, res: Response, next: NextFunction) => {\n    // Add your contents here...\n};\nconst edit${capitalize(moduleName)} = async (req: Request, res: Response, next: NextFunction) => {\n    // Add your contents here...\n};\nconst update${capitalize(moduleName)} = async (req: Request, res: Response, next: NextFunction) => {\n    // Add your contents here...\n};\nconst delete${capitalize(moduleName)} = async (req: Request, res: Response, next: NextFunction) => {\n    // Add your contents here...\n};\n\nexport const ${capitalize(moduleName)}Controller = {\n    index${capitalize(moduleName)},\n    create${capitalize(moduleName)},\n    edit${capitalize(moduleName)},\n    update${capitalize(moduleName)},\n    delete${capitalize(moduleName)},\n};`
    },
    {
      name: `${moduleName}.route.ts`,
      content: `import express from 'express';\nimport { ${capitalize(moduleName)}Controller } from './${moduleName}.controller';\n\nconst router = express.Router();\n\nrouter.get('/', ${capitalize(moduleName)}Controller.index${capitalize(moduleName)})\nrouter.post('/', ${capitalize(moduleName)}Controller.create${capitalize(moduleName)})\nrouter.get('/:id', ${capitalize(moduleName)}Controller.edit${capitalize(moduleName)})\nrouter.put('/:id', ${capitalize(moduleName)}Controller.update${capitalize(moduleName)})\nrouter.delete('/:id', ${capitalize(moduleName)}Controller.delete${capitalize(moduleName)})\n\nexport const ${moduleName}Routes = router;`
    },
    {
      name: `${moduleName}.service.ts`,
      content: `import ${capitalize(moduleName)} from './${moduleName}.interface';\nimport ${capitalize(moduleName)}Model from './${moduleName}.model';\n\nconst createToDB = async (${moduleName.toLowerCase()}: ${capitalize(moduleName)}) => {\n    // Add your contents here...\n};\n\nconst editToDB = async () => {\n    // Add your contents here...\n};\n\nconst updateToDB = async () => {\n    // Add your contents here...\n};\n\nconst deleteToDB = async () => {\n    // Add your contents here...\n};\n\nexport const ${capitalize(moduleName)}Service = {\n    createToDB,\n    editToDB,\n    updateToDB,\n    deleteToDB,\n};`
    }
  ];

  // Create files in the directory
  files.forEach((file) => {
    const filePath = path.join(basePath, file.name);
    fs.writeFileSync(filePath, file.content);
    console.log(`✅ Created file: ${filePath}`);
  });

  console.log(`🎉 Module "${moduleName}" created successfully!`);
}

// Utility to capitalize the first letter of a string
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// CLI Argument Handling
const args = process.argv.slice(2); // Get CLI arguments
const moduleName = args[0];

if (moduleName) {
  createModule(moduleName);
} else {
  console.error('❌ Please provide a module name! Usage: npm run create-module <module-name>');
}
