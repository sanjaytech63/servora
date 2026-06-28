import { USER_ROLE_VALUES, USER_ROLES } from "@servora/shared";
import mongoose, { Model, Schema } from "mongoose";
import { IUserDocument } from "../types/user.types";

const userSchema = new Schema<IUserDocument>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: USER_ROLE_VALUES,
      default: USER_ROLES.USER,
      required: true,
    },

    // isEmailVerified: {
    //   type: Boolean,
    //   default: false,
    // },

    // lastLoginAt: Date,

    // refreshToken: {
    //   type: String,
    //   select: false,
    // },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.index({ email: 1 });

export const User: Model<IUserDocument> = mongoose.model<IUserDocument>("User", userSchema);
