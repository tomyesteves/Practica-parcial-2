'use strict'

export default async function (fastify, opts) {

  fastify.get('/', {
    //TODO: Acá la respuesta debería ser según que rol tenga el usuario.
    handler: async (request, reply) => {
      reply.send({
        info: fastify.swagger().info,
        _links: {
          self: { href: fastify.getFullLink(request) },
          "admin": { href: fastify.getFullLink(request, "/admin") }
        }
      });
    }
  });

}