git commit -a -m 'build: commit changed files'
npm run generate
git checkout gh-pages
git commit -a -m 'build: new version'
npm version minor
cp -r ./dist ./
rm -rf dist
git push origin gh-pages
git checkout gh-pages-dev
