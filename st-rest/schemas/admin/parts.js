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
      "_links": {
        "type": "object",
        "properties": {
          "self": { $ref: "genericLinkSchema" }
        },
        "required": ["self"]
      },
    },
    "required": ["id", "name", "description", "exampleDescription", "timeLimit", "testId", "_links"]
  }
  
  const partsResponseSchema = {
    "$id": 'partsResponseSchema',
    "type": "object",
    "properties": {
      "_links": {
        "type": "object",
        "properties": {
          "self": { $ref: "genericLinkSchema" }
        },
        "required": ["self"]
      },
      "_embedded": {
        "type": "array",
        "items": { $ref: 'partResponseSchema' }
      }
    },
    "required": ["_links", "_embedded"]
  }
  
  const partsSchemas = {
    partResponseSchema, partsResponseSchema, partsPostSchema
  }
  
  export default partsSchemas;