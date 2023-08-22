import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(6)
  @ApiProperty()
  name: string;

  @IsString()
  @MinLength(4)
  @ApiProperty()
  username: string;

  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
  )
  @Length(8, 128)
  @ApiProperty()
  password: string;
}
