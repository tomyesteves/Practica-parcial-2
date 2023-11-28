import { query } from "../../../db/index.js";
import { getGradesQuery } from "../../../db/queries/admin/grades.js";


export default async function (fastify, opts) {

  const getRouteSchema = {
    "$id": 'gradeResponsesSchema',
    summary: 'Get the list of grades',
    tags: ['admin'],
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
    },
  }

  //GET ALL grades
  fastify.get("/", {
    schema: getRouteSchema,
    handler: async function (request, reply) {
      const res = (await query(getGradesQuery()))
      return res.rows;
    }
  })

  const getIdRouteSchema = {
    summary: 'Get a grade by id',
    tags: ['admin'],
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
      return resultado.rows[0];
    }
  })

  //CREATE NEW GRADE
  const postRouteSchema = {
    summary: 'Create a new grade',
    tags: ['admin'],
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
      const { name } = body;
      const resultado = await query('INSERT INTO "grades"(name) VALUES($1) RETURNING *', [name]);
      reply.code(201);
      return resultado.rows[0];
    }
  })

  //UPDATE GRADE
  const putRouteSchema = {
    summary: 'Create a new grade',
    tags: ['admin'],
    body: { $ref: "gradePostSchema" },
    response: {
      200: {
        description: 'Ok. Successful grade update.',
        content: {
          "application/json": {
            "schema": { $ref: "gradeResponseSchema" }
          }
        }
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
      const res = await query('UPDATE grades SET name=$1 WHERE id=$2 RETURNING *', [body.name, id]);
      if (res.rows.length !== 1) reply.notFound("No id " + id + " found.");
      return res.rows[0];
    }
  })

  const deleteRouteSchema = {
    "$id": 'gradeResponsesSchema',
    summary: 'Delete a course by id',
    tags: ['admin'],
    params: {
      type: 'object',
      properties: {
        id: { type: 'integer' }
      },
      required: ['id'],
    },
    response: {
      204: {
        description: 'Ok. Successful course deletion',
        type: 'object',
        properties: {},
      },
    },
  };
  fastify.delete("/:id", {
    schema: deleteRouteSchema,
    handler: async function (request, reply) {
      const id = request.params.id;
      const resultado = await query('DELETE FROM public.grades WHERE id=$1', [id]);

      if (resultado.rowCount === 0) {
        throw fastify.httpErrors.notFound();
      }

      reply.code(204);
      return;
    },
  });



}
