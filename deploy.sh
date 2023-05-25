#!/bin/bash

#安装依赖
npm install
#打包
npm run build:release
#删除 nginx 指向的文件夹下的文件
rm -rf /home/www/securex/*

#将打包好的文件复制过去
mv /tmp/securex/dist/* /home/www/securex
#删除 clone 的代码
rm -rf /tmp/securex