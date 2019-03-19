const inquirer = require('inquirer');


inquirer
  .prompt([
    {
      'name': 'branch',
      'type': 'list',
      'message': 'Ветка',
      'choices': ['dev', 'master']
    },
    {
      'name': 'protocol',
      'type': 'list',
      'message': 'Протокол выгрузки',
      'choices': ['sftp', 'ftp', 'git', 'архив']
    },
    {
      'name': 'user',
      'type': 'input',
      'message': 'Логин',
      'when': isLogin
    },
    {
      'name': 'pass',
      'type': 'password',
      'message': 'Пароль',
      'when': isLogin
    },
    {
      'name': 'passphrase',
      'type': 'password',
      'message': 'passphrase',
      'when': isLogin
    },
  ])
  .then(answers => {
    // Use user feedback for... whatever!!
    console.log(answers);
  });


function isLogin(answers) {
  return ['sftp', 'ftp', 'git'].indexOf(answers.protocol) >= 0;
}
