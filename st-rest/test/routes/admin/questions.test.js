import { test } from 'tap';
import { build } from '../../helper.js';
import { query } from '../../../db/index.js';

test('get all questions', async (t) => {
  const app = await build(t);

  const response = await app.inject({
    method: 'GET',
    url: '/admin/tests/1/parts/1/questions'
  });
  const payload = JSON.parse(response.payload);
  t.equal(response.statusCode, 200, 'El código de respuesta es 200 (OK)');
});

test('get question by id', async (t) => {
  const app = await build(t);
  const response = await app.inject({
    methor: 'GET',
    url: '/admin/tests/1/parts/1/questions/1'
  });
  const payload = JSON.parse(response.payload);
  t.equal(response.statusCode, 200, "El código de respuesta es 200 (OK)");
});

test('POST /admin/questions', async (t) => {
  //Arrange
  const resBd = await query('SELECT MAX(number) FROM public.questions WHERE "partId" = 1');
  const siguienteNumero = resBd.rows[0].max + 1;
  const app = await build(t);
  const payload = {
    "description": "Test 2 POST",
    "number": siguienteNumero,
    "isExample": false
  };
  const response = await app.inject({
    method: 'POST',
    url: '/admin/tests/1/parts/1/questions',
    payload
  });
  t.equal(response.statusCode, 201, 'El código de respuesta es 201 (Created)');
});

test('PUT /admin/questions/:id', async (t) => {
  const app = await build(t);
  const payload = {
    "id": 341,
    "description": "Test 2 PUT",
    "number": 344,
    "isExample": false
  };
  const response = await app.inject({
    method: 'PUT',
    url: '/admin/tests/1/parts/1/questions/341',
    payload
  });
  t.equal(response.statusCode, 200, "El código de respuesta es 200");
});

test('DELETE /admin/questions/:id', async (t) => {
  const app = await build(t);
  const response = await app.inject({
    method: 'DELETE',
    url: '/admin/tests/1/parts/1/questions/341'
  });
  t.equal(response.statusCode, 204, "El código de respuesta es 204 (No Content)(DELETE)");
});