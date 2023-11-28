import { query } from "../../../../../../../db/index.js"

export default async function (fastify, opts) {

  const getRouteSchema = {
    "$id": 'questionResponsesSchema',
    summary: 'Get the list of questions',
    tags: ['admin'],
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
    },
  }

  //GET ALL questions
  fastify.get("/", {
    schema: getRouteSchema,
    handler: async function (request, reply) {
      const res = await query('SELECT * from "questions" Q  WHERE Q.id=$1 AND Q."partId"=$2 ', [request.params.id, request.params.partId]);
      return res.rows;
    }
  })

  //CREATE a new question
  const postRouteSchema = {
    summary: 'Create a new question',
    tags: ['admin'],
    body: { $ref: "questionsPostSchema" },
    response: {
      201: {
        description: 'Ok.',
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
      const resultado = await query('INSERT INTO "questions"(description, number, "partId", "isExample") VALUES($1, $2, $3, $4) RETURNING *', [request.body.description, request.body.number, request.params.partId, request.body.isExample]);
      reply.code(201);
      return resultado.rows[0];
    }
  })

}