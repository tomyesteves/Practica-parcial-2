import fp from 'fastify-plugin'
import swagger from "@fastify/swagger"
import swaggerui from "@fastify/swagger-ui"

const url = `http://${process.env.FASTIFY_HOST}:${process.env.FASTIFY_PORT}`;
const url2 = "https://desafio-salto.brazilsouth.cloudapp.azure.com/rest"

export default fp(async (fastify, opts) => {
  fastify.register(swagger, {
    openapi: {
      info: {
        title: 'Softest OPEN API',
        description: 'Documentación Open api del backend softest.',
        version: process.env.VERSION,
      },
      servers: [
        {
          url: url, // Host y puerto
          description: 'Softest ' + process.env.NODE_ENV,
        },
        {
          url: url2, // Host y puerto
          description: 'Softest testing en azure.' + process.env.NODE_ENV,
        },
      ],
      components: {
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: "bearer",
            bearerFormat: "JWT"
          },
        },
      },
      consumes: ['application/json'],
      produces: ['application/json', "application/vnd.api+json"],
      tags: [
        {
          name: "admin",
          description: "Endpoints para los administradores del sistema.",
        },
        {
          name: "evaluators",
          description: "Endpoints para los evaluadores del sistema.",
        },
        {
          name: "students",
          description: "Endpoints para los estudiantes del sistema.",
        },
      ],
    },
    hideUntagged: true,
    exposeRoute: true,
  })


  fastify.register(swaggerui, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false
    },
    uiHooks: {
      onRequest: function (request, reply, next) { next() },
      preHandler: function (request, reply, next) { next() },
    },
    staticCSP: false,
    // transformStaticCSP: (header) => header,
    // transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
    // transformSpecificationClone: true
  })

})
