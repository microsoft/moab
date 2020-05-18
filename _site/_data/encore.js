const fs = require('fs');

module.exports = function () {
  try {
    const data = fs.readFileSync('./build/entrypoints.json', 'utf8');
    const entrypoints = JSON.parse(data);

    return entrypoints.entrypoints;
  }catch (e) {
    console.log('looks like the files do not exists, waiting to let them be built');
  }
};
