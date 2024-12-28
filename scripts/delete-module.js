const fs = require('fs');
const path = require('path');

// Get module name from command-line arguments
const moduleName = process.argv[2];
if (!moduleName) {
    console.error("Please provide the module name. Example: npm run delete-module products");
    process.exit(1);
}

// Define the project root directory
const projectRoot = path.resolve(__dirname, '..');

// Paths to the module folder and routes file
const modulePath = path.join(projectRoot, `src/app/modules/${moduleName}`);
const routesFilePath = path.join(projectRoot, 'src/app/routes/index.ts');

// Step 1: Delete the module folder
if (fs.existsSync(modulePath)) {
    fs.rmSync(modulePath, { recursive: true, force: true });
    console.log(`Module folder '${modulePath}' deleted successfully.`);
} else {
    console.warn(`Module folder '${modulePath}' does not exist.`);
}

// Step 2: Update the routes file
if (fs.existsSync(routesFilePath)) {
    let routesFileContent = fs.readFileSync(routesFilePath, 'utf8');

    // Remove the import statement for the module
    const importRegex = new RegExp(`import .* from "\\.\\.\\/modules\\/${moduleName}\\/.*";\\n`, 'g');
    routesFileContent = routesFileContent.replace(importRegex, '');

    // Remove the specific route configuration for the module
    const routeRegex = new RegExp(`\\{\\s*path: '\\/${moduleName}',\\s*route: \\w+\\s*\\},?\\n?`, 'g');
    routesFileContent = routesFileContent.replace(routeRegex, '');

    // Write the updated content back to the file
    fs.writeFileSync(routesFilePath, routesFileContent, 'utf8');
    console.log(`Routes for module '${moduleName}' removed successfully from '${routesFilePath}'.`);
} else {
    console.warn(`Routes file '${routesFilePath}' does not exist.`);
}
