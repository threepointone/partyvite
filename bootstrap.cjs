const fs = require("fs");
const readline = require("readline");

// Function to prompt user for input with a default value
function promptUser(query, defaultValue) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(`${query} (${defaultValue}): `, (answer) => {
      rl.close();
      resolve(answer || defaultValue);
    })
  );
}

// Function to update JSON file
async function updateJsonFile(filePath, key, newValue) {
  const data = fs.readFileSync(filePath, "utf8");
  const json = JSON.parse(data);
  json[key] = newValue;
  fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + "\n", "utf8");
}

// Function to update HTML file
async function updateHtmlFile(filePath, newTitle) {
  let data = fs.readFileSync(filePath, "utf8");
  data = data.replace(/<title>.*<\/title>/, `<title>${newTitle}</title>`);
  fs.writeFileSync(filePath, data, "utf8");
}

(async function main() {
  // Prompt user for new package name with default
  const newPackageName = await promptUser(
    "Enter new package name",
    "partyvite-starter"
  );
  await updateJsonFile("package.json", "name", newPackageName);

  // Prompt user for new worker name with default
  const newWorkerName = await promptUser(
    "Enter new worker name",
    "my-party-server"
  );
  await updateJsonFile("wrangler.json", "name", newWorkerName);

  // Prompt user for new page title with default
  const newPageTitle = await promptUser("Enter new page title", "Let's Party");
  await updateHtmlFile("index.html", newPageTitle);

  console.log("Files updated successfully!");

  // Ask if the user wants to delete bootstrap.js
  const deleteBootstrap = await promptUser(
    "Do you want to delete bootstrap.js?",
    "n"
  );
  if (deleteBootstrap.toLowerCase() === "y") {
    fs.unlinkSync(__filename);
    console.log("bootstrap.cjs has been deleted.");
  } else {
    console.log("bootstrap.cjs has not been deleted.");
  }
})();
