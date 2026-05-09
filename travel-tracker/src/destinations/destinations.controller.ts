import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { DestinationsService } from './destinations.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateDestinationDto } from './dto/create-destination.dto';

@Controller('destinations')
@UseGuards(JwtAuthGuard)
export class DestinationsController {
  constructor(private readonly destinationsService: DestinationsService) {}

  @Post('create')
  async createDestination(@Request() req, @Body() body: CreateDestinationDto) {
    return await this.destinationsService.create(req.user.userId, body);
  }
}
