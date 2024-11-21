#!/bin/bash

usage () {
  echo "Usage: $0 <version> (x.y.z)"
  exit 1
}

if [ "$#" -ne 1 ]; then
  usage
fi

version=$1

if [[ "$version" =~ ^[0-9]*[0-9]\.[0-9]*[0-9]\.[0-9]*[0-9]$ ]]; then
  echo $version  
else
  usage
fi

pushd projects/ngx-file-helpers
npm version $version
popd

git commit -a -m "$version" && git tag $version
git push && git push --tags
