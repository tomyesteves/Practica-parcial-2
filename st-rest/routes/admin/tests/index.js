import { query } from "../../../db/index.js";
import { getTestsQuery } from "../../../db/queries/admin/tests.js";

export default async function (fastify, opts) {

  const getRouteSchema = {
    "$id": 'gradeResponsesSchema',
    summary: 'Get the list of tests',
    tags: ['administrator'],
    response: {
      200: {
        description: 'Ok. Return a tests list.',
        content: {
          "application/json": {
            "schema": {
              $ref: "testsResponseSchema"
            }
          }
        }
      },
      204: {
        $ref: "generic204ResponseSchema"
      }
    },
  }

  fastify.get("/", {
    schema: getRouteSchema,
    handler: async function (request, reply) {
      //,array_agg(P.name) as parts
      const resultado = (await query(getTestsQuery()))
      if (resultado.rowCount == 0) {
        reply.code(204);
        return;
      }
      const res = resultado.rows;
      return {
        _links: {
          self: { href: fastify.getFullLink(request) }
        },
        _embedded: res.map(t => ({
          ...t, _links: {
            self: { href: fastify.getFullLink(request, `${request.raw.url}/${t.id}`) },
            parts: { href: fastify.getFullLink(request, `${request.raw.url}/${t.id}/parts`) }
          }
        })),
      };
    }
  })


  //CREATE NEW TEST
  const postRouteSchema = {
    summary: 'Create a new test',
    tags: ['administrator'],
    body: { $ref: "testPostSchema" },
    response: {
      201: {
        description: 'Ok. Successful test creation.',
        content: {
          "application/json": {
            "schema": { $ref: "testResponseSchema" }
          }
        }
      }
    },
  }

  fastify.post("/", {
    schema: postRouteSchema,
    handler: async function (request, reply) {
      const { name, initials, description } = request.body;
      const resultadoInsert = await query('INSERT INTO "tests"(name,initials,description) VALUES($1,$2,$3) RETURNING id', [name, initials, description]);
      reply.code(201);
      const resultado = await query(getTestsQuery({ byId: true }), [resultadoInsert.rows[0].id]);
      const res = resultado.rows[0];
      return {
        ...res,
        _links: {
          "self": { href: fastify.getFullLink(request, `${request.raw.url}`) },
          "parts": { href: fastify.getFullLink(request, `${request.raw.url}/parts`) }
        }
      };
    }
  })

}