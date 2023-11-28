import { query } from "../../../db/index.js";
import { getGradesQuery } from "../../../db/queries/admin/grades.js";


export default async function (fastify, opts) {

  const getRouteSchema = {
    "$id": 'gradeResponsesSchema',
    summary: 'Get the list of grades',
    tags: ['administrator'],
    response: {
      200: {
        description: 'Ok. Return a grades list.',
        content: {
          "application/json": {
            "schema": {
              $ref: "gradesResponseSchema"
            }
          }
        }
      },
      204: {
        $ref: "generic204ResponseSchema"
      }
    },
  }

  //GET ALL grades
  fastify.get("/", {
    schema: getRouteSchema,
    handler: async function (request, reply) {
      const res = (await query(getGradesQuery())).rows
      return {
        _links: {
          self: { href: fastify.getFullLink(request) }
        },
        _embedded: res.map(g => ({
          ...g, _links: {
            self: { href: fastify.getFullLink(request, `${request.raw.url}/${g.id}`) }
          }
        })),
      };
    }
  })

  const getIdRouteSchema = {
    summary: 'Get a grade by id',
    tags: ['administrator'],
    response: {
      200: {
        description: 'Ok.',
        content: {
          "application/json": {
            "schema": { $ref: 'gradeResponseSchema' }
          }
        }
      },
    },
  }
  fastify.get("/:id", {
    schema: getIdRouteSchema,
    handler: async function (request, reply) {
      const resultado = await query(getGradesQuery({ byId: true }), [request.params.id]);
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
          "self": { href: fastify.getFullLink(request, `${request.raw.url}`) },
        }
      };
    }
  })

  //CREATE NEW GRADE
  const postRouteSchema = {
    summary: 'Create a new grade',
    tags: ['administrator'],
    body: { $ref: "gradePostSchema" },
    response: {
      201: {
        description: 'Ok. Successful grade creation.',
        content: {
          "application/json": {
            "schema": { $ref: "gradeResponseSchema" }
          }
        }
      }
    },
  }

  fastify.post("/", {
    schema: postRouteSchema,
    handler: async function (request, reply) {
      const body = request.body;
      console.log({ body });
      const { name } = body;

      const resultado = await query('INSERT INTO "grades"(name) VALUES($1) RETURNING *', [name]);
      reply.code(201);
      const res = resultado.rows[0];
      return {
        ...res,
        _links: {
          "self": { href: fastify.getFullLink(request, `${request.raw.url}`) },
        }
      };
    }
  })

  //UPDATE GRADE
  const putRouteSchema = {
    summary: 'Create a new grade',
    tags: ['administrator'],
    body: { $ref: "gradePostSchema" },
    response: {
      204: {
        $ref: "generic204ResponseSchema"
      }
    },
  }

  fastify.put("/:id", {
    schema: putRouteSchema,
    handler: async function (request, reply) {
      const id = request.params.id;
      const body = request.body;
      if (id != body.id) {
        return reply.notAcceptable();
      }
      await query('UPDATE grades SET name=$1 WHERE id=$2', [body.name, id]);
      reply.code(204);
      return;
    }
  })
}
