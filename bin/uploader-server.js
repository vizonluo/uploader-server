#!/usr/bin/env node
var program = require('commander')
var uploaderServer = require('../')

program
  .option('-p, --port <n>', 'uploader server port, default on 3000', parseInt)
  .option('-d, --dir <dir>', 'directory to store file')
  .parse(process.argv)

uploaderServer(program)
