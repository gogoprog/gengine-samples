#!/bin/bash

echo "[gengine-samples] Running all samples ..."

for dir in `ls`;
do
    test -d "$dir" || continue
    cd $dir
    echo "[gengine-samples] Running <$dir> ..."
    gengine-run $1
    cd ..
done
