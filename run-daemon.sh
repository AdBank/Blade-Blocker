#!/bin/bash

URL_STRING_MATCHER_START="URL = \""
URL_STRING_MATCHER_END="\";"

PROD_URL=$1
BROWSER_TYPE=$2


PATH_TO_FILE_WITH_URL="./adblockplusui/js/utils/saveAdserverUrl.js"

docker run -it -d --name blade blade

if [[ ! -z $PROD_URL ]]; then
  docker exec blade sed -i 's|'"$URL_STRING_MATCHER_START"'.*'"$URL_STRING_MATCHER_END"'|'"$URL_STRING_MATCHER_START$PROD_URL$URL_STRING_MATCHER_END"'|' $PATH_TO_FILE_WITH_URL
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
