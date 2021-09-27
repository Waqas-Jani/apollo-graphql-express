import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models';
import { SECRET_KEY } from '../config';

async function createUser(args, contaxt) {
  try {
    const existingUser = await User.findOne({ email: args.user.email });
    if (existingUser) {
      throw new Error('Email already takken!');
    }
    const hashedPassword = await bcrypt.hash(args.user.password, 12);

    const user = new User({
      name: args.user.name,
      email: args.user.email,
      role: args.user.role,
      password: hashedPassword,
    });

    const result = await user.save();

    return { ...result._doc, password: null, _id: result.id };
  } catch (err) {
    throw err;
  }
}

async function login({ email, password }) {
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error('User does not exist!');
  }
  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) {
    throw new Error('Email or Password is incorrect!');
  }
  const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: '1h',
  });
  return { userId: user.id, name: user.name, token: token, tokenExpiration: 1 };
}

async function getUsers(args, contaxt) {
  if (!contaxt.req.isAuth) {
    throw new Error('Unauthorized!');
  }
  try {
    const users = await User.find({}, { password: 0, __typename: 0 }).populate(
      'role',
      {
        _id: 0,
        name: 1,
        __typename: 0,
      }
    );
    return users;
  } catch (err) {
    throw err;
  }
}

export { createUser, login, getUsers };
