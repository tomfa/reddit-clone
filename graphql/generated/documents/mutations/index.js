const fs = require('fs');
const path = require('path');

module.exports.addPost = fs.readFileSync(path.join(__dirname, 'addPost.gql'), 'utf8');
