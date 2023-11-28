import { query } from "../../../db/index.js";
import { getTestsQuery } from "../../../db/queries/admin/tests.js";

export default async function (fastify, opts) {

  const getRouteSchema = {
    "$id": 'gradeResponsesSchema',
    summary: 'Get the list of tests',
    tags: ['admin'],
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
      }
    },
  }

  fastify.get("/", {
    schema: getRouteSchema,
    handler: async function (request, reply) {
      const resultado = (await query(`
        SELECT T.*,SUM(P."timeLimit") as "timeLimit", COUNT(P.id) as "partCount" 
        FROM "tests" T 
        LEFT JOIN "parts" P ON P."testId" = T.id
        GROUP BY T.id
      `))
      return resultado.rows;
    }
  })


  //CREATE NEW TEST
  const postRouteSchema = {
    summary: 'Create a new test',
    tags: ['admin'],
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
      const resultado = await query(getTestsQuery({ byId: true }), [resultadoInsert.rows[0].id]);
      reply.code(201);
      return resultado.rows[0];
    }
  })

  const deleteRouteSchema = {
    "$id": 'testResponseSchema',
    summary: 'Delete a test by id',
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
        description: 'Ok. Successful test deletion',
        type: 'object',
        properties: {},
      },
    },
  };


  const putRouteSchema = {
    "$id": 'testResponseSchema',
    summary: 'Update a test by id',
    tags: ['admin'],
    params: {
      type: 'object',
      properties: {
        id: { type: 'integer' }
      },
      required: ['id'],
    },
    body: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        initials: { type: 'string' },
        description: { type: 'string' },
        isActive: { type: 'boolean' }
      },
      required: ['id', 'name', 'initials', 'description', 'isActive'],
    },
    response: {
      204: {
        description: 'Ok. Successful test update.',
        type: 'object',
        properties: {},
      },
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
      const response = await query('UPDATE public."tests" SET name=$1,initials=$2,description=$3,"isActive"=$4 WHERE id=$5 RETURNING *', [body.name, body.initials, body.description, body.isActive, id]);
      if (response.rows.length == 0) {
        return reply.notFound("No test with id " + id + " found.");
      }
      return response.rows[0];
    }
  })

  fastify.delete("/:id", {
    schema: deleteRouteSchema,
    handler: async function (request, reply) {
      const resultado = await query('DELETE FROM public."tests" WHERE id=$1', [request.params.id]);
      if (resultado.rowCount === 0) {
        throw fastify.httpErrors.notFound();
      }
      reply.code(204);
      return;
    },
  });

}