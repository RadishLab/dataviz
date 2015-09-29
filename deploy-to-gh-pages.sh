#!/bin/bash
# deploy to github pages using a build directory

# directory your code is compiled to, ie: build or public
DIR="build"
GH_URL="https://github.com/RadishLab/WCC002.git"

git mv .gitignore .tmp_gitignore
git commit -m "tmp rename .gitignore to .tmp_gitignore"
git add $DIR && git commit -m "tmp add "$DIR
git branch -D gh-pages
git push origin --delete gh-pages
git subtree split --prefix $DIR -b gh-pages
git push -f origin gh-pages:gh-pages
git branch -D gh-pages
git mv .tmp_gitignore .gitignore
git rm -r --cached $DIR && git commit -m "unwatch "$DIR

