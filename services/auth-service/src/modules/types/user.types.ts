import { Document } from "mongoose";

import { IUser } from "@servora/shared";

export interface IUserDocument extends Omit<IUser, "_id">, Document {
  password: string;
}
