import express, { response } from 'express'
import knex from './database/connection'

const routes = express.Router()



routes.get('/items', async (request, response) => {
    const items = await knex('items').select('*')

    const serializeItems = items.map(item => {
        return {
            id: item.id,
            title: item.title,
            image_url: `http://localhost:3333/uploads/${item.image}`
        }
    })

    return response.json(serializeItems)
})

// criação do ponto de coleta
routes.post('/points', async (request, response) => {
    //desestruturação 
    //ex: const name = request.body.name... para todos
    const {
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
        items
    } = request.body

    const trx = await knex.transaction()

    const isertedIds = await trx('points').insert({
        //short sintaxe
        //name: name - quando o nome da chave é o mesmo do valor
        image: 'image-fake',
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf
    })

    const point_id = isertedIds[0]

    const pointItems = items.map((item_id: number) => {
        return {
            item_id,
            point_id,
        }
    })
    await trx('point_items').insert(pointItems)

    return response.json({ sucesss: true })
})

export default routes