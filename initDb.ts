import { FastifyInstance, FastifyPluginCallback, FastifyPluginOptions } from 'fastify';

const fp = require('fastify-plugin');

function initializeDatabaseTableWithBaseSettingsPlugin(fastify: FastifyInstance, opts: FastifyPluginOptions,
                                            done: FastifyPluginCallback) {
  fastify.decorate('initializeDatabaseTableWithBaseSettings', async () => {
    const { serviceName } = opts;
    try{
      // @ts-ignore
      const exists = await fastify.knex.schema.hasTable(serviceName);
      if (!exists) {
        // @ts-ignore
        const createTable = await fastify.knex.schema.createTable(serviceName, (table: any) => {
          table.increments('id').primary();
          table.string('first_name');
          table.string('last_name');
          table.string('address');
          table.timestamp('created_at', { useTz: true }).defaultTo(fastify.knex.fn.now(6));
          table.timestamp('updated_at', { useTz: true }).defaultTo(fastify.knex.fn.now(6));
          table.string('phone');
          table.string('city');
          table.string('country');
          table.string('role');
          table.string('status');
          table.boolean('verified');
          table.integer('user_media_id')/*.unsigned().inTable('media').references("id")*/;
          table.integer('nin');
          table.string('postal_code');
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