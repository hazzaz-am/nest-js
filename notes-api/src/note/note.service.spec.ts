import { NotFoundException } from '@nestjs/common';
import { Note } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { NoteService } from './note.service.js';

describe('NoteService', () => {
  const userId = 7;

  const note: Note = {
    id: 1,
    title: 'Groceries',
    body: 'Milk, eggs',
    userId,
    createdAt: new Date('2026-01-01T00:00:00.000Z'),
    updatedAt: new Date('2026-01-01T00:00:00.000Z'),
  };

  let service: NoteService;
  let prisma: {
    note: {
      create: ReturnType<typeof vi.fn>;
      findMany: ReturnType<typeof vi.fn>;
      findFirst: ReturnType<typeof vi.fn>;
      update: ReturnType<typeof vi.fn>;
      delete: ReturnType<typeof vi.fn>;
    };
  };

  beforeEach(() => {
    prisma = {
      note: {
        create: vi.fn(),
        findMany: vi.fn(),
        findFirst: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
      },
    };

    service = new NoteService(prisma as unknown as PrismaService);
  });

  describe('createNote', () => {
    it('files the note against the authenticated user, not the payload', async () => {
      prisma.note.create.mockResolvedValue(note);

      await expect(
        service.createNote(userId, { title: 'Groceries', body: 'Milk, eggs' }),
      ).resolves.toEqual(note);

      expect(prisma.note.create).toHaveBeenCalledWith({
        data: { title: 'Groceries', body: 'Milk, eggs', userId },
      });
    });
  });

  describe('getAllNotes', () => {
    it('filters by the authenticated user', async () => {
      prisma.note.findMany.mockResolvedValue([note]);

      await expect(service.getAllNotes(userId)).resolves.toEqual([note]);

      expect(prisma.note.findMany).toHaveBeenCalledWith({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });
    });
  });

  describe('getNoteById', () => {
    it('scopes the lookup to the owner', async () => {
      prisma.note.findFirst.mockResolvedValue(note);

      await expect(service.getNoteById(userId, 1)).resolves.toEqual(note);

      expect(prisma.note.findFirst).toHaveBeenCalledWith({
        where: { id: 1, userId },
      });
    });

    it('404s when the note belongs to another user', async () => {
      prisma.note.findFirst.mockResolvedValue(null);

      await expect(service.getNoteById(userId, 1)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('updateNote', () => {
    it('refuses to touch a note the user does not own', async () => {
      prisma.note.findFirst.mockResolvedValue(null);

      await expect(
        service.updateNote(userId, 1, { title: 'Hacked' }),
      ).rejects.toBeInstanceOf(NotFoundException);

      expect(prisma.note.update).not.toHaveBeenCalled();
    });

    it('updates a note the user owns', async () => {
      prisma.note.findFirst.mockResolvedValue(note);
      prisma.note.update.mockResolvedValue({ ...note, title: 'Renamed' });

      await expect(
        service.updateNote(userId, 1, { title: 'Renamed' }),
      ).resolves.toMatchObject({ title: 'Renamed' });

      expect(prisma.note.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { title: 'Renamed', body: undefined },
      });
    });
  });

  describe('deleteNote', () => {
    it('refuses to delete a note the user does not own', async () => {
      prisma.note.findFirst.mockResolvedValue(null);

      await expect(service.deleteNote(userId, 1)).rejects.toBeInstanceOf(
        NotFoundException,
      );

      expect(prisma.note.delete).not.toHaveBeenCalled();
    });

    it('deletes a note the user owns', async () => {
      prisma.note.findFirst.mockResolvedValue(note);
      prisma.note.delete.mockResolvedValue(note);

      await expect(service.deleteNote(userId, 1)).resolves.toEqual(note);

      expect(prisma.note.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});
