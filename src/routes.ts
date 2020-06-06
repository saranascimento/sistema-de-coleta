import express, { response } from 'express'

import PointsController from './controllers/PointsController'
import ItemsController from './controllers/itemsController'

const routes = express.Router()
const pointsController = new PointsController()
const itemsController = new ItemsController()


routes.get('/items', itemsController.index)

// criação do ponto de coleta
routes.post('/points', pointsController.create)

export default routes