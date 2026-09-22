import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto.js';
import { FilterTicketsQueryDto } from './dto/filter-tickets-query.dto.js';
import { TicketsService } from './tickets.service.js';
import { UpdateTicketDto } from './dto/update-ticket.dto.js';
import { StaffGuard } from './guards/staff.guard.js';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketService: TicketsService) {}

  @Get()
  findAll(@Query() filters: FilterTicketsQueryDto) {
    return this.ticketService.findAll(filters.status, filters.priority);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ticketService.findOne(id);
  }

  @Post()
  createTicket(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.createTicket(createTicketDto);
  }

  @Patch(':id')
  updateTicket(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTicket: UpdateTicketDto,
  ) {
    return this.ticketService.updateTicket(id, updateTicket);
  }

  @UseGuards(StaffGuard)
  @Patch(':id/close')
  closeTicket(@Param('id', ParseIntPipe) id: number) {
    return this.ticketService.closeTicket(id)
  }
}
