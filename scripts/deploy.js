const yargs = require('yargs');
const fs = require('fs');
const _ = require("lodash");
const nope = require("./nope");

const FILES_TO_DEPLOY = "dist/**/*";


function argv(key, _default = false){
  return yargs.argv[key] || _default;
}

function getAccess(branch){
  if (fs.existsSync('scripts/deploy.config.json')) {
    return require('./deploy.config.json')[branch];
  } else {
    return {
      user: argv("ci-user"),
      pass: argv("ci-pass"),
      passphrase: argv("ci-passphrase")
    };
  }
}


function getTasks(branch) {
  switch (branch){
    case 'dev':
      return sb('\\\\diskstation\\web\\sb\\js\\deploy');

    /*
    case 'master':
      return ftp('/', _.assign({
        host: "",
        port: 21,
        user: "",
        pass: "",
        parallel: 10
      }, getAccess(branch)));
    */

    case 'master':
      return sftp(_.assign({
        host: "192.168.50.119",
        port: 10022,
        user: "",
        pass: "",
        remotePath: "/web/sb/js/deploy/",
        // key: argv("key", "\\\\diskstation\\project_mats\\security\\keys\\peppers_rsa_openssh")
      }, getAccess(branch)));
  }
}

function getBranch(){
  let branch = argv('ciBranch');

  if (!branch) {
    let stdOut = require('child_process').execFileSync('git', ['branch']);

    branch = /([^\s]+)\s*$/.exec(stdOut.toString());
    branch = branch && branch[1];
  }

  return branch;
}

module.exports = function(){
  let deploy = getTasks(getBranch());

  if (deploy) {
    let src = gulp.src(FILES_TO_DEPLOY, {base: 'dist', buffer: false});
    if (!Array.isArray(deploy)) {
      deploy = [deploy];
    }

    return deploy.reduce(
      (src, filter)=>src.pipe(filter),
      src
    );
  }
};




/***
 *    ███████╗███████╗████████╗██████╗
 *    ██╔════╝██╔════╝╚══██╔══╝██╔══██╗
 *    ███████╗█████╗     ██║   ██████╔╝
 *    ╚════██║██╔══╝     ██║   ██╔═══╝
 *    ███████║██║        ██║   ██║
 *    ╚══════╝╚═╝        ╚═╝   ╚═╝
 *
 */

function sftp(params){
  return require('gulp-sftp')(params);
}





/***
 *    ███████╗████████╗██████╗
 *    ██╔════╝╚══██╔══╝██╔══██╗
 *    █████╗     ██║   ██████╔╝
 *    ██╔══╝     ██║   ██╔═══╝
 *    ██║        ██║   ██║
 *    ╚═╝        ╚═╝   ╚═╝
 *
 */
// При отправке на diskstation по ftp неправильно обрабатывалось сообщение о несуществующем файле/папке
function ftp(remotePath, params){
  let conn = require('vinyl-ftp')
    .create(params);

  return [
    conn.newer(remotePath),
    conn.dest(remotePath)
  ];
}




/***
 *    ███████╗██████╗
 *    ██╔════╝██╔══██╗
 *    ███████╗██████╔╝
 *    ╚════██║██╔══██╗
 *    ███████║██████╔╝
 *    ╚══════╝╚═════╝
 *
 */
function sb(destination){
  return require('gulp').dest(argv('remote', destination));
}
