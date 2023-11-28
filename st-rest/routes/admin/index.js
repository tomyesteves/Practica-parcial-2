import jwt from "@fastify/jwt"

export default async function (fastify, opts) {

  // fastify.register(jwt, {
  //   secret: "MY_SUPER-SECRET.KEY",
  //   sign: {
  //     algorithm: 'HS256',
  //     iss: 'jmelnik.ddns.net',
  //     expiresIn: 30,
  //   },
  // })
  // fastify.decorate("authenticateAdmin", async function (request, reply) {
  //   try {
  //     await request.jwtVerify()
  //   } catch (err) {
  //     reply.send(err)
  //   }
  // })

  fastify.get("/", {
    schema: {
      summary: 'Administrators endpoint',
      tags: ['administrator'],
      response: {
        200: {
          description: 'Ok.',
          content: {
            "application/json": {
              "schema": { $ref: "adminResponseSchema" }
            }
          }
        }
      }
    },
    // onRequest: [fastify.authenticateAdmin],
    handler: (request, reply) => {
      // const urlCompleta = request.protocol + '://' + request.hostname + request.raw.url;
      //TODO: Acá la respuesta debería ser según que rol tenga el usuario.
      const res = {
        "info": fastify.swagger().info,
        _links: {
          self: { href: fastify.getFullLink(request) },
          "grades": { href: fastify.getFullLink(request, `${request.raw.url}/grades`) },
          "tests": { href: fastify.getFullLink(request, `${request.raw.url}/tests`) }
        }
      }
      reply.send(res);
    }
  });

  fastify.get("/prueba", {
    // onRequest: [fastify.authenticateAdmin],
    handler: async function (request, reply) {
      console.log(request.user);
      return request.user;
    }
  },
  )

  fastify.post('/login', (request, reply) => {
    const { username, password } = request.body;
    if (password != "lepassword" || username != "admin") {
      reply.unauthorized();
      return;
    }
    const roles = ["admin"];
    const token = fastify.jwt.sign({ username, roles })
    reply.send({ token })
  })

}