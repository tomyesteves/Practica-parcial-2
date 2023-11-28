import { query } from "../../../db/index.js";
import { getEvaluationsQuery } from "../../../db/queries/evaluators/evaluations.js";

export default async function (fastify, opts) {
    const postRouteSchema = {
        summary: 'Add an evaluation',
        tags: ['evaluators'],
        response: {
            201: {
                description: 'Ok. Successful evaluation add.',
                content: {
                    "application/json": {
                        "schema": { $ref: 'evaluationResponseSchema' }
                    }
                }
            }
        },
    }

    fastify.post("/", {
        onRequest: (request, reply, done) => {
            //TODO: "Request aprobada en POST /evaluators/evaluations/, sustituir por función de validación de token"
            done();
        },
        schema: postRouteSchema,
        handler: async function (request, reply) {
            const description = request.body.description;
            const institution = request.body.institution;
            const date = request.body.date;
            const userId = request.body.userId;
            //secretToken basado en función now(), convertido a hexadecimal
            const secretToken = Date.now().toString(36);
            const statusId = 0;
            const res = await query("INSERT INTO evaluations (description, institution, date, \"secretToken\", \"statusId\", \"userId\") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
                [description, institution, date, secretToken, statusId, userId]);
            reply.code(201);
            return res.rows[0];
        }
    });

    const getEvaluationsRouteSchema = {
        "$id": 'evaluationsResponsesSchema',
        summary: 'Get the list of evaluations',
        tags: ['evaluators'],
        response: {
            200: {
                description: 'Ok. Return an evaluations list.',
                content: {
                    "application/json": {
                        "schema": {
                            $ref: "evaluationsResponseSchema"
                        }
                    }
                }
            },
        },
    };

    fastify.get("/", {
        onRequest: (request, reply, done) => {
            //TODO: console.log("Request aprobada en GET /evaluators/evaluations/, sustituir por función de validación de token");
            done();
        },
        schema: getEvaluationsRouteSchema,
        handler: async (request, reply) => {
            const resultado = (await query("SELECT * FROM evaluations"));
            return resultado.rows;
        },
    });
}
