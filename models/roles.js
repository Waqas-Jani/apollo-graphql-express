import { Schema, model } from 'mongoose';

const roleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    permissions: {
      type: String,
      required: true,
    },
    //   createdEvents: [
    //     {
    //       type: Schema.Types.ObjectId,
    //       ref: 'Event'
    //     }
    //   ]
  },
  { timestamps: true }
);

export default model('Role', roleSchema);
