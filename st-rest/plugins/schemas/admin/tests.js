import fp from 'fastify-plugin'

const testPostSchema = {
    "$id": "testPostSchema",
    "type": 'object',
    "properties": {
        "name": { type: 'string' },
        "initials": { type: 'string' },
        "description": { type: 'string' },
    },
    "required": ['name', "initials", "description"],
};

const testResponseSchema = {
    $id: 'testResponseSchema',
    type: 'object',
    properties: {
        "id": { type: 'number', format: 'int32' },
        name: { type: 'string' },
        initials: { type: 'string' },
        description: { type: 'string' },
        isActive: { type: 'boolean' },
        partCount: { type: 'number', format: 'int32' },
    },
    //FIXME: No están como required los q se construyen en base al JOIN
    required: ["id", "name", "initials", "description", "isActive", "partCount"]
}

const testsResponseSchema = {
    "$id": 'testsResponseSchema',
    "type": "object",
    "type": "array",
    "items": { $ref: 'testResponseSchema' }
}

export default fp(async (fastify) => {

    fastify.addSchema(testPostSchema);
    fastify.addSchema(testResponseSchema);
    fastify.addSchema(testsResponseSchema);

})
