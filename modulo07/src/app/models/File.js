const Base = require('./Base');

Base.init({ table: 'files'});

const File = {
    ...Base,
}

module.exports = File;
