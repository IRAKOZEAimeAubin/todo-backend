import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  private async generateNewId() {
    const randomNum = Math.floor(Math.random() * 1000);
    const randomString = randomNum.toString().padStart(3, '0');
    const newId = `TD${randomString}`;
    const existingTodoType = await this.prisma.todo.findUnique({
      where: { todoId: newId },
    });

    if (existingTodoType) {
      return this.generateNewId();
    }

    return newId;
  }

  async create(createTodoDto: CreateTodoDto) {
    const generatedTodoId = await this.generateNewId();

    createTodoDto.todoId = generatedTodoId;

    return this.prisma.todo.create({
      data: createTodoDto,
    });
  }

  findAll() {
    return this.prisma.todo.findMany();
  }

  findOne(id: string) {
    return this.prisma.todo.findUnique({
      where: { todoId: id },
    });
  }

  update(id: string, updateTodoDto: UpdateTodoDto) {
    return this.prisma.todo.update({
      where: { todoId: id },
      data: updateTodoDto,
    });
  }

  remove(id: string) {
    return this.prisma.todo.delete({
      where: { todoId: id },
    });
  }
}
