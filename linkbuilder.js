#!/usr/bin/env node

import commander from 'commander';
import _ from 'underscore';
import fs from 'fs';

const { Command } = commander;
const program = new Command();


program
  .version('0.0.1')
  .usage('cat some.json | ./linkbuilder.js');
program.parse(process.argv);  
const BASE_URL = 'https://www.tiktok.com/@';
const options = program.opts();

process.stdin.resume();
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
  process.stdout.write(JSON.stringify(converted, null, 2));
});  
// https://www.tiktok.com/@usmcangryveteran?