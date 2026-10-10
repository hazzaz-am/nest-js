import { AuthenticatedRequest } from '../auth/guards/auth.guard.js';
import { NoteController } from './note.controller.js';
import { NoteService } from './note.service.js';

describe('NoteController', () => {
  const authenticatedUserId = 7;

  const request = {
    user: {
      sub: authenticatedUserId,
      email: 'halima@gmail.com',
      iat: 0,
      exp: 0,
    },
  } as unknown as AuthenticatedRequest;

  let controller: NoteController;
  let noteService: {
    createNote: ReturnType<typeof vi.fn>;
    getAllNotes: ReturnType<typeof vi.fn>;
    getNoteById: ReturnType<typeof vi.fn>;
    updateNote: ReturnType<typeof vi.fn>;
    deleteNote: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    noteService = {
      createNote: vi.fn(),
      getAllNotes: vi.fn(),
      getNoteById: vi.fn(),
      updateNote: vi.fn(),
      deleteNote: vi.fn(),
    };

    controller = new NoteController(noteService as unknown as NoteService);
  });

  it('creates the note for the authenticated user', async () => {
    const payload = { title: 'Groceries', body: 'Milk, eggs' };

    await controller.createNote(payload, request);

    expect(noteService.createNote).toHaveBeenCalledWith(
      authenticatedUserId,
      payload,
    );
  });

  it("lists only the authenticated user's notes", async () => {
    await controller.getNotes(request);

    expect(noteService.getAllNotes).toHaveBeenCalledWith(authenticatedUserId);
  });

  it('scopes a single fetch to the authenticated user', async () => {
    await controller.getNote(42, request);

    expect(noteService.getNoteById).toHaveBeenCalledWith(
      authenticatedUserId,
      42,
    );
  });

  it('scopes updates to the authenticated user', async () => {
    await controller.updateNote(42, { title: 'Renamed' }, request);

    expect(noteService.updateNote).toHaveBeenCalledWith(
      authenticatedUserId,
      42,
      { title: 'Renamed' },
    );
  });

  it('scopes deletes to the authenticated user', async () => {
    await controller.deleteNote(42, request);

    expect(noteService.deleteNote).toHaveBeenCalledWith(
      authenticatedUserId,
      42,
    );
  });
});
