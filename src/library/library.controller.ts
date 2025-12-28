import { Body, Controller, Get, Post } from '@nestjs/common';
import { LibraryService } from './library.service';
import { BookDto } from './dto/book.dto';
import { LibraryDto } from './dto/library.dto';

@Controller('library')
export class LibraryController {
  constructor(private libraryService: LibraryService) {}

  @Post('/create-book')
  async createBook(@Body() data: BookDto) {
    return this.libraryService.createBook(data);
  }

  @Post('/create-library')
  async createLibrary(@Body() data: LibraryDto) {
    return this.libraryService.createLibrary(data);
  }

  @Get()
  async getLibraryData() {
    return this.libraryService.getLibraryData();
  }

  @Get('/books')
  async getBooksData() {
    return this.libraryService.getBookData();
  }
}
