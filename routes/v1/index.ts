import {type FastifyInstance, type FastifyListenOptions} from "fastify";
import { deleteById, updateById, insertNew, queryById, queryAll } from "../../controllers/v1";

const getAllEndpoint = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          version: { type: "string" },
          data: {type: "array"},
          status: { type: "integer" }
        }
      },
      401: {
        type: "object",
        properties: {
          version: { type: "string" },
          error: {type: "string"},
          status: { type: "integer" }
        }
      },
    },
  },
  handler: queryAll,
};

const getByIdEndpoint = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          version: { type: "string" },
          data: {type: "array"},
          status: { type: "integer" }
        }
      },
      401: {
        type: "object",
        properties: {
          version: { type: "string" },
          error: {type: "string"},
          status: { type: "integer" }
        }
      },
    },
  },
  handler: queryById,
};

const createNewEndpoint = {
  schema: {
    body: { type: "array", items: {type: "object", properties:{
          name: { type: "string" },
          nutrition_id: { type: "integer" },
          tags: {type: "array", items: {type: "string"}, maxItems: 999},
          visibility: { type: "boolean" },
          allergy_info: { type: "string" },
          description: { type: "string" },
          is_meal_prep: { type: "boolean" },
          store_id: { type: "integer" },
          media_id: { type: "integer" },
        }}, maxItems: 999},
    response: {
      200: {
        type: "object",
        properties: {
          version: { type: "string" },
          data: {type: "array"},
          status: { type: "integer" }
        }
      },
      401: {
        type: "object",
        properties: {
          version: { type: "string" },
          error: {type: "string"},
          status: { type: "integer" }
        }
      },
    },
  },
  handler: insertNew,
};

const updateByIdEndpoint = {
  schema: {
    params:{
      type: "object",
      properties: {
        id:{type: "integer"}
      }
    },
    response: {
      200: {
        type: "object",
        properties: {
          version: { type: "string" },
          data: {type: "array"},
          status: { type: "integer" }
        }
      },
      401: {
        type: "object",
        properties: {
          version: { type: "string" },
          error: {type: "string"},
          status: { type: "integer" }
        }
      },
    },
  },
  handler: updateById,
};

const deleteByIdEndpoint = {
  schema: {
    params:{
      type: "object",
      properties: {
        id:{type: "integer"}
      }
    },
    response: {
      200: {
        type: "object",
        properties: {
          version: { type: "string" },
          data: {type: "array"},
          status: { type: "integer" }
        }
      },
      401: {
        type: "object",
        properties: {
          version: { type: "string" },
          error: {type: "string"},
          status: { type: "integer" }
        }
      },
    },
  },
  handler: deleteById,
};

function serviceRoutes(
  fastify: FastifyInstance,
  options: FastifyListenOptions,
  done: any
) {
  const _serviceName = process.env.SERVICE_NAME;

  fastify.get("/v1/" + _serviceName, getAllEndpoint);
  fastify.get("/v1/" + _serviceName + "/:id", getByIdEndpoint);
  fastify.post("/v1/" + _serviceName, createNewEndpoint);
  fastify.patch("/v1/" + _serviceName + "/:id", updateByIdEndpoint);
  fastify.delete("/v1/" + _serviceName + "/:id", deleteByIdEndpoint);
  done();
}

export default serviceRoutes;
