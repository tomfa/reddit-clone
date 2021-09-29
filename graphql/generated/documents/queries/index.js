const fs = require('fs');
const path = require('path');

module.exports.posts = fs.readFileSync(path.join(__dirname, 'posts.gql'), 'utf8');
