import { test } from 'tap'
import { build } from '../../helper.js'

test('get all grades', async (t) => {

  const app = await build(t)

  const response = await app.inject({
    url: '/admin/grades'
  })
  const payload = JSON.parse(response.payload);

  t.equal(response.statusCode, 200, 'El código de respuesta es 200 (OK)');
  //No tiene mucho sentido chequear por _links, ya que los esquemas deberían detectarlo.
  t.ok(payload.hasOwnProperty('_links'), 'La propiedad "_links" existe en la respuesta');
})
