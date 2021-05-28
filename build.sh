#!/bin/bash
cd /app || exit
pwd
ls -ltra
echo "=============================================="
cd node_modules || exit
pwd
ls -ltra
echo "=============================================="
cd /app || exit

yarn add @craco/craco
yarn run
echo "=============================================="
pwd
ls -ltra
