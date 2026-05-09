import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogService {
  private readonly blogs = [
    { id: 1, title: 'First Blog', content: 'This is the first blog post' },
    { id: 2, title: 'Second Blog', content: 'This is the second blog post' },
    { id: 3, title: 'Third Blog', content: 'This is the third blog post' },
  ];

  findAll() {
    return this.blogs;
  }

  findOne(id: number) {
    return this.blogs.find((blog) => blog.id === id);
  }
}
