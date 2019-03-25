Docker junto a Nginx, NodeJS y CouchDB 2019 ! ![Inch-CI](https://inch-ci.org/assets/badge-example-b71f9e833318f66f64b3f23877113051.svg)
============================================================================

### Prerequisitos

- Instalación del docker.
- [Instalación del nodeJS (No es necesario)](https://nodejs.org/es/download/package-manager/) 
- [Instalación de CouchDB (por fuera del contenedor, a modo de prueba).](http://docs.couchdb.org/en/latest/install/)  
* **NOTA**: Aunque no es necesario, permite acceder al gestor gráfico [Fauxton](https://couchdb.apache.org/fauxton-visual-guide/index.html) sin necesidad de tener activado el  
couchDB dentro del contenedor del docker, esto es útil para probar, pero se puede omitir igualmente.


## Imagenes de Docker utilizadas
- [nodedocker_api (915MB)](https://medium.com/@asfo/mi-primer-proyecto-con-docker-nodejs-express-da3cbab0f2a9)
- [couchdb (201MB)](https://github.com/apache/couchdb-docker)
- [nginx (109MB)](https://hub.docker.com/_/nginx) 
 

## Ejemplos utilizados

- [Docker-NodeJS-Express-Nodemon](https://medium.com/@asfo/mi-primer-proyecto-con-docker-nodejs-express-da3cbab0f2a9)
- [NodeJS CouchDB Grafico](https://github.com/zingchart-demos/node-express-couchdb)

## Instalacion

1. Clonar el repositorio.
2. Ejecutar `docker-compose up` en la raíz, es decir, donde se encuentra el archivo `docker-compose.yml`
3. En caso de no existir errores, tras la instalación detener la ejecución mediante `docker-compose stop`

## Post-Instalación couchDB

1. Sí la instalación del contenedor de couchDB fue exitosa, se debe ingresar a `http://127.0.0.1:5984/_utils/`   
y observar una pantalla 
![1](https://user-images.githubusercontent.com/26907069/54857424-01504800-4cde-11e9-8dfb-b749daa92c42.png)
Donde se deben crear las bases de datos `_replicators`, `_users`, `test`

2. Por último en este apartado, se puede verificar el correcto funcionamiento de la base de datos en cuanto  
a conectividad.![2](https://user-images.githubusercontent.com/26907069/54857494-5be9a400-4cde-11e9-8df9-6f7c71754969.png)

3. En cuanto a couchDB eso es todo, la inserción de registros y "select" se realizará desde nodeJS, aunque también  
se puede realizar mediante Fauxton.

## Post-Instalación nodeJS

1. Comprobar sí las direcciones IPs de los archivos configuracionBack.js y configuracionFront.js coinciden con los de los contenedores, esto se realiza una vez que los contenedores estan activados, mediante el comando   
`docker inspect containid`
![3](https://user-images.githubusercontent.com/26907069/54857729-a586be80-4cdf-11e9-817a-bb0af040ba27.png)
2. Con respecto a nodeJS ya esta, opcionalmente de surgir algún error se podría "levantar" solo el proyecto de node mediante un `node server.js` ejecutado en ./api para corroborar sí el problema es del docker.

## Post-Instalación Nginx

1. Aplica lo mismo que el punto anterior en node pero para el archivo que se encuentra dentro de la carpeta nginx.

Sí el proyecto funciona sin problema se debería ver de la siguiente manera
![4](https://user-images.githubusercontent.com/26907069/54857864-5db46700-4ce0-11e9-95fa-bfd84ff31572.png)

2. Sí tras la instalación se puede acceder a localhost:3000 pero al intentar acceder a localhost se muestra el error Forbidden, ingresar al contenedor de Nginx `docker exec -it containerid bash` y ejecutar `chmod -R 777 ./src`

## Extras
- Se encuentra comentado el archivo **docker-compose.yml**.

## Comandos útiles (Docker)
- `docker ps -a` indica el estado de los contenedores, de la imagen que provienen, y los puertos que utilizan
- `docker image ls` permite saber la cantidad de imagenes almacenadas en el sistema y el peso que ocupan.
- `docker exec -it containid bash` permite el ingreso al contenedor mediante BASH  
(los contenedores no poseen programas instalados ni siquiera nano o vim :c)
- Dentro de un contenedor, la utilización de curl, EJ: `curl http://127.0.0.1:5984`, para comprobar la conectividad del contenedor respecto a otros contenedores y/o externa
- `docker rmi imageid` y `docker rm containerid` para la eliminación de imagenes y/o contenedores no utilizados.

## Links de ayuda:
- https://github.com/apache/couchdb-docker/issues/54
- https://medium.freecodecamp.org/expose-vs-publish-docker-port-commands-explained-simply-434593dbc9a3
- https://stackoverflow.com/questions/31746182/docker-compose-wait-for-container-x-before-starting-y
- https://medium.com/@alexishevia/using-cors-in-express-cac7e29b005b
- https://github.com/jeboehm/docker-mailserver/issues/46
- https://github.com/MOXGA-OSS/nginx-node-docker
