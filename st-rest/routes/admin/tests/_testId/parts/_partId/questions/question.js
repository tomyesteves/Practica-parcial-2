import { query } from "../../../../../../../db/index.js"
import { getQuestionsQuery } from "../../../../../../../db/queries/admin/questions.js"

export default async function (fastify, opts) {

  const getRouteSchema = {
    "$id": 'questionResponsesSchema',
    summary: 'Get the list of questions',
    tags: ['administrator'],
    response: {
      200: {
        description: 'Ok. Return a questions list.',
        content: {
          "application/json": {
            "schema": {
              $ref: "questionsResponseSchema"
            }
          }
        }
      },
      204: {
        $ref: "generic204ResponseSchema"
      }
    },
  }

  //GET ALL questions
  fastify.get("/", {
    schema: getRouteSchema,
    handler: async function (request, reply) {
      const res = (await query(getQuestionsQuery({byPartId: true}), [request.params.partId])).rows
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

  //CREATE a new question
  const postRouteSchema = {
    summary: 'Create a new question',
    tags: ['administrator'],
    body: { $ref: "questionsPostSchema" },
    response: {
      201: {
        description: 'Ok. Successfully created a new question.',
        content: {
          "application/json": {
            "schema": { $ref: 'questionResponseSchema' }
          }
        }
      },
    }
  }

  fastify.post("/", {
    schema: postRouteSchema,
    handler: async function (request, reply) {
      const resultado = await query("INSERT INTO \"questions\"(description, number, \"partId\", \"isExample\") VALUES($1, $2, $3, $4) RETURNING *", [request.body.description, request.body.number, request.params.partId, request.body.isExample]);
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