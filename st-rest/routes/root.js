'use strict'

export default async function (fastify, opts) {

  fastify.get('/', {
    handler: async (request, reply) => {
      reply.send({
        root: true
      });
    }
  });

}