#!/bin/sh
#########################################################################################
#                                     ESPERAR POSTGRES                                  #
#########################################################################################
set -u  #-u  variables sin definir=error.       -e  Error si $? != 0
DIR_SCRIPT=$(dirname $(readlink -f $0) );

if [ -e ${DIR_SCRIPT}/../.env ] 
then
    export $(grep -v '^#' ${DIR_SCRIPT}/../.env | xargs -0)
    echo ${GREEN}.env OK${NOCOLOR}
else
    echo "${RED}No existe el .env con las variables de entorno${NOCOLOR}"
    exit 1;
fi

RESTREADY=""
REST_NAME=$(docker ps | grep st-rest | cut -f1 -d' ')

while [ "${RESTREADY}" != "0" ]; do    
    #//TODO: Cambiar por un curl o algo
    RES=$(docker exec -i ${REST_NAME} node --version | grep "v2")
    RESTREADY=$?
    [ -z "$RES" ] && sleep 3
done
echo $GREEN node on $NOCOLOR

exit 0
