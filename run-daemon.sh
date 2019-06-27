#!/bin/bash

URL_STRING_MATCHER_START="URL = \""
URL_STRING_MATCHER_END="\";"

EXTENSION_ID_STRING_MATCHER_START="REPLACER_EXTENSION_ID = \""
EXTENSION_ID_STRING_MATCHER_END="\";"

PROD_URL=$1
REPLACER_EXTENSION_ID=$2
BROWSER_TYPE=$3


PATH_TO_FILE_WITH_URL="./adblockplusui/js/utils/saveAdserverUrl.js"
PATH_TO_FILE_WITH_EXTENSION_ID1="./adblockplusui/js/popup.js"
PATH_TO_FILE_WITH_EXTENSION_ID2="./ext/bladeCommunicator.js"
PATH_TO_FILE_WITH_EXTENSION_ID3="./lib/requestBlocker.js"

docker run -it -d --name blade blade

if [[ ! -z $PROD_URL ]]; then
  docker exec blade sed -i 's|'"$URL_STRING_MATCHER_START"'.*'"$URL_STRING_MATCHER_END"'|'"$URL_STRING_MATCHER_START$PROD_URL$URL_STRING_MATCHER_END"'|' $PATH_TO_FILE_WITH_URL
fi

if [[ ! -z $REPLACER_EXTENSION_ID ]]; then
  docker exec blade sed -i 's|'"$EXTENSION_ID_STRING_MATCHER_START"'.*'"$EXTENSION_ID_STRING_MATCHER_END"'|'"$EXTENSION_ID_STRING_MATCHER_START$REPLACER_EXTENSION_ID$EXTENSION_ID_STRING_MATCHER_END"'|' $PATH_TO_FILE_WITH_EXTENSION_ID1
  docker exec blade sed -i 's|'"$EXTENSION_ID_STRING_MATCHER_START"'.*'"$EXTENSION_ID_STRING_MATCHER_END"'|'"$EXTENSION_ID_STRING_MATCHER_START$REPLACER_EXTENSION_ID$EXTENSION_ID_STRING_MATCHER_END"'|' $PATH_TO_FILE_WITH_EXTENSION_ID2
  docker exec blade sed -i 's|'"$EXTENSION_ID_STRING_MATCHER_START"'.*'"$EXTENSION_ID_STRING_MATCHER_END"'|'"$EXTENSION_ID_STRING_MATCHER_START$REPLACER_EXTENSION_ID$EXTENSION_ID_STRING_MATCHER_END"'|' $PATH_TO_FILE_WITH_EXTENSION_ID3
fi

docker exec blade npm i

if [ $BROWSER_TYPE = "chrome" ]
then
  docker exec blade npm run prod-chrome
  docker cp blade:/app/devenv.chrome .
else
  docker exec blade npm run prod-gecko
  docker cp blade:/app/devenv.gecko .
fi

docker cp blade:/app/blade-blocker.zip .

docker stop blade && docker rm blade && docker rmi blade