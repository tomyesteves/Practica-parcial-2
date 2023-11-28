import { test } from 'tap'
import { build } from '../../../helper.js'
import * as cleanup from '../../../utils/cleanup.js';

test('Get all evaluations, OK', async (t) => {
    const app = await build(t)

    const response = await app.inject({
        url: '/evaluators/evaluations',
        method: 'GET'
    })

    t.teardown(async () => {
        await cleanup.reset();
    })

    t.equal(response.statusCode, 204, 'El código de respuesta es 204 (No Content)');
    t.end();
    });

test('Get ONE specific evaluation, OK', async (t) => {
    const app = await build(t)
    
    const postPayload = {
        description: "test",
        institution: "test",
        date: "2023-09-24",
        userId: 0
    }
    const postRes = await app.inject({
        url: '/evaluators/evaluations/',
        method: 'POST',
        payload: postPayload
    });
    
    const response = await app.inject({
        url: '/evaluators/evaluations/1',
        method: 'GET'
    })

    t.teardown(async () => {
        await cleanup.reset();
    })

    t.equal(response.statusCode, 200, 'El código de respuesta es 200 en ambos casos (OK)');
    t.end();
    });
test('Get ONE specific evaluation, not OK', async (t) => {
    const app = await build(t)
    
    const postPayload = {
        description: "test",
        institution: "test",
        date: "2023-09-24",
        userId: 0
    }
    const postRes = await app.inject({
        url: '/evaluators/evaluations/',
        method: 'POST',
        payload: postPayload
    });
    
    const response = await app.inject({
        url: '/evaluators/evaluations/24',
        method: 'GET'
    })

    t.teardown(async () => {
        await cleanup.reset();
    })

    t.equal(response.statusCode, 404, 'El código de respuesta es 404 en ambos casos (NOT FOUND)');
    t.end();
    });

test('Update an evaluation, OK', async (t) => {
    const app = await build(t);

    const postPayload = {
        description: "test",
        institution: "test",
        date: "2023-09-24",
        userId: 0
    }
    const postRes = await app.inject({
        url: '/evaluators/evaluations/',
        method: 'POST',
        payload: postPayload
    });

    const putPayload = {
        id: 1,
        description: "test",
        institution: "test",
        date: "2023-09-24",
        statusId: 1
    };

    const res = await app.inject({
        url: '/evaluators/evaluations/1',
        method: 'PUT',
        payload: putPayload
    });

    t.teardown(async () => {
        await cleanup.reset();
    })

    t.same(res.statusCode, 200, 'El código de respuesta es 200 (OK)');
    t.same(JSON.parse(res.body).statusId, 1, 'El statusId es el mismo');
    t.end();
    });


test('Update an evaluation, not OK', async (t) => {
    const app = await build(t);

    const postPayload = {
        description: "test",
        institution: "test",
        date: "2023-09-24",
        userId: 0
    }
    const postRes = await app.inject({
        url: '/evaluators/evaluations/',
        method: 'POST',
        payload: postPayload
    });

    const putPayload = {
        id: 1,
        description: "test",
        institution: "test",
        date: "2023-09-24",
        statusId: 1
    };

    const res = await app.inject({
        url: '/evaluators/evaluations/4',
        method: 'PUT',
        payload: putPayload
    });

    t.teardown(async () => {
        await cleanup.reset();
    })

    t.equal(res.statusCode, 400, 'El código de respuesta es 400 (Bad Request - Código distinto en body y params request)');
    t.end();
    }
)

test('Update an evaluation, not OK', async (t) => {
    const app = await build(t);

    const postPayload = {
        description: "test",
        institution: "test",
        date: "2023-09-24",
        userId: 0
    }
    const postRes = await app.inject({
        url: '/evaluators/evaluations/',
        method: 'POST',
        payload: postPayload
    });

    const putPayload = {
        id: 100,
        description: "test",
        institution: "test",
        date: "2023-09-24",
        statusId: 1
    };

    const res = await app.inject({
        url: '/evaluators/evaluations/100',
        method: 'PUT',
        payload: putPayload
    });

    t.teardown(async () => {
        await cleanup.reset();
    })

    t.equal(res.statusCode, 404, 'El código de respuesta es 404 (Not found)');
    t.end();
    });
test('Delete an evaluation, OK', async (t) => {
    const app = await build(t);

    const postPayload = {
        description: "test",
        institution: "test",
        date: "2023-09-24",
        userId: 0
    }
    const postRes = await app.inject({
        url: '/evaluators/evaluations/',
        method: 'POST',
        payload: postPayload
    });

    const res = await app.inject({
        url: '/evaluators/evaluations/1',
        method: 'DELETE'
    });

    t.teardown(async () => {
        await cleanup.reset();
    })

    t.equal(res.statusCode, 204, 'El código de respuesta es 204 en ambos casos (NO CONTENT)');
    t.end();
    });

test('Delete an evaluation, NOT OK', async (t) => {
    const app = await build(t);

    const postPayload = {
        description: "test",
        institution: "test",
        date: "2023-09-24",
        userId: 0
    }
    const postRes = await app.inject({
        url: '/evaluators/evaluations/',
        method: 'POST',
        payload: postPayload
    });

    const res = await app.inject({
        url: '/evaluators/evaluations/123',
        method: 'DELETE'
    });

    t.teardown(async () => {
        await cleanup.reset();
    })

    t.equal(res.statusCode, 404, 'El código de respuesta es 404 en ambos casos (NOT FOUND)');
    t.end();
    });