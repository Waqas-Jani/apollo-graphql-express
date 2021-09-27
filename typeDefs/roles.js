import { gql } from 'apollo-server-express';

const roleDefs = gql`
  input RoleInput {
    name: String!
    description: String!
    permissions: String!
  }
  type Roles {
    id: ID!
    name: String!
    description: String!
    permissions: String!
  }

  extend type Query {
    getRoles: [Roles!]
  }
  extend type Mutation {
    createRole(role: RoleInput): String!
    deleteRole(id: String!): String!
  }
`;

module.exports = roleDefs;
