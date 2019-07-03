import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as validator from 'mongoose-validator';
import { IUser } from './user.interface';

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
      maxlength: 100,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      minlength: 4,
      maxlength: 100,
      validate: validator({
        validator: 'isEmail',
      }),
      // match: [
      //     /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      //     'Please fill a valid email address'
      // ],
    },
    password: {
      type: String,
      select: false,
    },
  },
  { timestamps: true },
);

UserSchema.pre<IUser>('save', async function(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  user.password = await bcrypt.hash(user.password, 12);
  return next();
});

export { UserSchema };
