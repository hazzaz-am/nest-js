import { Injectable } from '@nestjs/common';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DestinationsService {
  constructor(private prismaService: PrismaService) {}

  async create(userId: number, createDestinationDto: CreateDestinationDto) {
    return this.prismaService.destination.create({
      data: {
        ...createDestinationDto,
        travelDate: new Date(createDestinationDto.travelDate).toISOString(),
        userId,
      },
    });
  }
}
