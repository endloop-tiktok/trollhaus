#!/usr/bin/env node



import commander from 'commander';
import _ from 'underscore';
import fs from 'fs';

const { Command } = commander;
const program = new Command();


program
  .version('0.0.1')
  .usage('cat some.json | ./linkbuilder.js >')
  .option('-r, --realrun', 'allow real run', false)
  .option('-f, --filepath <filepath>', 'JSON blocklist', null)
const BASE_URL = 'https://www.tiktok.com/@';


const options = program.opts();


if(options.filepath) {
  const inputFilePath = path.join(process.cwd(), options.filepath)
  const inputRawFile = fs.readFileSync(inputFilePath).toString();
  let data;
  try {
    data = JSON.parse(inputRawFile)
  } catch(err) {
    console.error('Unable to parse', err);
    process.exit(1);
  }  
} else {
  process.stdin.resume();
  console.log("reading from stdin")
  let accumlated = '';
  process.stdin.on('data', function(chunk) {
    accumlated+=chunk
  });

  process.stdin.on('end', function() {
    let data;
    try {
      data = JSON.parse(accumlated)
    } catch(err) {
      console.error("JSON parsing failed", err);
    }
    let usernames = null;
    if(_.isArray(data)) {
      usernames = _.pluck(data, 'UserName');  
    }
    const converted = usernames.map(item=>{
      return `<a href="${BASE_URL}${item}">${item}</a>`
    });
    process.stdout.write(JSON.stringify(converted));
    process.exit(0);
  });  
  
}

// https://www.tiktok.com/@usmcangryveteran?