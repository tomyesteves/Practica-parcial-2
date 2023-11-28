import fp from 'fastify-plugin'

const partsPostSchema = {
    "$id": "partsPostSchema",
    "type": 'object',
    "properties": {
        "name": { "type": 'string' },
        "description": { "type": 'string' },
        "exampleDescription": { "type": 'string' },
        "timeLimit": { "type": 'integer' },
        "testId": { "type": 'integer' },
    },
    "required": ['name', "description", "exampleDescription", "timeLimit"],
}

const partResponseSchema = {
    "$id": 'partResponseSchema',
    "type": "object",
    "properties": {
        "id": { "type": "integer" },
        "name": { "type": 'string' },
        "description": { "type": 'string' },
        "exampleDescription": { "type": 'string' },
        "timeLimit": { "type": 'integer' },
        "testId": { "type": 'integer' },
    },
    "required": ["id", "name", "description", "exampleDescription", "timeLimit", "testId"]
}

const partsResponseSchema = {
    "$id": "partsResponseSchema",
    "type": "array",
    "items": { $ref: 'partResponseSchema' }
}

export default fp(async (fastify) => {
    fastify.addSchema(partsPostSchema);
    fastify.addSchema(partResponseSchema);
    fastify.addSchema(partsResponseSchema);
})
