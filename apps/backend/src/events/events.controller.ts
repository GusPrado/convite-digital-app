import { Controller, Get, Param } from '@nestjs/common';
import { Event, EventDate, events_seed, Id } from 'core';

@Controller('events')
export class EventsController {
  @Get()
  async getEvents() {
    return events_seed.map(this.serialize);
  }

  @Get(':idOrAlias')
  async getEvent(@Param('idOrAlias') idOrAlias: string) {
    if (Id.validate(idOrAlias)) {
      return this.serialize(
        events_seed.find((event) => event.id === idOrAlias),
      );
    } else {
      return this.serialize(
        events_seed.find((event) => event.alias === idOrAlias),
      );
    }
  }

  private serialize(event: Event) {
    if (!event) return null;

    return {
      ...event,
      date: EventDate.format(event.date),
    };
  }

  private deserealize(event: any): Event {
    if (!event) return null;

    return {
      ...event,
      date: EventDate.parse(event.date),
    };
  }
}
