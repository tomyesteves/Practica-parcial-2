import { query } from "../../../../db/index.js";
import { getTestsQuery } from "../../../../db/queries/admin/tests.js";

export default async function (fastify, opts) {
    //  /admin/tests/:testId/
    const getIdRouteSchema = {
        summary: 'Get a test by id',
        tags: ['admin'],
        response: {
            200: {
                description: 'Ok.',
                content: {
                    "application/json": {
                        "schema": { $ref: 'testResponseSchema' }
                    }
                }
            },
        },
    }

    fastify.get("/", {
        schema: getIdRouteSchema,
        handler: async function (request, reply) {
            const resultado = await query(getTestsQuery({ byId: true }), [request.params.testId]);
            if (resultado.rowCount == 0) {
                throw fastify.httpErrors.notFound();
            }
            return resultado.rows[0];
        }
    })
}