const evaluationPostSchema = {
    "$id": "evaluationPostSchema",
    "type": "object",
    "properties": {
        "_links": {
            "type": "object",
            "properties": {
                "self": { $ref: "genericLinkSchema" },
            },
            "required": ["self"]
        },
        "_embedded": {
            "properties": {
                "items": { $ref: "genericLinkSchema" },
            },
            "required": ["items"]
        }
    },
    "required": ["_links", "_embedded"]
}

const evaluationPutSchema = {
    "$id": "evaluationPutSchema",
    "type": 'object',
    "properties": {
        "id": { type: 'number', format: 'int32' },
        "description": { type: 'string' },
        "institution": { type: 'string' },
        "date": { type: 'string', format: 'date' },
        "statusId": { type: 'number', format: 'int32'}
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
        "_links": {
            "type": "object",
            "properties": {
                "self": {
                    "type": "object",
                    "properties": {
                        "href": { "type": "string" }
                    },
                    "required": ["href"]
                },
            },
            "required": ["self"]
        }
    },
    required: ["id", "description", "institution", "date", "secretToken", "statusId", "_links"]
}

const evaluationsResponseSchema = {
    "$id": 'evaluationsResponseSchema',
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
            "items": { $ref: 'evaluationResponseSchema' }
        }
    },
    "required": ["_links", "_embedded"]
}

const evaluationsSchemas = {
    evaluationPostSchema, evaluationResponseSchema, evaluationsResponseSchema, evaluationPutSchema
}

export default evaluationsSchemas;
