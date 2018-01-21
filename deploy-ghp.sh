#!/bin/bash
 cd build
 git init
 git config user.name "Travis-CI"
 git config user.email "travis@nodemeatspace.com"

 git add .
 git commit -m "Deploy via travis"
 git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages