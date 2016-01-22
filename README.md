# Static site generator
A dev-server you are working on as a front-end developer could be very slow. Using Static Site Generator can fetch the needed html files once so you can edit them directly and don't need to wait lots of seconds everytime you reload.

## Features
- CSS injection
- Live reload
- CSS & JS Sourcemaps
- SASS 
- Concat and Uglify JS

## How to install
Run `npm install`

## How to start a static web server
1. Copy `./static/data.json.dist` to `./static/data.json` and replace everything to your needs
2. Modify the `static:replace` task in the `./gulp/static.js` file with the correct regex to be linked to your local static files (Todo: need better solution)
3. Run `gulp init-static`, this will fetch the files
4. Finally run `gulp start-static` to start the local dev-server, serving your static html files with links to local assets (if regex is set properly)

## Todo's
- Be able to put regex in data.json
- Clean up gulp files / package.json
