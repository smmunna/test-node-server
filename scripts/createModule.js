const fs = require('fs');
const path = require('path');

// Function to create a module
function createModule(moduleName) {
  if (!moduleName) {
    console.error('❌ Please provide a module name!');
    return;
  }

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
      content: `// Creating ${moduleName} interface with their fields and data type\n\ninterface ${capitalize(moduleName)} {\n    // Example: name: string;\n}\n\nexport default ${capitalize(moduleName)};`
    },
    {
      name: `${moduleName}.model.ts`,
      content: `// Creating ${moduleName} schema\n\nimport { Schema, model } from 'mongoose';\nimport ${capitalize(moduleName)} from './${moduleName}.interface';\n\nconst ${moduleName}Schema = new Schema<${capitalize(moduleName)}>({\n    // Example: name: { type: String, required: true }\n});\n\nconst ${capitalize(moduleName)}Model = model<${capitalize(moduleName)}>('${capitalize(moduleName)}', ${moduleName}Schema);\n\nexport default ${capitalize(moduleName)}Model;`
    },
    {
      name: `${moduleName}.controller.ts`,
      content: `import { NextFunction, Request, Response } from 'express';\n\nconst index${capitalize(moduleName)} = async (req: Request, res: Response, next: NextFunction) => {\n    res.send({ message: 'Hello From ${capitalize(moduleName)} Controller..' });\n};\n\nconst create${capitalize(moduleName)} = async (req: Request, res: Response, next: NextFunction) => {\n    const data = req.body;\n    console.log('Creating ${capitalize(moduleName)}:', data);\n    res.status(201).send({ message: '${capitalize(moduleName)} created successfully', data });\n};\n\nconst edit${capitalize(moduleName)} = async (req: Request, res: Response, next: NextFunction) => {\n    const { id } = req.params;\n    console.log('Editing ${capitalize(moduleName)} with ID:', id);\n    res.send({ message: \`Edit ${capitalize(moduleName)} called for ID: \${id}\` });\n};\n\nconst update${capitalize(moduleName)} = async (req: Request, res: Response, next: NextFunction) => {\n    const { id } = req.params;\n    const updatedData = req.body;\n    console.log('Updating ${capitalize(moduleName)} with ID:', id, 'Data:', updatedData);\n    res.send({ message: \`${capitalize(moduleName)} updated successfully\`, data: updatedData });\n};\n\nconst delete${capitalize(moduleName)} = async (req: Request, res: Response, next: NextFunction) => {\n    const { id } = req.params;\n    console.log('Deleting ${capitalize(moduleName)} with ID:', id);\n    res.send({ message: \`${capitalize(moduleName)} deleted successfully\` });\n};\n\nexport const ${capitalize(moduleName)}Controller = {\n    index${capitalize(moduleName)},\n    create${capitalize(moduleName)},\n    edit${capitalize(moduleName)},\n    update${capitalize(moduleName)},\n    delete${capitalize(moduleName)},\n};`
    },
    {
      name: `${moduleName}.route.ts`,
      content: `import express from 'express';\nimport { ${capitalize(moduleName)}Controller } from './${moduleName}.controller';\n\nconst router = express.Router();\n\nrouter.get('/', ${capitalize(moduleName)}Controller.index${capitalize(moduleName)});\nrouter.post('/', ${capitalize(moduleName)}Controller.create${capitalize(moduleName)});\nrouter.get('/:id', ${capitalize(moduleName)}Controller.edit${capitalize(moduleName)});\nrouter.put('/:id', ${capitalize(moduleName)}Controller.update${capitalize(moduleName)});\nrouter.delete('/:id', ${capitalize(moduleName)}Controller.delete${capitalize(moduleName)});\n\nexport const ${moduleName}Routes = router;`
    },
    {
      name: `${moduleName}.service.ts`,
      content: `import ${capitalize(moduleName)} from './${moduleName}.interface';\nimport ${capitalize(moduleName)}Model from './${moduleName}.model';\n\nconst createToDB = async (data: ${capitalize(moduleName)}) => {\n    // Add your implementation here...\n    return data;\n};\n\nconst editToDB = async (id: string) => {\n    // Add your implementation here...\n    return id;\n};\n\nconst updateToDB = async (id: string, data: ${capitalize(moduleName)}) => {\n    // Add your implementation here...\n    return { id, data };\n};\n\nconst deleteToDB = async (id: string) => {\n    // Add your implementation here...\n    return id;\n};\n\nexport const ${capitalize(moduleName)}Service = {\n    createToDB,\n    editToDB,\n    updateToDB,\n    deleteToDB,\n};`
    }
  ];

  files.forEach((file) => {
    const filePath = path.join(basePath, file.name);
    fs.writeFileSync(filePath, file.content);
    console.log(`✅ Created file: ${filePath}`);
  });

  // Add the new route to app.ts
  const appFilePath = path.join(__dirname, '..', 'src', 'app.ts');
  if (fs.existsSync(appFilePath)) {
    const routeImport = `import { ${moduleName}Routes } from './app/modules/${moduleName}/${moduleName}.route';\n`;
    const appUseRoute = `app.use('/api/v1/${moduleName}', ${moduleName}Routes); //${moduleName} routes\n`;

    let appFileContent = fs.readFileSync(appFilePath, 'utf8');

    // Add import statement
    if (!appFileContent.includes(routeImport)) {
      const importInsertPosition = appFileContent.indexOf('// Import your routes here') + '// Import your routes here'.length;
      appFileContent = appFileContent.slice(0, importInsertPosition) + '\n' + routeImport + appFileContent.slice(importInsertPosition);
    }

    // Add app.use statement
    const routePlaceholder = '/*-------------------HANDLE ALL OF YOUR ROUTES HERE ----------------------*/';
    if (!appFileContent.includes(appUseRoute)) {
      const routeInsertPosition = appFileContent.indexOf(routePlaceholder) + routePlaceholder.length;
      appFileContent = appFileContent.slice(0, routeInsertPosition) + '\n' + appUseRoute + appFileContent.slice(routeInsertPosition);
    }

    // Write updated content back to app.ts
    fs.writeFileSync(appFilePath, appFileContent, 'utf8');
    console.log(`✅ Updated app.ts with routes for "${moduleName}"`);
  } else {
    console.error('❌ app.ts file not found! Could not add routes automatically.');
  }

  console.log(`🎉 Module "${moduleName}" created successfully!`);
}

// Utility to capitalize the first letter of a string
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// CLI Argument Handling
const args = process.argv.slice(2);
const moduleName = args[0];

if (moduleName) {
  createModule(moduleName);
} else {
  console.error('❌ Please provide a module name! Usage: npm run create-module <module-name>');
}
