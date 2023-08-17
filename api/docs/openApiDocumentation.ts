
const docObject = {
  openapi: "3.0.1",
  info: {
    version: "0.0.1",
    title: "Hopspots",
    description: "Hopspots Jump Management API",
    termsOfService: "TODO terms of service url",
    contact: {
      name: "Hopspots Team",
      email: "matt.mohorn@gmail.com",
      url: "TODO contact url",
    },
    license: {
      name: "Apache 2.0",
      url: "https://www.apache.org/licenses/LICENSE-2.0.html",
    },
  },
  security: [
    {
        bearerToken: []
    }
],
  paths: {
    "/areas": {
      get: {
        tags: ["CRUD operations"],
        description: "Get a list of areas",
        operationId: "getAreas",
        security: [],
        responses: {
          "200": {
            description: "Area list obtained successfully",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Area",
                  },
                },
              },
            },
          },
        },
      },
    },
    "/jumps": {
      get: {
        tags: ["CRUD operations"],
        description: "Get a list of jumps",
        operationId: "getJumps",
        security: [],
        responses: {
          "200": {
            description: "Jump list obtained successfully",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Jump",
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["CRUD operations"],
        description: "Create a new jump",
        operationId: "createJump",
        requestBody: {
          description: "Update an existent pet in the store",
          content: {
            "application/json": {
              schema: {
                "$ref": "#/components/schemas/JumpRequestBody"
              }
            },
          },
          "required": true
        },
        
        responses: {
          "201": {
            description: "Jump was created successfully",
            content: {
              "application/json": {
                schema: {
                    $ref: "#/components/schemas/Jump",
                },
              },
            },
          },
          "400": {
            description: "Failed to create a jump",
            content: {
              "application/json": {
                schema: {
                    $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          "401": {
            description: "Unauthorized action",
            content: {
              "application/json": {
                schema: {
                    $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
      
    },
    "/user": {
      get: {
        tags: ["CRUD operations"],
        description: "Get current user provided by and created by the Bearer Token",
        operationId: "getUser",
        security: [],
        responses: {
          "200": {
            description: "Current user obtained successfully",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/User",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  servers: [
    {
      url: "http://localhost:4000/",
      description: "Local server",
    },
    {
      url: "https://dev.hopspots.app",
      description: "Development server",
    },
    {
      url: "https://hopspots.app",
      description: "Production server",
    },
  ],
  tags: [
    {
      name: "CRUD operations",
    },
  ],
  components: {
    securitySchemes: {
      bearerToken: {
        type: "http",
        description:
          "JWT authorization using Bearer token in Authorization header",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      uuid: {
        type: "string",
        description: "a unique identifier for a row in the database",
        example: "01dea206-5d70-4f8f-a936-bd39a6beaa87",
      },
      Area: {
        type: "object",
        properties: {
          id: {
            $ref: "#/components/schemas/uuid",
          },
          name: {
            type: "string",
            example: "Alta"
          },
          longitude: {
            type: 'number'
          },
          latitude: {
            type: 'number'
          },
        },
      },

      Jump: {
        type: "object",
        properties: {
          id: {
            $ref: "#/components/schemas/uuid",
          },
          name: {
            type: "string",
            example: "The Wave"
          },
          description: {
            type: "string",
            example: "A naturally forming jump with small, medium, and large takeoffs"
          },
          jumpTypeId: {
            $ref: "#/components/schemas/uuid",
          },
          difficultyId: {
            $ref: "#/components/schemas/uuid",
          },
          longitude: {
            type: 'number'
          },
          latitude: {
            type: 'number'
          },
        },
      },
      User: {
        type: "object",
        properties: {
          id: {
            $ref: "#/components/schemas/uuid",
          },
          name: {
            type: "string",
            example: "Benja Acevedo"
          },
          email: {
            type: "string",
            example: "sillypuertorican@gmail.com"
          },
          firstName: {
            type: "string",
            example: "Benja"
          },
          lasttName: {
            type: "string",
            example: "Acevedo"
          },
          provider: {
            type: "string",
            example: "Google"
          },
          
        },
      },

      JumpRequestBody: {
        type: "object",
        properties: {
          name: {
            type: "string",
            example: "The Wave"
          },
          description: {
            type: "string",
            example: "A naturally forming jump with small, medium, and large takeoffs"
          },
          jumpTypeId: {
            $ref: "#/components/schemas/uuid",
          },
          difficultyId: {
            $ref: "#/components/schemas/uuid",
          },
          longitude: {
            type: 'number'
          },
          latitude: {
            type: 'number'
          },
        },
      },

      Error: {
        type: "object",
        properties: {
          message: {
            type: "string",
          },
          code: {
            type: "string",
          },
        },
      },
    },
  },
};

export default docObject;
