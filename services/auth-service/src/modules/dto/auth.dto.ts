import { UserDto } from "./user.dto";

export interface AuthResponseDto {
  user: UserDto;
  accessToken: string;
  refreshToken: string;
}