import { IsNotEmpty, IsString } from "class-validator";

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  firstName: string

  @IsNotEmpty()
  @IsString()
  lastName: string

  @IsNotEmpty()
  @IsString()
  userName: string


  @IsString()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  hashPassword: string
}
