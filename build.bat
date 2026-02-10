@echo off
echo Building GorillaPresenter...
node build.js
node package.js
node deploy.js
echo Build complete!
