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
                "parts": {
                    "type": "object",
                    "properties": {
                        "href": { "type": "string" }
                    },
                    "required": ["href"]
                },
            },
            "required": ["self", "parts"]
        }
    },
    //FIXME: No están como required los q se construyen en base al JOIN
    required: ["id", "name", "initials", "description", "isActive", "partCount", "_links"]
}

const testsResponseSchema = {
    "$id": 'testsResponseSchema',
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
            "items": { $ref: 'testResponseSchema' }
        }
    },
    "required": ["_links", "_embedded"]
}

const testsSchemas = {
    testResponseSchema, testsResponseSchema, testPostSchema
}

export default testsSchemas;