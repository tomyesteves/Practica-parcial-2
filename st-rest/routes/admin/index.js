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