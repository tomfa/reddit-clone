const fs = require('fs');
const path = require('path');

module.exports.getPostBySlug = fs.readFileSync(path.join(__dirname, 'getPostBySlug.gql'), 'utf8');
module.exports.getUserById = fs.readFileSync(path.join(__dirname, 'getUserById.gql'), 'utf8');
module.exports.posts = fs.readFileSync(path.join(__dirname, 'posts.gql'), 'utf8');
module.exports.comments = fs.readFileSync(path.join(__dirname, 'comments.gql'), 'utf8');
