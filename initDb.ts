import { FastifyInstance, FastifyPluginCallback, FastifyPluginOptions } from 'fastify';

const fp = require('fastify-plugin');

function initializeDatabaseTableWithBaseSettingsPlugin(fastify: FastifyInstance, opts: FastifyPluginOptions,
                                            done: FastifyPluginCallback) {
  fastify.decorate('initializeDatabaseTableWithBaseSettings', async () => {
    const { serviceName } = opts;
    // @ts-ignore
    const { knex } = fastify;
    try{
      // @ts-ignore
      const exists = await knex.schema.hasTable(serviceName);
      if (!exists) {
        // @ts-ignore
        const createTable = await knex.schema.createTable(serviceName, (table: any) => {
          table.increments('id').primary();
          table.string('first_name').notNullable();
          table.string('last_name').notNullable();
          table.string('address').notNullable();
          table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now(6));
          table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now(6));
          table.string('phone').notNullable();
          table.string('city').notNullable();
          table.string('country').notNullable();
          table.string('role').notNullable();
          table.boolean('active').defaultTo(false);
          table.boolean('verified').defaultTo(false);
          table.boolean('deleted').defaultTo(false);
          table.integer('user_media_id')/*.unsigned().inTable('media').references("id")*/;
          table.integer('nin').notNullable();
          table.string('postal_code').notNullable();
        });
        fastify.log.info('Database Table with name ' + serviceName + ' was created ==> ' + exists);
        return createTable;
      }
      fastify.log.info('Database Table with name ' + serviceName + ' exists ==> ' + exists);
      return exists;
    }catch (error : any) {
      fastify.log.error('Error in database ' + serviceName,  error.message);
      throw new Error(error.message);
    }
  });
  // @ts-ignore
  done();
}

module.exports = fp(initializeDatabaseTableWithBaseSettingsPlugin,
  { fastify: '>=1.0.0', name: 'database-plugin' });