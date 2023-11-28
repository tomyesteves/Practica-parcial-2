
#!/bin/sh
#########################################################################################
#                                      TEST                                             #
#########################################################################################
set -eu          #-u  variables sin definir=error.       -e  Error si $? != 0
DIR_SCRIPT=$(dirname $(readlink -f $0) );

if [ -e ${DIR_SCRIPT}/../.env ] 
then
    export $(grep -v '^#' ${DIR_SCRIPT}/../.env | xargs -0)
else
    echo "${RED}No existe el .env con las variables de entorno${NOCOLOR}"
    exit 1;
fi

#Tienen que existir las imágenes test   //TODO Chequear que existan las imágenes test
#Tienen que existir despliegue test     //TODO Chequear que existe despliegue test

#//TODO ACA SI DEBERíA ejecutar los tests.
until docker exec -i postgres pg_isready; do
    echo "Waiting for postgres"
    sleep 3
done
docker exec -i postgres psql --host localhost -U ${POSTGRES_USER} --dbname ${POSTGRES_USER} < db/init/db.sql
echo ${GREEN}Postgres is ready to accept connections${NOCOLOR}
exit 0