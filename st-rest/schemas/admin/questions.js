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
    "_links": {
      "type": "object",
      "properties": {
        "self": { $ref: "genericLinkSchema" }
      },
      "required": ["self"]
    },
  },
  "required": ["id", "number", "description", "isExample", "partId", "_links"]
}

const questionsResponseSchema = {
  "$id": 'questionsResponseSchema',
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
      "items": { $ref: 'questionResponseSchema' }
    }
  },
  "required": ["_links", "_embedded"]
}

const questionsSchemas = {
  questionResponseSchema, questionsResponseSchema, questionsPostSchema
}

export default questionsSchemas;