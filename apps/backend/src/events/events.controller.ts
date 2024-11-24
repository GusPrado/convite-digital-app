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
import { EventPrisma } from './event.prisma';

@Controller('events')
export class EventsController {
  constructor(readonly repository: EventPrisma) {}

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

  @Get()
  async getEvents() {
    const events = await this.repository.getAllEvent();
    return events.map(this.serialize);
  }

  @Get(':idOrAlias')
  async getEvent(@Param('idOrAlias') idOrAlias: string) {
    let event: Event;

    if (Id.validate(idOrAlias)) {
      event = await this.repository.getById(idOrAlias);
    } else {
      event = await this.repository.getById(idOrAlias);
    }

    return this.serialize(event);
  }

  @Get('/validate/:alias/:id')
  async validateAlias(@Param('alias') alias: string, @Param('id') id: string) {
    const event = await this.repository.getByAlias(alias);

    return { valid: !event || event.id === id };
  }

  @Post('/access')
  async accessEvent(@Body() data: { id: string; password: string }) {
    const event = await this.repository.getById(data.id);

    if (!event) {
      throw new Error('Evento não encontrado.');
    }

    if (event.password !== data.password) {
      throw new Error('Senha não corresponde ao evento.');
    }

    return this.serialize(event);
  }

  @Post(':alias/guest')
  async saveGuest(@Param('alias') alias: string, @Body() guest: Guest) {
    const event = await this.repository.getByAlias(alias);

    if (!event) {
      throw new Error('Evento não encontrado.');
    }

    const guestComplete = complementGuest(guest);
    await this.repository.saveGuest(event, guestComplete);
  }

  @Post()
  async saveEvent(@Body() event: Event) {
    const eventExists = await this.repository.getByAlias(event.alias);

    if (eventExists && eventExists.id !== event.id) {
      throw new Error('Já existe um evento com este alias.');
    }

    const eventComplete = complementEvent(this.deserealize(event));
    await this.repository.save(eventComplete);
  }
}
