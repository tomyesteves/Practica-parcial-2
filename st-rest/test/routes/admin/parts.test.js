import { test } from 'tap';
import { build } from '../../helper.js';

test('get all parts', async (t) => {
  const app = await build(t);

  const response = await app.inject({
    method: 'GET',
    url: '/admin/tests/1/parts'
  });
  const payload = JSON.parse(response.payload);

  t.equal(response.statusCode, 200, 'El código de respuesta es 200 (OK)');
});

test('get part by id', async (t) => {
  const app = await build(t);
  const response = await app.inject({
    methor: 'GET',
    url: '/admin/tests/1/parts/1'
  });
  const payload = JSON.parse(response.payload);
  t.equal(response.statusCode, 200, "El código de respuesta es 200 (OK)");
});

test('POST /admin/parts', async (t) => {
  const app = await build(t);
  const payload = {
    "name": "Rodrigo Carbonero",
    "description": "Un grande",
    "exampleDescription": "Es muy grande",
    "timeLimit": 3
  };
  const response = await app.inject({
    method: 'POST',
    url: '/admin/tests/1/parts',
    payload
  });
  t.equal(response.statusCode, 201, 'El código de respuesta es 201 (Created)');
});

test('PUT /admin/parts/:id', async (t) => {
  const app = await build(t);
  const payload = {
    "id": 8,
    "name": "Rodrigo Carboneroooo",
    "description": "Un grandeee",
    "exampleDescription": "Es muy grandeee",
    "timeLimit": 3
  };
  const response = await app.inject({
    method: 'PUT',
    url: '/admin/tests/1/parts/8',
    payload
  });
  t.equal(response.statusCode, 200, "El código de respuesta es 200");
});

test('DELETE /admin/parts/:id', async (t) => {
  const app = await build(t);
  const response = await app.inject({
    method: 'DELETE',
    url: '/admin/tests/1/parts/8'
  });
  t.equal(response.statusCode, 204, "El código de respuesta es 204 (No Content)(DELETE)");
});