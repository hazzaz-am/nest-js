import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { TicketsModule } from './tickets/tickets.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: process.env.OBSERVE_APP_KEY as string,
      appSecret: process.env.OBSERVE_APP_SECRET as string,
      serviceId: 'helpdesk-lite-api',
    }),
    TicketsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
