import { test } from 'tap'
import { build } from '../../helper.js'


test('GET /admin/tests', async (t) => {
    const app = await build(t);
    const response = await app.inject({
        method: 'GET',
        url: '/admin/tests',
    });
    t.equal(response.statusCode, 200);
    t.end();
});

test('GET /admin/tests/:id', async (t) => {
    const app = await build(t);
    const response = await app.inject({
        method: 'GET',
        url: '/admin/tests/1',
    });
    t.equal(response.statusCode, 200);
    t.end();
});

test('POST /admin/tests', async (t) => {
    const app = await build(t);
    const payload = { name: 'Test prueba' + Math.random(), initials: 'TP' + Math.random(), description: 'Test de prueba' };
    const response = await app.inject({
        method: 'POST',
        url: '/admin/tests',
        payload,
    });
    t.equal(response.statusCode, 201);
    t.end();
});

test('PUT /admin/tests/:id', async (t) => {
    const app = await build(t);
    const payload = { name: 'Test de Eficacia Lectora', initials: 'TECLE', description: 'Una descripción', isActive: true, id: 2 };
    const response = await app.inject({
        method: 'PUT',
        url: '/admin/tests/2',
        payload,
    });
    t.equal(response.statusCode, 200);
    t.end();
});

test('DELETE /admin/tests/:id', async (t) => {
    //ARRANGE
    const app = await build(t);
    const responsePOST = await app.inject({
        method: 'POST',
        url: '/admin/tests',
        payload: { name: 'Test prueba' + Math.random(), initials: 'TP' + Math.random(), description: 'Test de prueba' }
    });
    const { id } = JSON.parse(responsePOST.payload);
    //ACT
    const response = await app.inject({
        method: 'DELETE',
        url: '/admin/tests/' + id,
    });
    //ASSERT
    t.equal(response.statusCode, 204);
    t.end();
});
