import fp from 'fastify-plugin'

const gradePostSchema = {
    "$id": "gradePostSchema",
    "type": 'object',
    "properties": {
        "name": { "type": 'string' },
    },
    "required": ['name'],
};

const gradeResponseSchema = {
    "$id": 'gradeResponseSchema',
    "type": "object",
    "properties": {
        "id": { "type": "integer" },
        "name": { "type": "string" },
    },
    "required": ["id", "name"]
}

const gradesResponseSchema = {
    "$id": 'gradesResponseSchema',
    "type": "array",
    "items": { $ref: 'gradeResponseSchema' }
}

export default fp(async (fastify) => {
    fastify.addSchema(gradePostSchema);
    fastify.addSchema(gradeResponseSchema);
    fastify.addSchema(gradesResponseSchema);

})
