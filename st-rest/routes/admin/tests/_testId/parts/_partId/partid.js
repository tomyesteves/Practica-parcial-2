import { query } from "../../../../../../db/index.js";
import { getPartsQuery } from "../../../../../../db/queries/admin/parts.js";

export default async function (fastify, opts) {

  //TODO: Falta schema para los params en todos los que llevan id
  //  /admin/tests/:id/parts/:partId

  const getIdRouteSchema = {
    summary: 'Get a part by id',
    tags: ['admin'],
    response: {
      200: {
        description: 'Ok.',
        content: {
          "application/json": {
            "schema": { $ref: 'partResponseSchema' }
          }
        }
      },
    },
  }

  fastify.get("/", {
    schema: getIdRouteSchema,
    handler: async function (request, reply) {
      const resultado = await query(getPartsQuery({ byId: true }), [request.params.partId]);
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
      const res = await query("DELETE FROM \"parts\" WHERE id = $1", [request.params.partId]);
      if (res.rows.length) return reply.notFound("No id " + request.params.partId + " found.");
      reply.code(204);
      return;
    }
  })

  //UPDATE a part by id
  const putRouteSchema = {
    summary: 'Update a part by id',
    tags: ['admin'],
    body: { $ref: "partsPostSchema" },
    response: {
      200: {
        $ref: "genericNoContentResponseSchema"
      }
    },
  }

  fastify.put("/", {
    schema: putRouteSchema,
    handler: async function (request, reply) {
      const id = request.params.partId;
      const body = request.body;
      if (id != body.id) {
        return reply.notAcceptable();
      }
      const res = await query('UPDATE "parts" SET name=$1, description=$2, "exampleDescription"=$3, "timeLimit"=$4 WHERE id=$5', [body.name, body.description, body.exampleDescription, body.timeLimit, id]);
      return res.rows[0];
    }
  })

}