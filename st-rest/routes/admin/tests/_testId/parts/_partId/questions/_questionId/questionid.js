import { query } from "../../../../../../../../db/index.js";
import { getQuestionsQuery } from "../../../../../../../../db/queries/admin/questions.js";

export default async function (fastify, opts) {

  //GET a question
  const getIdRouteSchema = {
    summary: 'Get a question by id',
    tags: ['administrator'],
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
      const resultado = await query(getQuestionsQuery({ byId: true, byPartId: true }), [request.params.questionId, request.params.partId]);
      if (resultado.rowCount == 0) {
        throw fastify.httpErrors.notFound();
      }
      if (resultado.rowCount > 1) {
        throw fastify.httpErrors.internalServerError("Duplicated id");
      }
      const res = resultado.rows[0];
      return {
        ...res,
        _links: {
          self: { href: fastify.getFullLink(request, `${request.raw.url}`) }
        }
      };
    }
  })

  //DELETE a question by id
  const deleteRouteSchema = {
    summary: 'Delete a question by id',
    tags: ['administrator'],
    response: {
      204: {
        $ref: "generic204ResponseSchema"
      }
    },
  }

  fastify.delete("/", {
    schema: deleteRouteSchema,
    handler: async function (request, reply) {
      const resultado = await query("DELETE FROM \"questions\" WHERE id = $1", [request.params.questionId]);
      reply.code(204);
    }
  })

  //UPDATE a question by id
  const putRouteSchema = {
    summary: 'Update a question by id',
    tags: ['administrator'],
    body: { $ref: "questionsPostSchema" },
    response: {
      204: {
        $ref: "generic204ResponseSchema"
      }
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
      await query("UPDATE \"questions\" SET description=$1, number=$2, \"isExample\"=$3 WHERE id=$4", [body.description, body.number, body.isExample, id]);
      reply.code(204);
      return;
    }
  })
}