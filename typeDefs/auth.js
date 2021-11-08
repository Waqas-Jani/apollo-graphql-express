import { gql } from 'apollo-server-express';

const authDefs = gql`
  input UserInput {
    name: String!
    email: String!
    password: String!
    role: String!
  }
  type Permission {
    _id: ID!
    name: String
    permissions: String
  }
  type User {
    _id: ID!
    name: String!
    email: String!
    role: Permission
  }
  type AuthData {
    userId: ID!
    name: String!
    token: String!
    tokenExpiration: Int!
  }

  type Query {
    login(email: String!, password: String!): AuthData!
    getUsers: [User!]
  }

  type Mutation {
    createUser(user: UserInput): User!
  }
`;

module.exports = authDefs;
