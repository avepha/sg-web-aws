#!/bin/sh

BASEDIR=$(dirname "$0")
PROJECT_NAME="SG-WEB-HOSTING"
echo "$BASEDIR"
echo "$PROJECT_NAME"


echo "[Info] Deploy UI"
npm run build --prefix $BASEDIR
DIST_PATH="/Users/alfarie/Documents/Grobot-Project/@Project/SmartGrobot/$PROJECT_NAME/dist"

if [ ! -d "$DIST_PATH" ]; then  # for file "if [-f /home/rama/file]"
    echo "[Info] Create dist in SG MPU Project"
    mkdir $DIST_PATH
fi


echo "[Info] Move Build to dist $DEPLOY_PATH"
cp -r $BASEDIR/dist $DIST_PATH


if [ ! -d "$DIST_PATH/src/assets" ]; then  # for file "if [-f /home/rama/file]"
    echo "[Info] Create dist in SG MPU Project"
    mkdir -p $DIST_PATH/src
fi

echo "[Info] Move src to dist $DEPLOY_PATH"
cp -r $BASEDIR/src/assets $DIST_PATH/src
cp -r $BASEDIR/index.html $DIST_PATH

