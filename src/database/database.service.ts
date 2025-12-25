import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  private isConnected = false;

  onModuleInit() {
    this.isConnected = true;
    console.log('Database Connected');
  }

  onApplicationShutdown() {
    this.isConnected = false;
    console.log('Database DisConnected');
  }

  getStatus() {
    return this.isConnected ? 'Connected' : 'Disconnected';
  }
}
