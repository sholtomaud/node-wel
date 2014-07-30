@rem = ' Node Script
@echo off
echo Starting node-wel
set mycd=homedir_%cd:\=\\%

echo Run script
node index.js

Pause&Exit
goto :EOF
';
undef @rem; 

//var test = require('./index'); 