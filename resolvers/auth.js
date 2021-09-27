import { login, createUser, getUsers } from '../utils/auth';

const authResolvers = {
  Query: {
    login: (parent, args, contaxt, info) => login(args),
    getUsers: (parent, args, contaxt, info) => getUsers(args, contaxt),
  },
  Mutation: {
    createUser: (parent, args, contaxt, info) => createUser(args, contaxt),
  },
};

module.exports = authResolvers;
