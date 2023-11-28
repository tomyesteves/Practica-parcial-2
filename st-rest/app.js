import path from 'path'
import sensible from "./plugins/sensible.js"
import swagger from "./plugins/swagger.js"
import schemas from "./plugins/schemas.js"
import AutoLoad from "@fastify/autoload"
import { fileURLToPath } from 'url'
import { mensajesReemplazables } from "./errors/index.js"
import dotenv from "dotenv"
dotenv.config();

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


export default async function (fastify, opts) {

  //Fastify ecosystem plugins
  fastify.register(sensible)

  //MY CUSTOM PLUGINS
  fastify.register(swagger)
  fastify.register(schemas) //Registramos los schemas

  //MY DECORATORS, funciones o datos que se agregan a la instancia para ampliar la funcionalidad.
  // Agregar metadatos globales a la instancia de Fastify
  fastify.decorate('meta', {
    some: "metadata"
  });

  const getFullLink = (request, link) => {
    let res = "";
    if (link) {
      res = `${request.hostname}${link}`
    } else {
      res = `${request.hostname}${request.raw.url}`
    }
    return `${request.protocol}://${res.replace(/\/\//g, '/')}`;
  }
  fastify.decorate('getFullLink', getFullLink);

  //MY HOOKS: Funciones que se ejecutan en momentos específicos del ciclo de vida.
  // fastify.addHook("preSerialization", function (request, reply, payload, done) {
  //   console.log("preSerialization");
  //   console.log(this.meta);
  //   done();
  // });
  //MY SERVICES
  // fastify.register(rootRoute);
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    routeParams: true,
    dirNameRoutePrefix: function rewrite(folderParent, folderName) {
      if (folderName === 'YELLOW') {
        return 'yellow-submarine'
      }
      if (folderName === 'FoOoO-BaAaR') {
        return false
      }
      return folderName
    }
  });

  fastify.setErrorHandler(async function (error, request, reply) {
    // if (error.code) {
    //   reply.status(mensajesReemplazables[error.code]?.statusCode || reply.statusCode);
    //   error.message = mensajesReemplazables[error.code]?.message || error.message;
    // }
    return error;
  })

}

//TODO: Hacer que todas las rutas tengan en el esquema el errorr 503.
