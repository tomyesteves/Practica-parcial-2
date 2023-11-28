import fp from 'fastify-plugin'

const questionsPostSchema = {
  "$id": "questionsPostSchema",
  "type": 'object',
  "properties": {
    "isExample": { "type": 'boolean' },
    "description": { "type": 'string' },
    "number": { "type": 'integer' },
    "partId": { "type": 'integer' },
  },
  "required": ['isExample', 'description', 'number'],
}

const questionResponseSchema = {
  "$id": 'questionResponseSchema',
  "type": "object",
  "properties": {
    "id": { "type": "integer" },
    "number": { "type": "integer" },
    "description": { "type": "string" },
    "isExample": { "type": "boolean" },
    "partId": { "type": "integer" },
  },
  "required": ["id", "number", "description", "isExample", "partId"]
}

const questionsResponseSchema = {
  "$id": 'questionsResponseSchema',
  "type": "array",
  "items": { $ref: 'questionResponseSchema' }
}

export default fp(async (fastify) => {

  fastify.addSchema(questionsPostSchema);
  fastify.addSchema(questionResponseSchema);
  fastify.addSchema(questionsResponseSchema);

})
