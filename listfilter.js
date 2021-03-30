#!/usr/bin/env node

import commander from 'commander';
import _ from 'underscore';
import fs from 'fs';

const { Command } = commander;
const program = new Command();


program
  .version('0.0.1')
  .usage('cat some.json | ./linkbuilder.js')
  .option('-o, --opposite', 'negate the startsWith', false)
  .option('-s, --startsWith <startsWith>', 'username starts with filter', null);

program.parse(process.argv);
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

    const output = data.filter(item=>{
      if(options.opposite) {
        return !item.UserName.startsWith(options.startsWith);  
      }
      return item.UserName.startsWith(options.startsWith);
    });
    process.stdout.write(JSON.stringify(output, null, 2));
  }
  
});  
// https://www.tiktok.com/@usmcangryveteran?
