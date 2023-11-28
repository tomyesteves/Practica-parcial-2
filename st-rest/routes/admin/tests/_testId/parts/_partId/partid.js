import { query } from "../../../../../../db/index.js";
import { getPartsQuery } from "../../../../../../db/queries/admin/parts.js";

export default async function (fastify, opts) {

  //  /admin/tests/:id/parts/:partId

  const getIdRouteSchema = {
    summary: 'Get a part by id',
    tags: ['administrator'],
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
      const resultado = await query("DELETE FROM \"parts\" WHERE id = $1", [request.params.partId]);
      reply.code(204);
    }
  })

  //UPDATE a part by id
  const putRouteSchema = {
    summary: 'Update a part by id',
    tags: ['administrator'],
    body: { $ref: "partsPostSchema" },
    response: {
      204: {
        $ref: "generic204ResponseSchema"
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
      await query("UPDATE \"parts\" SET name=$1, description=$2, \"exampleDescription\"=$3, \"timeLimit\"=$4 WHERE id=$5", [body.name, body.description, body.exampleDescription, body.timeLimit, id]);
      reply.code(204);
      return;
    }
  })
}