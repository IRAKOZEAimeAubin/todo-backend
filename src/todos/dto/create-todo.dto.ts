import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateTodoDto {
  todoId: string;

  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @MaxLength(150)
  @ApiProperty()
  description: string;

  @ApiProperty({ required: false, default: 'PENDING' })
  status: 'PENDING' | 'IN PROGRESS' | 'DONE';

  @ApiProperty({ required: false, default: false })
  published: boolean;

  creatorId: string;
}
