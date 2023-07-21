import "reflect-metadata"
import * as express from 'express'
import * as cors from 'cors'

import {dbInstance} from './services/db';
import modules from './modules'

const app = express()
const port = 5000

dbInstance.initialize()
  .then((source) => {
      console.log(`< MySQL has been connected`);
  })
  .catch((error) => console.log(error))

app.use(cors());
app.use(express.json())

function errorHandler(error, req, res, next) {
    console.log( `error: ${error.message}; status: ${error.status}`)
    const status = error.status || 400
    res.status(status).json({message: error.message})
}

modules.forEach((module) => {
    app.use(module.route, module.module);
})

app.get('/', (req, res) => {
    res.json({
        name: "API",
        version: '1.0.0'
    })
})

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
