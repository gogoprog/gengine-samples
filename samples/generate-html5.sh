#!/bin/bash

echo "[gengine-samples] Running all samples ..."

HTML="<html>
<head>
<title>gengine-samples</title>
<link rel='stylesheet' type='text/css' href='style.css'>
</head>
<body>
<h1>gengine web samples</h1>
"

for dir in `ls`;
do
    test -d "$dir" || continue
    cd $dir
    echo "[gengine-samples] Generating HTML5 for <$dir> ..."
    gengine-pack --html5 $1
    cd ..

    HTML="${HTML}<a href='./samples/${dir}/packed-html5/'>${dir}</a><br/>"
done

HTML="${HTML}</body></html>"

echo ${HTML} > ../index.html
