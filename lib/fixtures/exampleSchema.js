"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exampleSchema = void 0;
exports.exampleSchema = {
  __schema: {
    directives: [{
      name: 'include',
      description: 'Directs the executor to include this field or fragment only when the `if` argument is true.',
      locations: ['FIELD', 'FRAGMENT_SPREAD', 'INLINE_FRAGMENT'],
      args: [{
        name: 'if',
        description: 'Included when true.',
        type: {
          kind: 'NON_NULL',
          name: null,
          ofType: {
            kind: 'SCALAR',
            name: 'Boolean',
            ofType: null
          }
        },
        defaultValue: null
      }]
    }, {
      name: 'skip',
      description: 'Directs the executor to skip this field or fragment when the `if` argument is true.',
      locations: ['FIELD', 'FRAGMENT_SPREAD', 'INLINE_FRAGMENT'],
      args: [{
        name: 'if',
        description: 'Included when true.',
        type: {
          kind: 'NON_NULL',
          name: null,
          ofType: {
            kind: 'SCALAR',
            name: 'Boolean',
            ofType: null
          }
        },
        defaultValue: null
      }]
    }, {
      name: 'deprecated',
      description: 'Marks an element of a GraphQL schema as no longer supported.',
      locations: ['ENUM_VALUE', 'FIELD_DEFINITION'],
      args: [{
        name: 'reason',
        description: 'Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted in [Markdown](https://daringfireball.net/projects/markdown/).',
        type: {
          kind: 'SCALAR',
          name: 'String',
          ofType: null
        },
        defaultValue: '"No longer supported"'
      }]
    }],
    mutationType: {
      name: 'Mutation'
    },
    subscriptionType: {
      name: 'Subscription'
    },
    queryType: {
      name: 'Query'
    },
    types: [{
      inputFields: null,
      name: 'BatchPayload',
      description: '',
      interfaces: [],
      enumValues: null,
      fields: [{
        name: 'count',
        description: 'The number of nodes that have been affected by the Batch operation.',
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'NON_NULL',
          name: null,
          ofType: {
            kind: 'SCALAR',
            name: 'Long',
            ofType: null
          }
        }
      }],
      kind: 'OBJECT',
      possibleTypes: null
    }, {
      inputFields: null,
      name: 'Mutation',
      description: null,
      interfaces: [],
      enumValues: null,
      fields: [{
        name: 'createUser',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [{
          name: 'data',
          description: null,
          type: {
            kind: 'NON_NULL',
            name: null,
            ofType: {
              kind: 'INPUT_OBJECT',
              name: 'UserCreateInput',
              ofType: null
            }
          },
          defaultValue: null
        }],
        type: {
          kind: 'NON_NULL',
          name: null,
          ofType: {
            kind: 'OBJECT',
            name: 'User',
            ofType: null
          }
        }
      }, {
        name: 'updateUser',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [{
          name: 'data',
          description: null,
          type: {
            kind: 'NON_NULL',
            name: null,
            ofType: {
              kind: 'INPUT_OBJECT',
              name: 'UserUpdateInput',
              ofType: null
            }
          },
          defaultValue: null
        }, {
          name: 'where',
          description: null,
          type: {
            kind: 'NON_NULL',
            name: null,
            ofType: {
              kind: 'INPUT_OBJECT',
              name: 'UserWhereUniqueInput',
              ofType: null
            }
          },
          defaultValue: null
        }],
        type: {
          kind: 'OBJECT',
          name: 'User',
          ofType: null
        }
      }, {
        name: 'deleteUser',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [{
          name: 'where',
          description: null,
          type: {
            kind: 'NON_NULL',
            name: null,
            ofType: {
              kind: 'INPUT_OBJECT',
              name: 'UserWhereUniqueInput',
              ofType: null
            }
          },
          defaultValue: null
        }],
        type: {
          kind: 'OBJECT',
          name: 'User',
          ofType: null
        }
      }, {
        name: 'upsertUser',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [{
          name: 'where',
          description: null,
          type: {
            kind: 'NON_NULL',
            name: null,
            ofType: {
              kind: 'INPUT_OBJECT',
              name: 'UserWhereUniqueInput',
              ofType: null
            }
          },
          defaultValue: null
        }, {
          name: 'create',
          description: null,
          type: {
            kind: 'NON_NULL',
            name: null,
            ofType: {
              kind: 'INPUT_OBJECT',
              name: 'UserCreateInput',
              ofType: null
            }
          },
          defaultValue: null
        }, {
          name: 'update',
          description: null,
          type: {
            kind: 'NON_NULL',
            name: null,
            ofType: {
              kind: 'INPUT_OBJECT',
              name: 'UserUpdateInput',
              ofType: null
            }
          },
          defaultValue: null
        }],
        type: {
          kind: 'NON_NULL',
          name: null,
          ofType: {
            kind: 'OBJECT',
            name: 'User',
            ofType: null
          }
        }
      }, {
        name: 'updateManyUsers',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [{
          name: 'data',
          description: null,
          type: {
            kind: 'NON_NULL',
            name: null,
            ofType: {
              kind: 'INPUT_OBJECT',
              name: 'UserUpdateInput',
              ofType: null
            }
          },
          defaultValue: null
        }, {
          name: 'where',
          description: '',
          type: {
            kind: 'INPUT_OBJECT',
            name: 'UserWhereInput',
            ofType: null
          },
          defaultValue: null
        }],
        type: {
          kind: 'NON_NULL',
          name: null,
          ofType: {
            kind: 'OBJECT',
            name: 'BatchPayload',
            ofType: null
          }
        }
      }, {
        name: 'deleteManyUsers',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [{
          name: 'where',
          description: '',
          type: {
            kind: 'INPUT_OBJECT',
            name: 'UserWhereInput',
            ofType: null
          },
          defaultValue: null
        }],
        type: {
          kind: 'NON_NULL',
          name: null,
          ofType: {
            kind: 'OBJECT',
            name: 'BatchPayload',
            ofType: null
          }
        }
      }],
      kind: 'OBJECT',
      possibleTypes: null
    }, {
      inputFields: null,
      name: 'MutationType',
      description: null,
      interfaces: null,
      enumValues: [{
        name: 'CREATED',
        description: null,
        isDeprecated: false,
        deprecationReason: null
      }, {
        name: 'UPDATED',
        description: null,
        isDeprecated: false,
        deprecationReason: null
      }, {
        name: 'DELETED',
        description: null,
        isDeprecated: false,
        deprecationReason: null
      }],
      fields: null,
      kind: 'ENUM',
      possibleTypes: null
    }, {
      inputFields: null,
      name: 'Subscription',
      description: null,
      interfaces: [],
      enumValues: null,
      fields: [{
        name: 'user',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [{
          name: 'where',
          description: '',
          type: {
            kind: 'INPUT_OBJECT',
            name: 'UserSubscriptionWhereInput',
            ofType: null
          },
          defaultValue: null
        }],
        type: {
          kind: 'OBJECT',
          name: 'UserSubscriptionPayload',
          ofType: null
        }
      }],
      kind: 'OBJECT',
      possibleTypes: null
    }, {
      inputFields: [{
        name: 'name',
        description: null,
        type: {
          kind: 'NON_NULL',
          name: null,
          ofType: {
            kind: 'SCALAR',
            name: 'String',
            ofType: null
          }
        },
        defaultValue: null
      }, {
        name: 'email',
        description: null,
        type: {
          kind: 'NON_NULL',
          name: null,
          ofType: {
            kind: 'SCALAR',
            name: 'String',
            ofType: null
          }
        },
        defaultValue: null
      }],
      name: 'UserCreateInput',
      description: null,
      interfaces: null,
      enumValues: null,
      fields: null,
      kind: 'INPUT_OBJECT',
      possibleTypes: null
    }, {
      inputFields: null,
      name: 'UserPreviousValues',
      description: null,
      interfaces: [],
      enumValues: null,
      fields: [{
        name: 'id',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'NON_NULL',
          name: null,
          ofType: {
            kind: 'SCALAR',
            name: 'ID',
            ofType: null
          }
        }
      }, {
        name: 'name',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'NON_NULL',
          name: null,
          ofType: {
            kind: 'SCALAR',
            name: 'String',
            ofType: null
          }
        }
      }, {
        name: 'email',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'NON_NULL',
          name: null,
          ofType: {
            kind: 'SCALAR',
            name: 'String',
            ofType: null
          }
        }
      }],
      kind: 'OBJECT',
      possibleTypes: null
    }, {
      inputFields: null,
      name: 'UserSubscriptionPayload',
      description: null,
      interfaces: [],
      enumValues: null,
      fields: [{
        name: 'mutation',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'NON_NULL',
          name: null,
          ofType: {
            kind: 'ENUM',
            name: 'MutationType',
            ofType: null
          }
        }
      }, {
        name: 'node',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'OBJECT',
          name: 'User',
          ofType: null
        }
      }, {
        name: 'updatedFields',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'LIST',
          name: null,
          ofType: {
            kind: 'NON_NULL',
            name: null,
            ofType: {
              kind: 'SCALAR',
              name: 'String',
              ofType: null
            }
          }
        }
      }, {
        name: 'previousValues',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'OBJECT',
          name: 'UserPreviousValues',
          ofType: null
        }
      }],
      kind: 'OBJECT',
      possibleTypes: null
    }, {
      inputFields: [{
        name: 'AND',
        description: 'Logical AND on all given filters.',
        type: {
          kind: 'LIST',
          name: null,
          ofType: {
            kind: 'NON_NULL',
            name: null,
            ofType: {
              kind: 'INPUT_OBJECT',
              name: 'UserSubscriptionWhereInput',
              ofType: null
            }
          }
        },
        defaultValue: null
      }, {
        name: 'OR',
        description: 'Logical OR on all given filters.',
        type: {
          kind: 'LIST',
          name: null,
          ofType: {
            kind: 'NON_NULL',
            name: null,
            ofType: {
              kind: 'INPUT_OBJECT',
              name: 'UserSubscriptionWhereInput',
              ofType: null
            }
          }
        },
        defaultValue: null
      }, {
        name: 'NOT',
        description: 'Logical NOT on all given filters combined by AND.',
        type: {
          kind: 'LIST',
          name: null,
          ofType: {
            kind: 'NON_NULL',
            name: null,
            ofType: {
              kind: 'INPUT_OBJECT',
              name: 'UserSubscriptionWhereInput',
              ofType: null
            }
          }
        },
        defaultValue: null
      }, {
        name: 'mutation_in',
        description: "The subscription event gets dispatched when it's listed in mutation_in",
        type: {
          kind: 'LIST',
          name: null,
          ofType: {
            kind: 'NON_NULL',
            name: null,
            ofType: {
              kind: 'ENUM',
              name: 'MutationType',
              ofType: null
            }
          }
        },
        defaultValue: null
      }, {
        name: 'updatedFields_contains',
        description: 'The subscription event gets only dispatched when one of the updated fields names is included in this list',
        type: {
          kind: 'SCALAR',
          name: 'String',
          ofType: null
        },
        defaultValue: null
      }, {
        name: 'updatedFields_contains_every',
        description: 'The subscription event gets only dispatched when all of the field names included in this list have been updated',
        type: {
          kind: 'LIST',
          name: null,
          ofType: {
            kind: 'NON_NULL',
            name: null,
            ofType: {
              kind: 'SCALAR',
              name: 'String',
              ofType: null
            }
          }
        },
        defaultValue: null
      }, {
        name: 'updatedFields_contains_some',
        description: 'The subscription event gets only dispatched when some of the field names included in this list have been updated',
        type: {
          kind: 'LIST',
          name: null,
          ofType: {
            kind: 'NON_NULL',
            name: null,
            ofType: {
              kind: 'SCALAR',
              name: 'String',
              ofType: null
            }
          }
        },
        defaultValue: null
      }, {
        name: 'node',
        description: null,
        type: {
          kind: 'INPUT_OBJECT',
          name: 'UserWhereInput',
          ofType: null
        },
        defaultValue: null
      }],
      name: 'UserSubscriptionWhereInput',
      description: null,
      interfaces: null,
      enumValues: null,
      fields: null,
      kind: 'INPUT_OBJECT',
      possibleTypes: null
    }, {
      inputFields: [{
        name: 'name',
        description: null,
        type: {
          kind: 'SCALAR',
          name: 'String',
          ofType: null
        },
        defaultValue: null
      }, {
        name: 'email',
        description: null,
        type: {
          kind: 'SCALAR',
          name: 'String',
          ofType: null
        },
        defaultValue: null
      }],
      name: 'UserUpdateInput',
      description: null,
      interfaces: null,
      enumValues: null,
      fields: null,
      kind: 'INPUT_OBJECT',
      possibleTypes: null
    }, {
      inputFields: null,
      name: 'AggregateUser',
      description: null,
      interfaces: [],
      enumValues: null,
      fields: [{
        name: 'count',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'NON_NULL',
          name: null,
          ofType: {
            kind: 'SCALAR',
            name: 'Int',
            ofType: null
          }
        }
      }],
      kind: 'OBJECT',
      possibleTypes: null
    }, {
      inputFields: null,
      name: 'Node',
      description: 'An object with an ID',
      interfaces: null,
      enumValues: null,
      fields: [{
        name: 'id',
        description: 'The id of the object.',
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'NON_NULL',
          name: null,
          ofType: {
            kind: 'SCALAR',
            name: 'ID',
            ofType: null
          }
        }
      }],
      kind: 'INTERFACE',
      possibleTypes: [{
        kind: 'OBJECT',
        name: 'User',
        ofType: null
      }]
    }, {
      inputFields: null,
      name: 'PageInfo',
      description: 'Information about pagination in a connection.',
      interfaces: [],
      enumValues: null,
      fields: [{
        name: 'hasNextPage',
        description: 'When paginating forwards, are there more items?',
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'NON_NULL',
          name: null,
          ofType: {
            kind: 'SCALAR',
            name: 'Boolean',
            ofType: null
          }
        }
      }, {
        name: 'hasPreviousPage',
        description: 'When paginating backwards, are there more items?',
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'NON_NULL',
          name: null,
          ofType: {
            kind: 'SCALAR',
            name: 'Boolean',
            ofType: null
          }
        }
      }, {
        name: 'startCursor',
        description: 'When paginating backwards, the cursor to continue.',
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'SCALAR',
          name: 'String',
          ofType: null
        }
      }, {
        name: 'endCursor',
        description: 'When paginating forwards, the cursor to continue.',
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'SCALAR',
          name: 'String',
          ofType: null
        }
      }],
      kind: 'OBJECT',
      possibleTypes: null
    }, {
      inputFields: null,
      name: 'Query',
      description: null,
      interfaces: [],
      enumValues: null,
      fields: [{
        name: 'users',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [{
          name: 'where',
          description: '',
          type: {
            kind: 'INPUT_OBJECT',
            name: 'UserWhereInput',
            ofType: null
          },
          defaultValue: null
        }, {
          name: 'orderBy',
          description: null,
          type: {
            kind: 'ENUM',
            name: 'UserOrderByInput',
            ofType: null
          },
          defaultValue: null
        }, {
          name: 'skip',
          description: null,
          type: {
            kind: 'SCALAR',
            name: 'Int',
            ofType: null
          },
          defaultValue: null
        }, {
          name: 'after',
          description: null,
          type: {
            kind: 'SCALAR',
            name: 'String',
            ofType: null
          },
          defaultValue: null
        }, {
          name: 'before',
          description: null,
          type: {
            kind: 'SCALAR',
            name: 'String',
            ofType: null
          },
          defaultValue: null
        }, {
          name: 'first',
          description: null,
          type: {
            kind: 'SCALAR',
            name: 'Int',
            ofType: null
          },
          defaultValue: null
        }, {
          name: 'last',
          description: null,
          type: {
            kind: 'SCALAR',
            name: 'Int',
            ofType: null
          },
          defaultValue: null
        }],
        type: {
          kind: 'NON_NULL',
          name: null,
          ofType: {
            kind: 'LIST',
            name: null,
            ofType: {
              kind: 'OBJECT',
              name: 'User',
              ofType: null
            }
          }
        }
      }, {
        name: 'user',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [{
          name: 'where',
          description: null,
          type: {
            kind: 'NON_NULL',
            name: null,
            ofType: {
              kind: 'INPUT_OBJECT',
              name: 'UserWhereUniqueInput',
              ofType: null
            }
          },
          defaultValue: null
        }],
        type: {
          kind: 'OBJECT',
          name: 'User',
          ofType: null
        }
      }, {
        name: 'usersConnection',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [{
          name: 'where',
          description: '',
          type: {
            kind: 'INPUT_OBJECT',
            name: 'UserWhereInput',
            ofType: null
          },
          defaultValue: null
        }, {
          name: 'orderBy',
          description: null,
          type: {
            kind: 'ENUM',
            name: 'UserOrderByInput',
            ofType: null
          },
          defaultValue: null
        }, {
          name: 'skip',
          description: null,
          type: {
            kind: 'SCALAR',
            name: 'Int',
            ofType: null
          },
          defaultValue: null
        }, {
          name: 'after',
          description: null,
          type: {
            kind: 'SCALAR',
            name: 'String',
            ofType: null
          },
          defaultValue: null
        }, {
          name: 'before',
          description: null,
          type: {
            kind: 'SCALAR',
            name: 'String',
            ofType: null
          },
          defaultValue: null
        }, {
          name: 'first',
          description: null,
          type: {
            kind: 'SCALAR',
            name: 'Int',
            ofType: null
          },
          defaultValue: null
        }, {
          name: 'last',
          description: null,
          type: {
            kind: 'SCALAR',
            name: 'Int',
            ofType: null
          },
          defaultValue: null
        }],
        type: {
          kind: 'NON_NULL',
          name: null,
          ofType: {
            kind: 'OBJECT',
            name: 'UserConnection',
            ofType: null
          }
        }
      }, {
        name: 'node',
        description: 'Fetches an object given its ID',
        isDeprecated: false,
        deprecationReason: null,
        args: [{
          name: 'id',
          description: 'The ID of an object',
          type: {
            kind: 'NON_NULL',
            name: null,
            ofType: {
              kind: 'SCALAR',
              name: 'ID',
              ofType: null
            }
          },
          defaultValue: null
        }],
        type: {
          kind: 'INTERFACE',
          name: 'Node',
          ofType: null
        }
      }],
      kind: 'OBJECT',
      possibleTypes: null
    }, {
      inputFields: null,
      name: 'User',
      description: null,
      interfaces: [{
        kind: 'INTERFACE',
        name: 'Node',
        ofType: null
      }],
      enumValues: null,
      fields: [{
        name: 'id',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'NON_NULL',
          name: null,
          ofType: {
            kind: 'SCALAR',
            name: 'ID',
            ofType: null
          }
        }
      }, {
        name: 'name',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'NON_NULL',
          name: null,
          ofType: {
            kind: 'SCALAR',
            name: 'String',
            ofType: null
          }
        }
      }, {
        name: 'email',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'NON_NULL',
          name: null,
          ofType: {
            kind: 'SCALAR',
            name: 'String',
            ofType: null
          }
        }
      }],
      kind: 'OBJECT',
      possibleTypes: null
    }, {
      inputFields: null,
      name: 'UserConnection',
      description: 'A connection to a list of items.',
      interfaces: [],
      enumValues: null,
      fields: [{
        name: 'pageInfo',
        description: 'Information to aid in pagination.',
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'NON_NULL',
          name: null,
          ofType: {
            kind: 'OBJECT',
            name: 'PageInfo',
            ofType: null
          }
        }
      }, {
        name: 'edges',
        description: 'A list of edges.',
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'NON_NULL',
          name: null,
          ofType: {
            kind: 'LIST',
            name: null,
            ofType: {
              kind: 'OBJECT',
              name: 'UserEdge',
              ofType: null
            }
          }
        }
      }, {
        name: 'aggregate',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'NON_NULL',
          name: null,
          ofType: {
            kind: 'OBJECT',
            name: 'AggregateUser',
            ofType: null
          }
        }
      }],
      kind: 'OBJECT',
      possibleTypes: null
    }, {
      inputFields: null,
      name: 'UserEdge',
      description: 'An edge in a connection.',
      interfaces: [],
      enumValues: null,
      fields: [{
        name: 'node',
        description: 'The item at the end of the edge.',
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'NON_NULL',
          name: null,
          ofType: {
            kind: 'OBJECT',
            name: 'User',
            ofType: null
          }
        }
      }, {
        name: 'cursor',
        description: 'A cursor for use in pagination.',
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'NON_NULL',
          name: null,
          ofType: {
            kind: 'SCALAR',
            name: 'String',
            ofType: null
          }
        }
      }],
      kind: 'OBJECT',
      possibleTypes: null
    }, {
      inputFields: null,
      name: 'UserOrderByInput',
      description: null,
      interfaces: null,
      enumValues: [{
        name: 'id_ASC',
        description: null,
        isDeprecated: false,
        deprecationReason: null
      }, {
        name: 'id_DESC',
        description: null,
        isDeprecated: false,
        deprecationReason: null
      }, {
        name: 'name_ASC',
        description: null,
        isDeprecated: false,
        deprecationReason: null
      }, {
        name: 'name_DESC',
        description: null,
        isDeprecated: false,
        deprecationReason: null
      }, {
        name: 'email_ASC',
        description: null,
        isDeprecated: false,
        deprecationReason: null
      }, {
        name: 'email_DESC',
        description: null,
        isDeprecated: false,
        deprecationReason: null
      }, {
        name: 'updatedAt_ASC',
        description: null,
        isDeprecated: false,
        deprecationReason: null
      }, {
        name: 'updatedAt_DESC',
        description: null,
        isDeprecated: false,
        deprecationReason: null
      }, {
        name: 'createdAt_ASC',
        description: null,
        isDeprecated: false,
        deprecationReason: null
      }, {
        name: 'createdAt_DESC',
        description: null,
        isDeprecated: false,
        deprecationReason: null
      }],
      fields: null,
      kind: 'ENUM',
      possibleTypes: null
    }, {
      inputFields: [{
        name: 'AND',
        description: 'Logical AND on all given filters.',
        type: {
          kind: 'LIST',
          name: null,
          ofType: {
            kind: 'NON_NULL',
            name: null,
            ofType: {
              kind: 'INPUT_OBJECT',
              name: 'UserWhereInput',
              ofType: null
            }
          }
        },
        defaultValue: null
      }, {
        name: 'OR',
        description: 'Logical OR on all given filters.',
        type: {
          kind: 'LIST',
          name: null,
          ofType: {
            kind: 'NON_NULL',
            name: null,
            ofType: {
              kind: 'INPUT_OBJECT',
              name: 'UserWhereInput',
              ofType: null
            }
          }
        },
        defaultValue: null
      }, {
        name: 'NOT',
        description: 'Logical NOT on all given filters combined by AND.',
        type: {
          kind: 'LIST',
          name: null,
          ofType: {
            kind: 'NON_NULL',
            name: null,
            ofType: {
              kind: 'INPUT_OBJECT',
              name: 'UserWhereInput',
              ofType: null
            }
          }
        },
        defaultValue: null
      }, {
        name: 'id',
        description: '',
        type: {
          kind: 'SCALAR',
          name: 'ID',
          ofType: null
        },
        defaultValue: null
      }, {
        name: 'id_not',
        description: 'All values that are not equal to given value.',
        type: {
          kind: 'SCALAR',
          name: 'ID',
          ofType: null
        },
        defaultValue: null
      }, {
        name: 'id_in',
        description: 'All values that are contained in given list.',
        type: {
          kind: 'LIST',
          name: null,
          ofType: {
            kind: 'NON_NULL',
            name: null,
            ofType: {
              kind: 'SCALAR',
              name: 'ID',
              ofType: null
            }
          }
        },
        defaultValue: null
      }, {
        name: 'id_not_in',
        description: 'All values that are not contained in given list.',
        type: {
          kind: 'LIST',
          name: null,
          ofType: {
            kind: 'NON_NULL',
            name: null,
            ofType: {
              kind: 'SCALAR',
              name: 'ID',
              ofType: null
            }
          }
        },
        defaultValue: null
      }, {
        name: 'id_lt',
        description: 'All values less than the given value.',
        type: {
          kind: 'SCALAR',
          name: 'ID',
          ofType: null
        },
        defaultValue: null
      }, {
        name: 'id_lte',
        description: 'All values less than or equal the given value.',
        type: {
          kind: 'SCALAR',
          name: 'ID',
          ofType: null
        },
        defaultValue: null
      }, {
        name: 'id_gt',
        description: 'All values greater than the given value.',
        type: {
          kind: 'SCALAR',
          name: 'ID',
          ofType: null
        },
        defaultValue: null
      }, {
        name: 'id_gte',
        description: 'All values greater than or equal the given value.',
        type: {
          kind: 'SCALAR',
          name: 'ID',
          ofType: null
        },
        defaultValue: null
      }, {
        name: 'id_contains',
        description: 'All values containing the given string.',
        type: {
          kind: 'SCALAR',
          name: 'ID',
          ofType: null
        },
        defaultValue: null
      }, {
        name: 'id_not_contains',
        description: 'All values not containing the given string.',
        type: {
          kind: 'SCALAR',
          name: 'ID',
          ofType: null
        },
        defaultValue: null
      }, {
        name: 'id_starts_with',
        description: 'All values starting with the given string.',
        type: {
          kind: 'SCALAR',
          name: 'ID',
          ofType: null
        },
        defaultValue: null
      }, {
        name: 'id_not_starts_with',
        description: 'All values not starting with the given string.',
        type: {
          kind: 'SCALAR',
          name: 'ID',
          ofType: null
        },
        defaultValue: null
      }, {
        name: 'id_ends_with',
        description: 'All values ending with the given string.',
        type: {
          kind: 'SCALAR',
          name: 'ID',
          ofType: null
        },
        defaultValue: null
      }, {
        name: 'id_not_ends_with',
        description: 'All values not ending with the given string.',
        type: {
          kind: 'SCALAR',
          name: 'ID',
          ofType: null
        },
        defaultValue: null
      }, {
        name: 'name',
        description: '',
        type: {
          kind: 'SCALAR',
          name: 'String',
          ofType: null
        },
        defaultValue: null
      }, {
        name: 'name_not',
        description: 'All values that are not equal to given value.',
        type: {
          kind: 'SCALAR',
          name: 'String',
          ofType: null
        },
        defaultValue: null
      }, {
        name: 'name_in',
        description: 'All values that are contained in given list.',
        type: {
          kind: 'LIST',
          name: null,
          ofType: {
            kind: 'NON_NULL',
            name: null,
            ofType: {
              kind: 'SCALAR',
              name: 'String',
              ofType: null
            }
          }
        },
        defaultValue: null
      }, {
        name: 'name_not_in',
        description: 'All values that are not contained in given list.',
        type: {
          kind: 'LIST',
          name: null,
          ofType: {
            kind: 'NON_NULL',
            name: null,
            ofType: {
              kind: 'SCALAR',
              name: 'String',
              ofType: null
            }
          }
        },
        defaultValue: null
      }, {
        name: 'name_lt',
        description: 'All values less than the given value.',
        type: {
          kind: 'SCALAR',
          name: 'String',
          ofType: null
        },
        defaultValue: null
      }, {
        name: 'name_lte',
        description: 'All values less than or equal the given value.',
        type: {
          kind: 'SCALAR',
          name: 'String',
          ofType: null
        },
        defaultValue: null
      }, {
        name: 'name_gt',
        description: 'All values greater than the given value.',
        type: {
          kind: 'SCALAR',
          name: 'String',
          ofType: null
        },
        defaultValue: null
      }, {
        name: 'name_gte',
        description: 'All values greater than or equal the given value.',
        type: {
          kind: 'SCALAR',
          name: 'String',
          ofType: null
        },
        defaultValue: null
      }, {
        name: 'name_contains',
        description: 'All values containing the given string.',
        type: {
          kind: 'SCALAR',
          name: 'String',
          ofType: null
        },
        defaultValue: null
      }, {
        name: 'name_not_contains',
        description: 'All values not containing the given string.',
        type: {
          kind: 'SCALAR',
          name: 'String',
          ofType: null
        },
        defaultValue: null
      }, {
        name: 'name_starts_with',
        description: 'All values starting with the given string.',
        type: {
          kind: 'SCALAR',
          name: 'String',
          ofType: null
        },
        defaultValue: null
      }, {
        name: 'name_not_starts_with',
        description: 'All values not starting with the given string.',
        type: {
          kind: 'SCALAR',
          name: 'String',
          ofType: null
        },
        defaultValue: null
      }, {
        name: 'name_ends_with',
        description: 'All values ending with the given string.',
        type: {
          kind: 'SCALAR',
          name: 'String',
          ofType: null
        },
        defaultValue: null
      }, {
        name: 'name_not_ends_with',
        description: 'All values not ending with the given string.',
        type: {
          kind: 'SCALAR',
          name: 'String',
          ofType: null
        },
        defaultValue: null
      }, {
        name: 'email',
        description: '',
        type: {
          kind: 'SCALAR',
          name: 'String',
          ofType: null
        },
        defaultValue: null
      }, {
        name: 'email_not',
        description: 'All values that are not equal to given value.',
        type: {
          kind: 'SCALAR',
          name: 'String',
          ofType: null
        },
        defaultValue: null
      }, {
        name: 'email_in',
        description: 'All values that are contained in given list.',
        type: {
          kind: 'LIST',
          name: null,
          ofType: {
            kind: 'NON_NULL',
            name: null,
            ofType: {
              kind: 'SCALAR',
              name: 'String',
              ofType: null
            }
          }
        },
        defaultValue: null
      }, {
        name: 'email_not_in',
        description: 'All values that are not contained in given list.',
        type: {
          kind: 'LIST',
          name: null,
          ofType: {
            kind: 'NON_NULL',
            name: null,
            ofType: {
              kind: 'SCALAR',
              name: 'String',
              ofType: null
            }
          }
        },
        defaultValue: null
      }, {
        name: 'email_lt',
        description: 'All values less than the given value.',
        type: {
          kind: 'SCALAR',
          name: 'String',
          ofType: null
        },
        defaultValue: null
      }, {
        name: 'email_lte',
        description: 'All values less than or equal the given value.',
        type: {
          kind: 'SCALAR',
          name: 'String',
          ofType: null
        },
        defaultValue: null
      }, {
        name: 'email_gt',
        description: 'All values greater than the given value.',
        type: {
          kind: 'SCALAR',
          name: 'String',
          ofType: null
        },
        defaultValue: null
      }, {
        name: 'email_gte',
        description: 'All values greater than or equal the given value.',
        type: {
          kind: 'SCALAR',
          name: 'String',
          ofType: null
        },
        defaultValue: null
      }, {
        name: 'email_contains',
        description: 'All values containing the given string.',
        type: {
          kind: 'SCALAR',
          name: 'String',
          ofType: null
        },
        defaultValue: null
      }, {
        name: 'email_not_contains',
        description: 'All values not containing the given string.',
        type: {
          kind: 'SCALAR',
          name: 'String',
          ofType: null
        },
        defaultValue: null
      }, {
        name: 'email_starts_with',
        description: 'All values starting with the given string.',
        type: {
          kind: 'SCALAR',
          name: 'String',
          ofType: null
        },
        defaultValue: null
      }, {
        name: 'email_not_starts_with',
        description: 'All values not starting with the given string.',
        type: {
          kind: 'SCALAR',
          name: 'String',
          ofType: null
        },
        defaultValue: null
      }, {
        name: 'email_ends_with',
        description: 'All values ending with the given string.',
        type: {
          kind: 'SCALAR',
          name: 'String',
          ofType: null
        },
        defaultValue: null
      }, {
        name: 'email_not_ends_with',
        description: 'All values not ending with the given string.',
        type: {
          kind: 'SCALAR',
          name: 'String',
          ofType: null
        },
        defaultValue: null
      }],
      name: 'UserWhereInput',
      description: null,
      interfaces: null,
      enumValues: null,
      fields: null,
      kind: 'INPUT_OBJECT',
      possibleTypes: null
    }, {
      inputFields: [{
        name: 'id',
        description: null,
        type: {
          kind: 'SCALAR',
          name: 'ID',
          ofType: null
        },
        defaultValue: null
      }, {
        name: 'email',
        description: null,
        type: {
          kind: 'SCALAR',
          name: 'String',
          ofType: null
        },
        defaultValue: null
      }],
      name: 'UserWhereUniqueInput',
      description: null,
      interfaces: null,
      enumValues: null,
      fields: null,
      kind: 'INPUT_OBJECT',
      possibleTypes: null
    }, {
      inputFields: null,
      name: '__Directive',
      description: 'A Directive provides a way to describe alternate runtime execution and type validation behavior in a GraphQL document.\n\nIn some cases, you need to provide options to alter GraphQL’s execution behavior in ways field arguments will not suffice, such as conditionally including or skipping a field. Directives provide this by describing additional information to the executor.',
      interfaces: [],
      enumValues: null,
      fields: [{
        name: 'name',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'NON_NULL',
          name: null,
          ofType: {
            kind: 'SCALAR',
            name: 'String',
            ofType: null
          }
        }
      }, {
        name: 'description',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'SCALAR',
          name: 'String',
          ofType: null
        }
      }, {
        name: 'locations',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'NON_NULL',
          name: null,
          ofType: {
            kind: 'LIST',
            name: null,
            ofType: {
              kind: 'NON_NULL',
              name: null,
              ofType: {
                kind: 'ENUM',
                name: '__DirectiveLocation',
                ofType: null
              }
            }
          }
        }
      }, {
        name: 'args',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'NON_NULL',
          name: null,
          ofType: {
            kind: 'LIST',
            name: null,
            ofType: {
              kind: 'NON_NULL',
              name: null,
              ofType: {
                kind: 'OBJECT',
                name: '__InputValue',
                ofType: null
              }
            }
          }
        }
      }, {
        name: 'onOperation',
        description: null,
        isDeprecated: true,
        deprecationReason: 'Use `locations`.',
        args: [],
        type: {
          kind: 'NON_NULL',
          name: null,
          ofType: {
            kind: 'SCALAR',
            name: 'Boolean',
            ofType: null
          }
        }
      }, {
        name: 'onFragment',
        description: null,
        isDeprecated: true,
        deprecationReason: 'Use `locations`.',
        args: [],
        type: {
          kind: 'NON_NULL',
          name: null,
          ofType: {
            kind: 'SCALAR',
            name: 'Boolean',
            ofType: null
          }
        }
      }, {
        name: 'onField',
        description: null,
        isDeprecated: true,
        deprecationReason: 'Use `locations`.',
        args: [],
        type: {
          kind: 'NON_NULL',
          name: null,
          ofType: {
            kind: 'SCALAR',
            name: 'Boolean',
            ofType: null
          }
        }
      }],
      kind: 'OBJECT',
      possibleTypes: null
    }, {
      inputFields: null,
      name: '__DirectiveLocation',
      description: 'A Directive can be adjacent to many parts of the GraphQL language, a __DirectiveLocation describes one such possible adjacencies.',
      interfaces: null,
      enumValues: [{
        name: 'QUERY',
        description: 'Location adjacent to a query operation.',
        isDeprecated: false,
        deprecationReason: null
      }, {
        name: 'MUTATION',
        description: 'Location adjacent to a mutation operation.',
        isDeprecated: false,
        deprecationReason: null
      }, {
        name: 'SUBSCRIPTION',
        description: 'Location adjacent to a subscription operation.',
        isDeprecated: false,
        deprecationReason: null
      }, {
        name: 'FIELD',
        description: 'Location adjacent to a field.',
        isDeprecated: false,
        deprecationReason: null
      }, {
        name: 'FRAGMENT_DEFINITION',
        description: 'Location adjacent to a fragment definition.',
        isDeprecated: false,
        deprecationReason: null
      }, {
        name: 'FRAGMENT_SPREAD',
        description: 'Location adjacent to a fragment spread.',
        isDeprecated: false,
        deprecationReason: null
      }, {
        name: 'INLINE_FRAGMENT',
        description: 'Location adjacent to an inline fragment.',
        isDeprecated: false,
        deprecationReason: null
      }, {
        name: 'SCHEMA',
        description: 'Location adjacent to a schema definition.',
        isDeprecated: false,
        deprecationReason: null
      }, {
        name: 'SCALAR',
        description: 'Location adjacent to a scalar definition.',
        isDeprecated: false,
        deprecationReason: null
      }, {
        name: 'OBJECT',
        description: 'Location adjacent to an object type definition.',
        isDeprecated: false,
        deprecationReason: null
      }, {
        name: 'FIELD_DEFINITION',
        description: 'Location adjacent to a field definition.',
        isDeprecated: false,
        deprecationReason: null
      }, {
        name: 'ARGUMENT_DEFINITION',
        description: 'Location adjacent to an argument definition.',
        isDeprecated: false,
        deprecationReason: null
      }, {
        name: 'INTERFACE',
        description: 'Location adjacent to an interface definition.',
        isDeprecated: false,
        deprecationReason: null
      }, {
        name: 'UNION',
        description: 'Location adjacent to a union definition.',
        isDeprecated: false,
        deprecationReason: null
      }, {
        name: 'ENUM',
        description: 'Location adjacent to an enum definition.',
        isDeprecated: false,
        deprecationReason: null
      }, {
        name: 'ENUM_VALUE',
        description: 'Location adjacent to an enum value definition.',
        isDeprecated: false,
        deprecationReason: null
      }, {
        name: 'INPUT_OBJECT',
        description: 'INPUT_OBJECT',
        isDeprecated: false,
        deprecationReason: null
      }, {
        name: 'INPUT_FIELD_DEFINITION',
        description: 'Location adjacent to an input object field definition.',
        isDeprecated: false,
        deprecationReason: null
      }],
      fields: null,
      kind: 'ENUM',
      possibleTypes: null
    }, {
      inputFields: null,
      name: '__EnumValue',
      description: 'One possible value for a given Enum. Enum values are unique values, not a placeholder for a string or numeric value. However an Enum value is returned in a JSON response as a string.',
      interfaces: [],
      enumValues: null,
      fields: [{
        name: 'name',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'NON_NULL',
          name: null,
          ofType: {
            kind: 'SCALAR',
            name: 'String',
            ofType: null
          }
        }
      }, {
        name: 'description',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'SCALAR',
          name: 'String',
          ofType: null
        }
      }, {
        name: 'isDeprecated',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'NON_NULL',
          name: null,
          ofType: {
            kind: 'SCALAR',
            name: 'Boolean',
            ofType: null
          }
        }
      }, {
        name: 'deprecationReason',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'SCALAR',
          name: 'String',
          ofType: null
        }
      }],
      kind: 'OBJECT',
      possibleTypes: null
    }, {
      inputFields: null,
      name: '__Field',
      description: 'Object and Interface types are described by a list of Fields, each of which has a name, potentially a list of arguments, and a return type.',
      interfaces: [],
      enumValues: null,
      fields: [{
        name: 'name',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'NON_NULL',
          name: null,
          ofType: {
            kind: 'SCALAR',
            name: 'String',
            ofType: null
          }
        }
      }, {
        name: 'description',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'SCALAR',
          name: 'String',
          ofType: null
        }
      }, {
        name: 'args',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'NON_NULL',
          name: null,
          ofType: {
            kind: 'LIST',
            name: null,
            ofType: {
              kind: 'NON_NULL',
              name: null,
              ofType: {
                kind: 'OBJECT',
                name: '__InputValue',
                ofType: null
              }
            }
          }
        }
      }, {
        name: 'type',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'NON_NULL',
          name: null,
          ofType: {
            kind: 'OBJECT',
            name: '__Type',
            ofType: null
          }
        }
      }, {
        name: 'isDeprecated',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'NON_NULL',
          name: null,
          ofType: {
            kind: 'SCALAR',
            name: 'Boolean',
            ofType: null
          }
        }
      }, {
        name: 'deprecationReason',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'SCALAR',
          name: 'String',
          ofType: null
        }
      }],
      kind: 'OBJECT',
      possibleTypes: null
    }, {
      inputFields: null,
      name: '__InputValue',
      description: 'Arguments provided to Fields or Directives and the input fields of an InputObject are represented as Input Values which describe their type and optionally a default value.',
      interfaces: [],
      enumValues: null,
      fields: [{
        name: 'name',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'NON_NULL',
          name: null,
          ofType: {
            kind: 'SCALAR',
            name: 'String',
            ofType: null
          }
        }
      }, {
        name: 'description',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'SCALAR',
          name: 'String',
          ofType: null
        }
      }, {
        name: 'type',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'NON_NULL',
          name: null,
          ofType: {
            kind: 'OBJECT',
            name: '__Type',
            ofType: null
          }
        }
      }, {
        name: 'defaultValue',
        description: 'A GraphQL-formatted string representing the default value for this input value.',
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'SCALAR',
          name: 'String',
          ofType: null
        }
      }],
      kind: 'OBJECT',
      possibleTypes: null
    }, {
      inputFields: null,
      name: '__Schema',
      description: 'A GraphQL Schema defines the capabilities of a GraphQL server. It exposes all available types and directives on the server, as well as the entry points for query, mutation, and subscription operations.',
      interfaces: [],
      enumValues: null,
      fields: [{
        name: 'types',
        description: 'A list of all types supported by this server.',
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'NON_NULL',
          name: null,
          ofType: {
            kind: 'LIST',
            name: null,
            ofType: {
              kind: 'NON_NULL',
              name: null,
              ofType: {
                kind: 'OBJECT',
                name: '__Type',
                ofType: null
              }
            }
          }
        }
      }, {
        name: 'queryType',
        description: 'The type that query operations will be rooted at.',
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'NON_NULL',
          name: null,
          ofType: {
            kind: 'OBJECT',
            name: '__Type',
            ofType: null
          }
        }
      }, {
        name: 'mutationType',
        description: 'If this server supports mutation, the type that mutation operations will be rooted at.',
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'OBJECT',
          name: '__Type',
          ofType: null
        }
      }, {
        name: 'subscriptionType',
        description: 'If this server support subscription, the type that subscription operations will be rooted at.',
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'OBJECT',
          name: '__Type',
          ofType: null
        }
      }, {
        name: 'directives',
        description: 'A list of all directives supported by this server.',
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'NON_NULL',
          name: null,
          ofType: {
            kind: 'LIST',
            name: null,
            ofType: {
              kind: 'NON_NULL',
              name: null,
              ofType: {
                kind: 'OBJECT',
                name: '__Directive',
                ofType: null
              }
            }
          }
        }
      }],
      kind: 'OBJECT',
      possibleTypes: null
    }, {
      inputFields: null,
      name: '__Type',
      description: 'The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.\n\nDepending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name and description, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.',
      interfaces: [],
      enumValues: null,
      fields: [{
        name: 'kind',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'NON_NULL',
          name: null,
          ofType: {
            kind: 'ENUM',
            name: '__TypeKind',
            ofType: null
          }
        }
      }, {
        name: 'name',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'SCALAR',
          name: 'String',
          ofType: null
        }
      }, {
        name: 'description',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'SCALAR',
          name: 'String',
          ofType: null
        }
      }, {
        name: 'fields',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [{
          name: 'includeDeprecated',
          description: null,
          type: {
            kind: 'SCALAR',
            name: 'Boolean',
            ofType: null
          },
          defaultValue: 'false'
        }],
        type: {
          kind: 'LIST',
          name: null,
          ofType: {
            kind: 'NON_NULL',
            name: null,
            ofType: {
              kind: 'OBJECT',
              name: '__Field',
              ofType: null
            }
          }
        }
      }, {
        name: 'interfaces',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'LIST',
          name: null,
          ofType: {
            kind: 'NON_NULL',
            name: null,
            ofType: {
              kind: 'OBJECT',
              name: '__Type',
              ofType: null
            }
          }
        }
      }, {
        name: 'possibleTypes',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'LIST',
          name: null,
          ofType: {
            kind: 'NON_NULL',
            name: null,
            ofType: {
              kind: 'OBJECT',
              name: '__Type',
              ofType: null
            }
          }
        }
      }, {
        name: 'enumValues',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [{
          name: 'includeDeprecated',
          description: null,
          type: {
            kind: 'SCALAR',
            name: 'Boolean',
            ofType: null
          },
          defaultValue: 'false'
        }],
        type: {
          kind: 'LIST',
          name: null,
          ofType: {
            kind: 'NON_NULL',
            name: null,
            ofType: {
              kind: 'OBJECT',
              name: '__EnumValue',
              ofType: null
            }
          }
        }
      }, {
        name: 'inputFields',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'LIST',
          name: null,
          ofType: {
            kind: 'NON_NULL',
            name: null,
            ofType: {
              kind: 'OBJECT',
              name: '__InputValue',
              ofType: null
            }
          }
        }
      }, {
        name: 'ofType',
        description: null,
        isDeprecated: false,
        deprecationReason: null,
        args: [],
        type: {
          kind: 'OBJECT',
          name: '__Type',
          ofType: null
        }
      }],
      kind: 'OBJECT',
      possibleTypes: null
    }, {
      inputFields: null,
      name: '__TypeKind',
      description: 'An enum describing what kind of type a given `__Type` is.',
      interfaces: null,
      enumValues: [{
        name: 'SCALAR',
        description: 'Indicates this type is a scalar.',
        isDeprecated: false,
        deprecationReason: null
      }, {
        name: 'OBJECT',
        description: 'Indicates this type is an object. `fields` and `interfaces` are valid fields.',
        isDeprecated: false,
        deprecationReason: null
      }, {
        name: 'INTERFACE',
        description: 'Indicates this type is an interface. `fields` and `possibleTypes` are valid fields.',
        isDeprecated: false,
        deprecationReason: null
      }, {
        name: 'UNION',
        description: 'Indicates this type is a union. `possibleTypes` is a valid field.',
        isDeprecated: false,
        deprecationReason: null
      }, {
        name: 'ENUM',
        description: 'Indicates this type is an enum. `enumValues` is a valid field.',
        isDeprecated: false,
        deprecationReason: null
      }, {
        name: 'INPUT_OBJECT',
        description: 'Indicates this type is an input object. `inputFields` is a valid field.',
        isDeprecated: false,
        deprecationReason: null
      }, {
        name: 'LIST',
        description: 'Indicates this type is a list. `ofType` is a valid field.',
        isDeprecated: false,
        deprecationReason: null
      }, {
        name: 'NON_NULL',
        description: 'Indicates this type is a non-null. `ofType` is a valid field.',
        isDeprecated: false,
        deprecationReason: null
      }],
      fields: null,
      kind: 'ENUM',
      possibleTypes: null
    }, {
      inputFields: null,
      name: 'Boolean',
      description: 'The `Boolean` scalar type represents `true` or `false`.',
      interfaces: null,
      enumValues: null,
      fields: null,
      kind: 'SCALAR',
      possibleTypes: null
    }, {
      inputFields: null,
      name: 'ID',
      description: 'The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.',
      interfaces: null,
      enumValues: null,
      fields: null,
      kind: 'SCALAR',
      possibleTypes: null
    }, {
      inputFields: null,
      name: 'Int',
      description: 'The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.',
      interfaces: null,
      enumValues: null,
      fields: null,
      kind: 'SCALAR',
      possibleTypes: null
    }, {
      inputFields: null,
      name: 'Long',
      description: 'The `Long` scalar type represents non-fractional signed whole numeric values. Long can represent values between -(2^63) and 2^63 - 1.',
      interfaces: null,
      enumValues: null,
      fields: null,
      kind: 'SCALAR',
      possibleTypes: null
    }, {
      inputFields: null,
      name: 'String',
      description: 'The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.',
      interfaces: null,
      enumValues: null,
      fields: null,
      kind: 'SCALAR',
      possibleTypes: null
    }]
  }
};