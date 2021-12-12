const day = process.argv[2];
console.log(`Solving ${day} puzzle`);
const exec = require('child_process').exec;
exec(`node ${day}/${day}.js`, (err, stdout, stderr)=>{
    if(err){console.error(err);}
    if(stdout){console.log(stdout);}
    if(stderr){console.error(stderr);}
});
