import { Role } from '../models';

async function getRoles(args, contaxt) {
  if (!contaxt.req.isAuth) {
    throw new Error('Unauthorized!');
  }
  try {
    const role = await Role.find();
    return role;
  } catch (err) {
    throw err;
  }
}
async function createRole(args, contaxt) {
  if (!contaxt.req.isAuth) {
    throw new Error('Unauthorized!');
  }
  try {
    const role = new Role({
      name: args.role.name,
      description: args.role.description,
      permissions: args.role.permissions,
    });

    await role.save();

    return 'Created Successfully!';
  } catch (err) {
    throw err;
  }
}

async function delRole(args, contaxt) {
  if (!contaxt.req.isAuth) {
    throw new Error('Unauthorized!');
  }
  try {
    await Role.findByIdAndDelete({ _id: args.id });
    return 'Deleted Successfully!';
  } catch (err) {
    throw err;
  }
}

export { getRoles, createRole, delRole };
