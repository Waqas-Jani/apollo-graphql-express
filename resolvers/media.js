import { GraphQLUpload } from 'graphql-upload';
import { join, parse } from 'path';

import { createWriteStream } from 'fs';
import { ApolloError } from 'apollo-server-express';

const mediaResolvers = {
  Upload: GraphQLUpload,
  Mutation: {
    singleUpload: async (parent, { file }) => {
      try {
        const { filename, createReadStream } = await file;

        let stream = createReadStream();

        let { ext, name } = parse(filename);

        name = name.replace(/([^a-z0-9 ]+)/gi, '-');

        let serverFile = join(
          __dirname,
          `../uploads/${name}-${Date.now()}${ext}`
        );

        serverFile = serverFile.replace(' ', '_');

        let writeStream = await createWriteStream(serverFile);

        await stream.pipe(writeStream);

        serverFile = `${serverFile.split('uploads')[1]}`;

        return serverFile;
      } catch (err) {
        throw new ApolloError(err.message);
      }

      // return { filename, mimetype, encoding };
    },
  },
};

module.exports = mediaResolvers;
