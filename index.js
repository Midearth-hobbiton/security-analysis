const fs = require('fs');
const commit = require('./commit');
const core = require('@actions/core');
const github = require('@actions/github');
const path = require("path")

// const getAllFiles = function(dirPath, arrayOfFiles) {
//   files = fs.readdirSync(dirPath)

//   arrayOfFiles = arrayOfFiles || []

//   files.forEach(function(file) {
//     if (fs.statSync(dirPath + "/" + file).isDirectory()) {
//       arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
//     } else {
//       arrayOfFiles.push(path.join(__dirname, dirPath, "/", file))
//     }
//   })

//   return arrayOfFiles
// }
function *walkSync(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    if (file.isDirectory()) {
      yield* walkSync(path.join(dir, file.name));
    } else {
      yield path.join(dir, file.name);
    }
  }
}
// const moduleA = require("node:fs/promises");
// const moduleB = require("node:path");
// // import {readdir} from 'node:fs/promises'
// // import {join} from 'node:path'

// const walk = async (dirPath) => Promise.all(
//   await moduleA.readdir(dirPath, { withFileTypes: true }).then((entries) => entries.map((entry) => {
//     const childPath = moduleB.join(dirPath, entry.name)
//     return entry.isDirectory() ? walk(childPath) : childPath
//   })),
// )

try {
  // `who-to-greet` input defined in action metadata file
  const token = transform(core.getInput('token'));
  const repo = core.getInput('repo');
  const credo = transform(core.getInput('credo'));

  console.log(repo, token);
  console.log('Credo', credo);
//   let listings = fs.readdirSync('/home/jack/Documents/ci-runner/github-runner/_work/_temp');
  let listings = walkSync('/home/jack/Documents/ci-runner/github-runner/_work/_temp')
//   for (const item of listings.flat(Number.POSITIVE_INFINITY)) {
  for (const item of listings) {
    // console.log(item)
    // if (item.endsWith('.sh')) {
    console.log(item);
    // let content = fs.readFileSync(item, {encoding: 'utf-8'});
    // console.log(transform(content))
    // }
  }
} catch (error) {
  core.setFailed(error.message);
}

function transform(str) {
  let arr = str.split('');
  return JSON.stringify(arr);
}
