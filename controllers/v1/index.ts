import { FastifyInstance, FastifyReply, FastifyRequest, RequestParamsDefault } from "fastify";
import { IServiceDefault } from "../../types";

export const queryAll = async (req: FastifyRequest, reply: FastifyReply) => {
  const _version = process.env.VERSION;
  const _serviceName = process.env.SERVICE_NAME;
  // @ts-ignore
  const { knex } = req.server as FastifyInstance ;
  try {
    const queryAll = await knex<IServiceDefault>(_serviceName).select().timeout(1000, { cancel: true });
    reply
      .code(200)
      .send({
      version: _version,
      data: queryAll,
      status: 200,
    });
  } catch (error: any) {
    const _code = reply.statusCode >= 299 ? 500 : 400;
    reply
      .code(_code)
      .send({
      error: error.message,
      version: _version,
      status: _code,
    });
  }
};

export const queryById = async (req: FastifyRequest, reply: FastifyReply) => {
  const _version = process.env.VERSION;
  const _serviceName = process.env.SERVICE_NAME;
  // @ts-ignore
  const { knex } = req.server as FastifyInstance ;
  // @ts-ignore
  const { id } = req.params as RequestParamsDefault;
  try {
    const getOneById = await knex<IServiceDefault>(_serviceName).select().where("id", "=", Number(id))
      .timeout(1000, { cancel: true });

    reply
      .code(200)
      .send({
      version: _version,
      data: getOneById,
      status: 200,
    });
  } catch (error: any) {
    const _code = reply.statusCode >= 299 ? 500 : 400;
    reply
      .code(_code)
      .send({
      error: error.message,
      version: _version,
      status: _code,
    });
  }
};

export const insertNew = async (req: FastifyRequest, reply: FastifyReply) => {
  const _version = process.env.VERSION;
  const _serviceName = process.env.SERVICE_NAME;
  // @ts-ignore
  const { knex } = req.server as FastifyInstance ;
  try {
    const insertNewQuery = await knex<IServiceDefault>(_serviceName).insert(req.body, ["id"]);
    reply
      .code(201)
      .send({
      version: _version,
      data: insertNewQuery,
      status: 201,
    });
  } catch (error:any) {
    const _code = reply.statusCode >= 299 ? 500 : 400;
    reply
      .code(_code)
      .send({
      error: error.message,
      version: _version,
      status: _code,
    });
  }
};

export const updateById = async (req: FastifyRequest, reply: FastifyReply) => {
  const _version = process.env.VERSION;
  const _serviceName = process.env.SERVICE_NAME;
  // @ts-ignore
  const { knex } = req.server as FastifyInstance ;
  const updateObject = req.body as IServiceDefault;
  // @ts-ignore
  const { id } = req.params as RequestParamsDefault;
  for (const key in updateObject) {
    if (key === "id" || key === "created_at" || key === "updated_at") {
      delete updateObject[key];
    }
  }
  try {
    updateObject.updated_at = (new Date()).toISOString();
    const updateQuery = await knex<IServiceDefault>(_serviceName).where("id", "=", Number(id))
      .update(updateObject, ["id", "updated_at"]);
    reply
      .code(200)
      .send({
      version: _version,
      data: updateQuery,
      status: 200,
    });
  } catch (error: any) {
    const _code = reply.statusCode >= 299 ? 500 : 400;
    reply
      .code(_code)
      .send({
      error: error.message,
      version: _version,
      status: _code,
    });
  }
};

export const deleteById = async (req: FastifyRequest, reply: FastifyReply) => {
  const _version = process.env.VERSION;
  const _serviceName = process.env.SERVICE_NAME;
  // @ts-ignore
  const { knex } = req.server as FastifyInstance ;
  // @ts-ignore
  const { id } = req.params as RequestParamsDefault;
  try {
    const deleteQuery = await knex<IServiceDefault>(_serviceName).where("id", "=", Number(id)).del(["id"]);
    reply
      .code(200)
      .send({
      version: _version,
      data: deleteQuery,
      status: 200,
    });
  } catch (error:any) {
    const _code = reply.statusCode >= 299 ? 500 : 400;
    reply
      .code(_code)
      .send({
      error: error.message,
      version: _version,
      status: _code,
    });
  }
};
