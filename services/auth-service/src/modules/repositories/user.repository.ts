import { IUserDocument } from "../types/user.types";
import { User } from "../models/user.model";

export class UserRepository {
  static findByEmail(email: string) {
    return User.findOne({
      email: email.toLowerCase(),
    }).select("+password");
  }

  static create(data: Partial<IUserDocument>) {
    return User.create(data);
  }

  static findById(id: string) {
    return User.findById(id);
  }

  static exists(email: string) {
    return User.exists({
      email: email.toLowerCase(),
    });
  }
}