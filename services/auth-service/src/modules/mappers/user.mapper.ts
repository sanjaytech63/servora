import { UserDto } from "../dto/user.dto";
import { IUserDocument } from "../types/user.types";

export const toUserDto = (user: IUserDocument): UserDto => ({
  id: user._id.toString(),
  fullName: user.fullName,
  email: user.email,
  role: user.role,
});
