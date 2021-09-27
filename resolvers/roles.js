import { getRoles, createRole, delRole } from '../utils/roles';

const roleResolvers = {
  Query: {
    getRoles: (parent, args, contaxt, info) => getRoles(args, contaxt),
  },
  Mutation: {
    createRole: (parent, args, contaxt, info) => createRole(args, contaxt),
    deleteRole: (parent, args, contaxt, info) => delRole(args, contaxt),
  },
};

module.exports = roleResolvers;
