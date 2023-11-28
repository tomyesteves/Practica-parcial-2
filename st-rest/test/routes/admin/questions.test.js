import { test } from 'tap';
import { build } from '../../helper.js';

test('get all questions', async (t) => {
  const app = await build(t);

  const response = await app.inject({
    method: 'GET',
    url: '/admin/tests/1/parts/1/questions'
  });
  const payload = JSON.parse(response.payload);

  t.equal(response.statusCode, 200, 'El código de respuesta es 200 (OK)');
  // No tiene mucho sentido chequear por _links, ya que los esquemas deberían detectarlo.
  t.ok(payload.hasOwnProperty('_links'), 'La propiedad "_links" existe en la respuesta');
});

test('get question by id', async (t) => {
  const app = await build(t);
  const response = await app.inject({
    methor: 'GET',
    url: '/admin/tests/1/parts/1/questions/1'
  });
  const payload = JSON.parse(response.payload);
  t.equal(response.statusCode, 200, "El código de respuesta es 200 (OK)");
  t.ok(payload.hasOwnProperty('_links'), 'La propiedad "_links" existe en la respuesta');
});

test('POST /admin/questions', async (t) => {
  const app = await build(t);
  const payload = {
    "description":"Test 2 POST",
    "number": 342,
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
    "description":"Test 2 PUT",
    "number": 344,
    "isExample": false
  };
  const response = await app.inject({
    method: 'PUT',
    url: '/admin/tests/1/parts/1/questions/341',
    payload
  });
  t.equal(response.statusCode, 204, "El código de respuesta es 204 (No Content)(PUT)");
});

test('DELETE /admin/questions/:id', async (t) => {
  const app = await build(t);
  const response = await app.inject({
    method: 'DELETE',
    url: '/admin/tests/1/parts/1/questions/341'
  });
  t.equal(response.statusCode, 204, "El código de respuesta es 204 (No Content)(DELETE)");
});