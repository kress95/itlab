import * as express from 'express'

import models from './models'
import * as order from './controllers/order'

const app = express()
const port = process.env.PORT || 3000

app.use(express.static('dist/public'))

models
  .sync()
  .then(() => app.listen(port, () => console.log('Listening on port 3000!')))

app.get('/api/order/constraints', (req, res) => order.constraints(req, res))

app.get('/api/order/list', (req, res) => order.list(req, res))
