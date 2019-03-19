const read = require('./read');

let version;
let _isVersionIncreased;

function getPackage() {
  return read("package.json");
}

module.exports = { getVersion, getProjectName, increaseVersion};


function getVersion() {
  return version = version || getPackage().version;
}

function getProjectName() {
  let pkg = getPackage();
  return pkg.project_name || pkg.name;
}


function increaseVersion(cb) {
  if (!_isVersionIncreased) {
    _isVersionIncreased = true;
    version = getVersion().replace(/(\d+\.\d+\.)(\d+)/, (...args)=>args[1] + (++args[2]));
  }

  if (typeof cb === 'function') {
    cb();
  }
  return version;
}
