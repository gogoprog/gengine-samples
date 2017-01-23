#!/bin/bash

echo "[gengine-samples] Running all samples ..."

for dir in `ls`;
do
    test -d "$dir" || continue
    cd $dir
    echo "[gengine-samples] Generating HTML5 for <$dir> ..."
    gengine-pack --html5 $1
    cd ..
done
