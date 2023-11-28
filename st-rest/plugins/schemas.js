import fp from 'fastify-plugin'
import schemas from "../schemas/index.js"

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
export default fp(async (fastify) => {

  const keys = Object.keys(schemas);

  for (const key of keys) {
    fastify.addSchema(schemas[key]);
  }

})
