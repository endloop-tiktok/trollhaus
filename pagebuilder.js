#!/usr/bin/env node

import commander from 'commander';
import _ from 'underscore';
import fs from 'fs';
import path from 'path'
import moment from 'moment';

const { Command } = commander;
const program = new Command();

program
  .version('0.0.1')
  .usage('cat some.json | ./linkbuilder.js | ./pagebuilder.js -f <filepath>')
  .option('-t, --title <title>', 'page title', 'TikTok Trolls and Spammers')
  .option('-f, --filepath <filepath>', 'HTML file ', null)

program.parse(process.argv);
const options = program.opts();

process.stdin.resume();
let accumlated = '';
process.stdin.on('data', function(chunk) {
  accumlated+=chunk
});

function matchAndReplace(templateVars) {

  return (fullMatch, templateKey, position, fullString) => {
    if(templateKey && _.has(templateVars, templateKey)) {
      return templateVars[templateKey]
    }
  } 
}

process.stdin.on('end', function() {
  let data;
  try {
    data = JSON.parse(accumlated);
  } catch(err) {
    console.error("ERROR",err);
    process.exit(1);
  }
  const listString = data.map(item=>{
    return `<li>${item}</li>`
  }).join('\n');

  if(options.filepath) {
    const filePath = path.join(process.cwd(), options.filepath);
    const fileRaw = fs.readFileSync(filePath).toString();
    const templateVars = {
      build_time:moment().format('LLLL'),
      trolls_list:`<ul>${listString}</ul>`,
      page_title:options.title
    }
    const converted = fileRaw.replace(/\$\{([a-zA-Z0-9_]+)\}/g, matchAndReplace(templateVars))
    process.stdout.write(converted);
  }  
});  
