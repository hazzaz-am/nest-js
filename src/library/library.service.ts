import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Library, TLibraryDocument } from './schemas/library.schema';
import { Model } from 'mongoose';
import { LibraryDto } from './dto/library.dto';
import { BookDto } from './dto/book.dto';
import { Book, TBookDocument } from './schemas/book.schema';

@Injectable()
export class LibraryService {
  constructor(
    @InjectModel(Library.name)
    private libraryModel: Model<TLibraryDocument>,
    @InjectModel(Book.name)
    private bookModel: Model<TBookDocument>,
  ) {}

  async createBook(data: BookDto): Promise<TBookDocument> {
    const newBook = new this.bookModel(data);
    return newBook.save();
  }

  async createLibrary(data: LibraryDto): Promise<TLibraryDocument> {
    const newLibrary = new this.libraryModel(data);
    return newLibrary.save();
  }

  async getLibraryData(): Promise<TLibraryDocument[]> {
    return this.libraryModel.find().populate('books');
  }

  async getBookData(): Promise<TBookDocument[]> {
    return this.bookModel.find();
  }
}
