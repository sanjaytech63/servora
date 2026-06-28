import { UserRole } from "@servora/shared";

export interface UserDto {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
}
