import authResolvers from './auth';
import roleResolvers from './roles';
import mediaResolvers from './media';

const resolvers = [authResolvers, roleResolvers, mediaResolvers];

module.exports = resolvers;
