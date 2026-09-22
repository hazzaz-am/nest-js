import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto.js';
import { UpdateTicketDto } from './dto/update-ticket.dto.js';
import { Ticket } from './ticket.interface.js';

@Injectable()
export class TicketsService {
  private readonly tickets: Ticket[] = [
    {
      id: 1,
      subject: 'Cannot login to account',
      description: 'User cannot access the dashboard after login.',
      priority: 'high',
      status: 'open',
      createdAt: '2026-09-01T10:00:00.000Z',
    },
    {
      id: 2,
      subject: 'Payment Failed',
      description: 'Card payment fails at the checkout step.',
      priority: 'high',
      status: 'open',
      createdAt: '2026-09-01T10:00:00.000Z',
    },
    {
      id: 3,
      subject: 'Password Reset Not Working',
      description:
        'User does not receive the password reset email after requesting it.',
      priority: 'medium',
      status: 'open',
      createdAt: '2026-09-02T08:30:00.000Z',
    },
    {
      id: 4,
      subject: 'Dashboard Loading Slowly',
      description:
        'The dashboard takes several seconds to load after signing in.',
      priority: 'medium',
      status: 'in-progress',
      createdAt: '2026-09-02T11:15:00.000Z',
    },
    {
      id: 5,
      subject: 'Profile Update Failed',
      description:
        'User cannot save changes made to their profile information.',
      priority: 'low',
      status: 'open',
      createdAt: '2026-09-03T09:45:00.000Z',
    },
    {
      id: 6,
      subject: 'Email Verification Issue',
      description:
        'The email verification link shows an invalid or expired message.',
      priority: 'high',
      status: 'in-progress',
      createdAt: '2026-09-03T14:20:00.000Z',
    },
    {
      id: 7,
      subject: 'Order Not Showing',
      description:
        "Recently placed orders are not appearing in the user's order history.",
      priority: 'medium',
      status: 'open',
      createdAt: '2026-09-04T07:10:00.000Z',
    },
    {
      id: 8,
      subject: 'Unable to Upload File',
      description: 'User receives an error when trying to upload a document.',
      priority: 'medium',
      status: 'closed',
      createdAt: '2026-09-04T12:40:00.000Z',
    },
    {
      id: 9,
      subject: 'Notification Not Received',
      description: 'User is not receiving notifications for account activity.',
      priority: 'low',
      status: 'open',
      createdAt: '2026-09-05T10:25:00.000Z',
    },
    {
      id: 10,
      subject: 'Account Suspended Unexpectedly',
      description:
        "User's account was suspended even though they did not receive any warning.",
      priority: 'high',
      status: 'in-progress',
      createdAt: '2026-09-05T15:50:00.000Z',
    },
  ];

  private ticketNumber = 11;

  findAll(status?: Ticket['status'], priority?: Ticket['priority']) {
    let tickets = this.tickets;

    if (status) {
      tickets = tickets.filter((ticket) => ticket.status === status);
    }

    if (priority) {
      tickets = tickets.filter((ticket) => ticket.priority === priority);
    }

    return tickets;
  }

  findOne(id: number) {
    const ticket = this.tickets.find((ticket: Ticket) => ticket.id === id);

    if (!ticket) {
      throw new NotFoundException(`Ticket is not found for this ${id} id`);
    }

    return ticket;
  }

  createTicket(createTicketDto: CreateTicketDto) {
    const ticket: Ticket = {
      id: this.ticketNumber++,
      description: createTicketDto.description,
      status: 'open',
      priority: createTicketDto.priority,
      subject: createTicketDto.subject,
      createdAt: new Date().toISOString(),
    };

    this.tickets.push(ticket);
    return this.tickets;
  }

  updateTicket(id: number, updateTicketDto: UpdateTicketDto) {
    const ticket = this.findOne(id);

    if (ticket.status === 'closed') {
      throw new BadRequestException('Closed ticket can not be updated');
    }

    Object.assign(ticket, updateTicketDto);

    return ticket;
  }

  closeTicket(id: number) {
    const ticket = this.findOne(id);

    if (ticket.status === 'closed') {
      throw new BadRequestException('Ticket is already closed');
    }

    ticket.status = 'closed';
    return ticket;
  }
}
