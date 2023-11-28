import { query } from '../../db/index.js';

const evaluationsReset = `DROP TABLE IF EXISTS public."evaluations" CASCADE;
--- EVALUATIONS 
CREATE TABLE IF NOT EXISTS public."evaluations" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "secretToken" TEXT NOT NULL,
    "statusId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "evaluations_statusId_fk" FOREIGN KEY ("statusId") REFERENCES "statuses" ("id"),
    CONSTRAINT "evaluations_userId_fk" FOREIGN KEY ("userId") REFERENCES users ("id")
);`;

const reset = async () => {
    await query(evaluationsReset);
}

export { reset }