git add .
git commit -m 'build: commit changed files'
export CDNBASE="https://yhanwen.github.io/soda/_nuxt/"
npm run generate
git checkout gh-pages
cp -r ./dist/ ./
rm -rf dist
git add .
git commit -a -m 'build: new version'
git push origin gh-pages -f
git checkout gh-pages-dev
