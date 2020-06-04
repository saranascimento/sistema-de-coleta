import Knex from 'knex'

export async function up(knex: Knex) {
    // criar a tabela
    return knex.schema.createTable('point_items', table => {
        table.increments('id').primary()

        table.integer('point_id')
        .notNullable() // nao pode ser nulo
        .references('id') // nome de referencia é o id
        .inTable('points'); // precisa estar na tabela points

        table.integer('item_id')
        .notNullable()
        .references('id') 
        .inTable('items'); 
    })
}

export async function down(knex: Knex) {
    // votlar atras ( deletar a tabela)
    return knex.schema.dropTable('point_items')
}

// Migrations = histórico do banco de dados
// com apenas um comando o migrations vai criar a tebla no mesmo formato e com as duas tabelas para as duas pessoas que tem

// create table points - pessoa 1
// create table users - pessoa 2