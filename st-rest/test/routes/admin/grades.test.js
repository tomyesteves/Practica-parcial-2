import { test } from 'tap';
import { build } from '../../helper.js';

test('get all grades', async (t) => {
  const app = await build(t);

  const response = await app.inject({
    method: 'GET',
    url: '/admin/grades'
  });
  const payload = JSON.parse(response.payload);

  t.equal(response.statusCode, 200, 'El código de respuesta es 200 (OK)');
});

test('get grade by id', async (t) => {
  const app = await build(t);
  const response = await app.inject({
    methor: 'GET',
    url: '/admin/grades/1'
  });
  const payload = JSON.parse(response.payload);
  //TODO: Chequear el payload.
  t.equal(response.statusCode, 200);
});

test('POST /admin/grades', async (t) => {
  const app = await build(t);
  const payload = { name: 'Curso ' + Math.random() };
  const response = await app.inject({
    method: 'POST',
    url: '/admin/grades',
    payload
  });
  t.equal(response.statusCode, 201);
  //TODO: Chequear el payload.
});

test('PUT /admin/grades/:id', async (t) => {
  const app = await build(t);
  const payload = { id: 1, name: 'Curso actualizado' };
  const response = await app.inject({
    method: 'PUT',
    url: '/admin/grades/1',
    payload
  });
  t.equal(response.statusCode, 200);
  //TODO: Chequear el payload.
});

test('DELETE /admin/grades/:id', async (t) => {
  //ARRANGE
  //TODO: Hay que crear uno antes de borrarlo
  const app = await build(t);
  const responsePOST = await app.inject({
    method: 'POST',
    url: '/admin/grades',
    payload: { name: 'Curso ' + Math.random() }
  });
  const { id } = JSON.parse(responsePOST.payload);

  //ACT
  const response = await app.inject({
    method: 'DELETE',
    url: `/admin/grades/${id}`
  });

  //ASSERT
  t.equal(response.statusCode, 204);
});
