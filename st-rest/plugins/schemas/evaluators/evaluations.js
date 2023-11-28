import fp from 'fastify-plugin'

const evaluationPutSchema = {
  "$id": "evaluationPutSchema",
  "type": 'object',
  "properties": {
    "id": { type: 'number', format: 'int32' },
    "description": { type: 'string' },
    "institution": { type: 'string' },
    "date": { type: 'string', format: 'date' },
    "statusId": { type: 'number', format: 'int32' }
  },
  "required": ["id", "description", "institution", "date", "statusId"]
}

const evaluationResponseSchema = {
  $id: 'evaluationResponseSchema',
  type: 'object',
  properties: {
    "id": { type: 'number', format: 'int32' },
    "description": { type: 'string' },
    "institution": { type: 'string' },
    "date": { type: 'string', format: 'date' },
    "secretToken": { type: 'string' },
    "statusId": { type: 'number', format: 'int32' },
  },
  required: ["id", "description", "institution", "date", "secretToken", "statusId"]
}

const evaluationsResponseSchema = {
  "$id": 'evaluationsResponseSchema',
  "type": "array",
  "items": { $ref: 'evaluationResponseSchema' }
}

export default fp(async (fastify) => {

  fastify.addSchema(evaluationPutSchema);
  fastify.addSchema(evaluationResponseSchema);
  fastify.addSchema(evaluationsResponseSchema);

})
