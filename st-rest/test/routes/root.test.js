import { test } from 'tap'
import { build } from '../helper.js'

test('default root route', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/'
  })

  t.same(JSON.parse(res.payload), {
    "info": {
      "title": "Probando OPEN API en softest",
      "description": "Testing the softest OpenAPI API",
      "version": "0.1.0"
    },
    "_links": {
      "self": {
        "href": "http://localhost:80/"
      },
      "admin": {
        "href": "http://localhost:80/admin"
      }
    }
  }, "La respuesta es la esperada.")
})
