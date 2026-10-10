import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard.js';
// `import type` is required here: with emitDecoratorMetadata + isolatedModules, a
// type used in a decorated signature must not be a value import.
import type { AuthenticatedRequest } from '../auth/guards/auth.guard.js';
import { CreateNoteDto } from './dto/create-note.dto.js';
import { PaginationQueryDto } from './dto/pagination-query.dto.js';
import { UpdateNoteDto } from './dto/update-note.dto.js';
import { NoteService } from './note.service.js';

@UseGuards(AuthGuard)
@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  createNote(
    @Body() payload: CreateNoteDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.noteService.createNote(request.user.sub, payload);
  }

  @Get()
  getNotes(
    @Req() request: AuthenticatedRequest,
    @Query() pagination: PaginationQueryDto,
  ) {
    return this.noteService.getAllNotes(pagination, request.user.sub);
  }

  @Get(':id')
  getNote(
    @Param('id', ParseIntPipe) id: number,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.noteService.getNoteById(request.user.sub, id);
  }

  @Patch(':id')
  updateNote(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateNoteDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.noteService.updateNote(request.user.sub, id, payload);
  }

  @Delete(':id')
  deleteNote(
    @Param('id', ParseIntPipe) id: number,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.noteService.deleteNote(request.user.sub, id);
  }
}
