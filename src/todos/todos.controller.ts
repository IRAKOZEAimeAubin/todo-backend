import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from 'src/prisma-client-exception/prisma-client-exception.filter';
import { TodoEntity } from './entities/todo.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('todos')
@ApiTags('todos')
@UseFilters(PrismaClientExceptionFilter)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: TodoEntity })
  create(@Body() createTodoDto: CreateTodoDto, @Request() request) {
    const authenticatedUser = request.user;
    createTodoDto.creatorId = authenticatedUser.id;
    return this.todosService.create(createTodoDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: TodoEntity, isArray: true })
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: TodoEntity })
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: TodoEntity })
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(id, updateTodoDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: TodoEntity })
  remove(@Param('id') id: string) {
    return this.todosService.remove(id);
  }
}
