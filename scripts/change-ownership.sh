#!/bin/bash

currentScriptDir="$(dirname "$0")"
directories=("backend" "frontend")

for dir in "${directories[@]}"; do

    dirToChange="$currentScriptDir/../$dir"

    if [ -d "$dirToChange" ]; then
        echo "Changing ownership of $dir to the current user"
        sudo chown -R $(whoami) "$dirToChange"
    else
        echo "Directory $dir does not exist."
    fi
    
done
