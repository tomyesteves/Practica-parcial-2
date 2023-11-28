import { query } from "../../../../../../../../db/index.js";
import { getQuestionsQuery } from "../../../../../../../../db/queries/admin/questions.js";

export default async function (fastify, opts) {

  //GET a question
  const getIdRouteSchema = {
    summary: 'Get a question by id',
    tags: ['admin'],
    response: {
      200: {
        description: 'Ok.',
        content: {
          "application/json": {
            "schema": { $ref: 'questionResponseSchema' }
          }
        }
      },
    },
  }

  fastify.get("/", {
    schema: getIdRouteSchema,
    handler: async function (request, reply) {
      const resultado = await query(
        'SELECT * from "questions" Q WHERE Q.id=$1 AND Q."partId"=$2',
        [request.params.questionId, request.params.partId]
      );
      if (resultado.rowCount == 0) {
        throw fastify.httpErrors.notFound();
      }
      return resultado.rows[0];
    }
  })

  //DELETE a question by id
  const deleteRouteSchema = {
    summary: 'Delete a question by id',
    tags: ['admin'],
    response: {
      204: {
        $ref: "genericNoContentResponseSchema"
      }
    },
  }

  fastify.delete("/", {
    schema: deleteRouteSchema,
    handler: async function (request, reply) {
      const res = await query("DELETE FROM \"questions\" WHERE id = $1", [request.params.questionId]);
      //TODO: Y si el id es erróneo? Deberíamos retornar 404
      reply.code(204)
      return;
    }
  })

  //UPDATE a question by id
  const putRouteSchema = {
    summary: 'Update a question by id',
    tags: ['admin'],
    body: { $ref: "questionsPostSchema" },
    response: {
      200: {
        description: 'Ok.',
        content: {
          "application/json": {
            "schema": { $ref: 'questionResponseSchema' }
          }
        }
      },
    },
  }

  fastify.put("/", {
    schema: putRouteSchema,
    handler: async function (request, reply) {
      const id = request.params.questionId;
      const body = request.body;
      if (id != body.id) {
        return reply.notAcceptable();
      }
      const res = await query("UPDATE \"questions\" SET description=$1, number=$2, \"isExample\"=$3 WHERE id=$4 RETURNING *", [body.description, body.number, body.isExample, id]);
      return res.rows[0];
    }
  })
}