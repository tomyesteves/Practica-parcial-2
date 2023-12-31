import { query } from "../../../../db/index.js";
import { getEvaluationsQuery } from "../../../../db/queries/evaluators/evaluations.js";

export default async function (fastify, opts) {
    const getIdRouteSchema = {
        summary: 'Get an evaluation by id',
        tags: ['evaluators'],
        response: {
            200: {
                description: 'Ok.',
                content: {
                    "application/json": {
                        "schema": { $ref: 'evaluationResponseSchema' }
                    }
                }
            },
        },
    }

    // GET /evaluators/evaluations/:evaluationId/
    fastify.get("/", {
        schema: getIdRouteSchema,
        handler: async function (request, reply) {
            const id = request.params.evaluationId;
            const resultado = await query("SELECT * FROM evaluations e WHERE e.id=$1", [id]);
            if (resultado.rowCount == 0) {
                throw fastify.httpErrors.notFound();
            }
            return resultado.rows[0];
        }
    })

    const putRouteSchema = {
        summary: 'Update an evaluation',
        tags: ['evaluators'],
        body: { $ref: "evaluationPutSchema" },
        response: {
            200: {
                description: 'Ok. Successful evaluation edit.',
                content: {
                    "application/json": {
                        "schema": { $ref: "evaluationResponseSchema" }
                    }
                }
            },
            400: {
                description: 'Bad Request.',
                content: {
                    "application/json": {
                        "schema": { $ref: "generic400ResponseSchema" }
                    }
                }
            },
            404: {
                description: 'Evaluation not found.',
                content: {
                    "application/json": {
                        "schema": { $ref: "generic404ResponseSchema" }
                    }
                }
            }
        },
    }

    fastify.put('/', {
        // PUT /evaluators/evaluations/:evaluationId/
        schema: putRouteSchema,
        handler: async (request, reply) => {
            const id = request.body.id;
            const description = request.body.description;
            const institution = request.body.institution;
            const date = request.body.date;
            const statusId = request.body.statusId;
            if (id != request.params.evaluationId) {
                reply.code(400);
                return;
            }
            const resultUpdate = await query("UPDATE evaluations SET description = $1, institution = $2, date = $3, \"statusId\" = $4 WHERE id = $5 RETURNING *",
                [description, institution, date, statusId, id]);

            const res = resultUpdate.rows[0];
            if (res == null) {
                reply.code(404);
                return;
            }
            return res;
        }
    });

    const deleteRouteSchema = {
        summary: 'Delete an evaluation',
        tags: ['evaluators'],
        response: {
            204: {
                description: 'Ok. Successful evaluation delete.',
                content: {
                    "application/json": {
                        "schema": { $ref: "genericNoContentResponseSchema" }
                    }
                }
            },
            404: {
                description: 'Evaluation not found.',
                content: {
                    "application/json": {
                        "schema": { $ref: "generic404ResponseSchema" }
                    }
                }
            }
        },
    }

    fastify.delete('/', {
        onRequest: (request, reply, done) => {
            //TODO: console.log("Request aprobada en DELETE /evaluators/evaluations/:evaluationId/, sustituir por función de validación de token");
            done();
        },
        schema: deleteRouteSchema,
        handler: async (request, reply) => {
            const id = request.params.evaluationId;
            const result = await query("DELETE FROM evaluations WHERE id = $1", [id]);
            if (result.rowCount === 0) {
                //TODO: Retornar notFound
                reply.code(404);
                return;
            }
            reply.code(204);
        }
    });
}
