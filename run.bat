@echo off
title Pho Nguoi Viet
cls
:bot
git checkout HEAD^ .
git pull
title Pho Nguoi Viet
@echo Starting...
node .
goto bot