import { Module } from '@nestjs/common';
import { NoteService } from './note.service.js';
import { NoteController } from './note.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  providers: [NoteService],
  controllers: [NoteController]
})
export class NoteModule {}
