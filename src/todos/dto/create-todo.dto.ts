import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, MaxLength } from 'class-validator';

export class CreateTodoDto {
  todoId: string;

  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @MaxLength(150)
  @ApiProperty()
  description: string;

  @IsArray()
  @ApiProperty({ required: false })
  tags: string[];

  @ApiProperty({ required: false, default: 'PENDING' })
  status: 'PENDING' | 'IN PROGRESS' | 'DONE';

  @ApiProperty({ required: false, default: true })
  published: boolean;

  userId: string;
}
