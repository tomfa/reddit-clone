const fs = require('fs');
const path = require('path');

module.exports.addPost = fs.readFileSync(path.join(__dirname, 'addPost.gql'), 'utf8');
module.exports.getUser = fs.readFileSync(path.join(__dirname, 'getUser.gql'), 'utf8');
module.exports.addUser = fs.readFileSync(path.join(__dirname, 'addUser.gql'), 'utf8');
