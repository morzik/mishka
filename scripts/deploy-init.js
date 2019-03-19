const inquirer = require("inquirer");


inquirer
  .prompt([
    {
      "name": "type",
      "type": "list",
      "message": "Протокол выгрузки",
      "choices": ["sftp", "ftp", "git", "архив"]
    },
  ])
  .then(answers => {
    // Use user feedback for... whatever!!
    console.log(answers);
  });
