import fp from 'fastify-plugin'

const genericNoContentResponseSchema = {
  $id: "genericNoContentResponseSchema",
  "description": "Ok. No elements found",
  type: "null",
}

const generic400ResponseSchema = {
  $id: "generic400ResponseSchema",
  "description": "Bad request",
  type: "null",
}

const generic404ResponseSchema = {
  $id: "generic404ResponseSchema",
  "type": "object",
  "properties": {
    "href": { "type": "string" }
  },
  "required": ["message"]
}


export default fp(async (fastify) => {

  fastify.addSchema(genericNoContentResponseSchema);
  fastify.addSchema(generic400ResponseSchema);
  fastify.addSchema(generic404ResponseSchema);
  fastify.addSchema({
    $id: "idParamSchema",
    description: "Id de la ruta",
    type: 'object',
    properties: {
      id: { type: 'number' }
    }
  });

})
