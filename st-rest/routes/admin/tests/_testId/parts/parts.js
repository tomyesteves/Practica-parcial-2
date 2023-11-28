import { query } from "../../../../../db/index.js";
import { getPartsQuery } from "../../../../../db/queries/admin/parts.js"; 

export default async function (fastify, opts) {

  const getRouteSchema = {
    "$id": 'partResponsesSchema',
    summary: 'Get the list of parts',
    tags: ['administrator'],
    response: {
      200: {
        description: 'Ok. Return a parts list.',
        content: {
          "application/json": {
            "schema": {
              $ref: "partsResponseSchema"
            }
          }
        }
      },
      204: {
        $ref: "generic204ResponseSchema"
      }
    },
  }

  //GET ALL parts
  fastify.get("/", {
    schema: getRouteSchema,
    handler: async function (request, reply) {
      const res = (await query(getPartsQuery())).rows
      return {
        _links: {
          self: { href: fastify.getFullLink(request) }
        },
        _embedded: res.map(q => ({
          ...q, _links: {
            self: { href: fastify.getFullLink(request, `${request.raw.url}/${q.id}`) }
          }
        })),
      };
    }
  })

   //CREATE a new part
   const postRouteSchema = {
    summary: 'Create a new part',
    tags: ['administrator'],
    body: { $ref: "partsPostSchema" },
    response: {
      201: {
        description: 'Ok. Successfully created a new parts.',
        content: {
          "application/json": {
            "schema": { $ref: 'partResponseSchema' }
          }
        }
      },
    }
  }

  fastify.post("/", {
    schema: postRouteSchema,
    handler: async function (request, reply) {
      const resultado = await query("INSERT INTO \"parts\"(name, description, \"exampleDescription\", \"timeLimit\", \"testId\") VALUES($1, $2, $3, $4, $5) RETURNING *", [request.body.name, request.body.description, request.body.exampleDescription, request.body.timeLimit, request.params.testId]);
      reply.code(201);
      const res = resultado.rows[0];
      return {
        ...res,
        _links: {
          self: { href: fastify.getFullLink(request, `${request.raw.url}/${res.id}`) },
        }
      }
    }
  })

}