/**
 * Created by abratchun on 13.02.14.
 */

var fs = require('fs');
fs.createReadStream(process.argv[2]).pipe(process.stderr);