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
        "_links": {
            "type": "object",
            "properties": {
                "self": { $ref: "genericLinkSchema" }
            },
            "required": ["self"]
        }
    },
    "required": ["id", "name", "_links"]
}

const gradesResponseSchema = {
    "$id": 'gradesResponseSchema',
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
            "items": { $ref: 'gradeResponseSchema' }
        }
    },
    "required": ["_links", "_embedded"]
}


const gradesSchemas = {
    gradePostSchema, gradeResponseSchema, gradesResponseSchema,
}

export default gradesSchemas;