import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { DbModule } from 'src/db/db.module';
import { EventPrisma } from './event.prisma';

@Module({
  controllers: [EventsController],
  imports: [DbModule],
  providers: [EventPrisma],
})
export class EventsModule {}
