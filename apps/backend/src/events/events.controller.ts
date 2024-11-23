import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  complementEvent,
  complementGuest,
  Event,
  EventDate,
  events_seed,
  Guest,
  Id,
} from 'core';

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

  @Get('/validate/:alias/:id')
  async validateAlias(@Param('alias') alias: string, @Param('id') id: string) {
    const event = events_seed.find((event) => event.alias === alias);

    return { valid: !event || event.id === id };
  }

  private serialize(event: Event) {
    if (!event) return null;

    return {
      ...event,
      date: EventDate.format(event.date),
    };
  }

  @Post('/access')
  async accessEvent(@Body() data: { id: string; password: string }) {
    const event = events_seed.find(
      (event) => event.id === data.id && event.password === data.password,
    );

    if (!event) {
      throw new Error('Senha não corresponde ao evento.');
    }

    return this.serialize(event);
  }

  private deserealize(event: any): Event {
    if (!event) return null;

    return {
      ...event,
      date: EventDate.parse(event.date),
    };
  }

  @Post(':alias/guest')
  async saveGuest(@Param('alias') alias: string, @Body() guest: Guest) {
    const event = events_seed.find((event) => event.alias === alias);

    if (!event) {
      throw new Error('Senha não corresponde ao evento.');
    }

    const guestComplete = complementGuest(guest);
    event.guests.push(guestComplete);

    return this.serialize(event);
  }

  @Post()
  async saveEvent(@Body() event: Event) {
    const eventExists = events_seed.find((ev) => ev.alias === event.alias);

    if (eventExists && eventExists.id !== event.id) {
      throw new Error('Já existe um evento com este alias.');
    }

    const eventComplete = complementEvent(this.deserealize(event));
    events_seed.push(eventComplete);

    return this.serialize(event);
  }
}
