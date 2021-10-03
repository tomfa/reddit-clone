const fs = require('fs');
const path = require('path');

module.exports.vote = fs.readFileSync(path.join(__dirname, 'vote.gql'), 'utf8');
module.exports.addPost = fs.readFileSync(path.join(__dirname, 'addPost.gql'), 'utf8');
module.exports.addUser = fs.readFileSync(path.join(__dirname, 'addUser.gql'), 'utf8');
module.exports.addComment = fs.readFileSync(path.join(__dirname, 'addComment.gql'), 'utf8');
