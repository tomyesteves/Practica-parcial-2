import adminSchemas from "./admin/admin.js"
import gradesSchemas from "./admin/grades.js"
import testsSchemas from "./admin/tests.js"
import evaluationsSchemas from "./evaluators/evaluations.js"
import questionsSchemas from "./admin/questions.js"
import partsSchemas from "./admin/parts.js"

const genericLinkSchema = {
    $id: "genericLinkSchema",
    "type": "object",
    "properties": {
        "href": { "type": "string" }
    },
    "required": ["href"]
}

const generic204ResponseSchema = {
    $id: "generic204ResponseSchema",
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

const schemas = {
    genericLinkSchema, generic204ResponseSchema, generic404ResponseSchema, generic400ResponseSchema,
    ...adminSchemas,
    ...gradesSchemas,
    ...testsSchemas,
    ...evaluationsSchemas,
    ...questionsSchemas,
    ...partsSchemas
}

export default schemas;