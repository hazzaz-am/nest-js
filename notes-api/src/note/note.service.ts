import { Injectable, NotFoundException } from '@nestjs/common';
import { Note } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateNoteDto } from './dto/create-note.dto.js';
import { PaginationQueryDto } from './dto/pagination-query.dto.js';
import { UpdateNoteDto } from './dto/update-note.dto.js';

@Injectable()
export class NoteService {
  constructor(private readonly prismaService: PrismaService) {}

  async createNote(userId: number, payload: CreateNoteDto): Promise<Note> {
    return this.prismaService.note.create({
      data: { title: payload.title, body: payload.body, userId },
    });
  }

  async getAllNotes(
    pagination: PaginationQueryDto,
    userId: number,
  ): Promise<Note[]> {
    return this.prismaService.note.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      skip: pagination.skip,
      take: pagination.take,
    });
  }

  async getNoteById(userId: number, noteId: number): Promise<Note> {
    const note = await this.prismaService.note.findFirst({
      where: { id: noteId, userId },
    });

    if (!note) {
      throw new NotFoundException(`Note ${noteId} not found`);
    }

    return note;
  }

  async updateNote(
    userId: number,
    noteId: number,
    payload: UpdateNoteDto,
  ): Promise<Note> {
    await this.getNoteById(userId, noteId);

    return this.prismaService.note.update({
      where: { id: noteId },
      data: { title: payload.title, body: payload.body },
    });
  }

  async deleteNote(userId: number, noteId: number): Promise<Note> {
    await this.getNoteById(userId, noteId);

    return this.prismaService.note.delete({ where: { id: noteId } });
  }
}
