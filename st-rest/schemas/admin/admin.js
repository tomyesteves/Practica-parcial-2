const adminResponseSchema = {
    "$id": "adminResponseSchema",
    "type": "object",
    "properties": {
        "_links": {
            "type": "object",
            "properties": {
                "self": { $ref: "genericLinkSchema" },
                "grades": { $ref: "genericLinkSchema" },
                "tests": { $ref: "genericLinkSchema" },
            },
            "required": ["self", "grades", "tests"]
        }
    },
    "required": ["info", "_links"]
}


const adminSchemas = {
    adminResponseSchema,
}

export default adminSchemas;