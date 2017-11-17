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
    test -e "$dir/build.hxml" || continue
    cd $dir
    echo "[gengine-samples] Generating HTML5 for <$dir> ..."
    [ "$1" == "--skip-build" ] || gengine-pack --html5 $1
    cd ..

    HTML="${HTML}<a href='./samples/${dir}/packed-html5/container.html'><img src='./samples/${dir}/screenshot.png'/>${dir}</a>"

    python << EOF
import pystache
from pathlib import Path

template = Path('container-template.html').read_text()
source = Path('${dir}/Application.hx').read_text()


with open('${dir}/packed-html5/container.html', 'w') as output_file:
    output_file.write(pystache.render(template, {'source': source}))
EOF

done

HTML="${HTML}</body></html>"

echo ${HTML} > ../index.html
