import { query } from "../../../../db/index.js";
import { getTestsQuery } from "../../../../db/queries/admin/tests.js";

export default async function (fastify, opts) {
    //  /admin/tests/:testId/
    const getIdRouteSchema = {
        summary: 'Get a test by id',
        tags: ['administrator'],
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
            if (resultado.rowCount > 1) {
                throw fastify.httpErrors.internalServerError("Duplicated id");
            }
            const res = resultado.rows[0];
            return {
                ...res,
                _links: {
                    "self": { href: fastify.getFullLink(request, `${request.raw.url}`) },
                    "parts": { href: fastify.getFullLink(request, `${request.raw.url}/parts`) }
                }
            };
        }
    })
}