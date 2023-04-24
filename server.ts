import Fastify from "fastify";
import * as dotenv from "dotenv";
import serviceRoutes from "./routes/v1";

const serverHealth = require("server-health");

dotenv.config();

const fastify = Fastify({
  logger: true,
});

const port = process.env.PORT ? Number(process.env.PORT) : 8002;

fastify.register(require("fastify-knexjs"), {
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
});

fastify.register(require("./initDb"), {  serviceName: process.env.SERVICE_NAME});
serverHealth.addConnectionCheck("database", async ()=>{
  const _serviceName = process.env.SERVICE_NAME;
  try {
    // @ts-ignore
    const exists = await fastify.knex.schema.hasTable(_serviceName);
    return !!exists;
  } catch (err: any) {
    fastify.log.info(err.message);
    return false;
  }
});

serverHealth.exposeHealthEndpoint(fastify, "/v1/health", "fastify");

// Default route
fastify.get("/", (req, reply) => {
  return reply.send({
    version: process.env.VERSION,
    status: 200,
    message: `Use /v1/${process.env.SERVICE_NAME} to access the service`,
  });
});

fastify.get("*", (req, reply) => {
  return reply.send({
    version: process.env.VERSION,
    status: 404,
    message: "The requested route does not exist",
  });
});

// Service routes
void fastify.register(serviceRoutes);

fastify.setErrorHandler(function(error, request, reply) {
  if (error instanceof Fastify.errorCodes.FST_ERR_BAD_STATUS_CODE) {
    // Log error
    this.log.error(error);
    // Send error response
    reply.status(500).send({ ok: false });
  } else {
    // fastify will use parent error handler to handle this
    reply.send(error);
  }
});

// Run the server!
fastify.listen({ port: port, host: "0.0.0.0" }, function(err, address) {
  if (err) {
    fastify.log.error(err);
    // @ts-ignore
    process.exit(1);
  }
  // @ts-ignore
  fastify.initializeDatabaseTableWithBaseSettings();
  const host = process.env.DB_HOST;
  fastify.log.info(`server db host name ${host}`);
  fastify.log.info(`server listening on ${address}`);
});