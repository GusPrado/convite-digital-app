import { Event, Guest } from 'core';
import { Injectable } from '@nestjs/common';
import { PrismaProvider } from 'src/db/prisma.provider';

@Injectable()
export class EventPrisma {
  constructor(readonly prisma: PrismaProvider) {}

  save(event: Event) {
    return this.prisma.event.create({
      data: event as any,
    });
  }

  saveGuest(event: Event, guest: Guest) {
    return this.prisma.guest.create({
      data: {
        ...guest,
        companionAmount: +(guest.companionAmount ?? 0),
        event: {
          connect: {
            id: event.id,
          },
        },
      },
    });
  }

  async getAllEvent(): Promise<Event[]> {
    return this.prisma.event.findMany() as any;
  }

  async getById(id: string, complete = false): Promise<Event | null> {
    return this.prisma.event.findUnique({
      where: {
        id,
      },
      include: { guests: true },
    }) as any;
  }

  async getByAlias(alias: string, complete = false): Promise<Event | null> {
    return this.prisma.event.findUnique({
      select: {
        id: true,
        name: true,
        alias: true,
        description: true,
        location: true,
        date: true,
        image: true,
        backgroundImage: true,
        password: complete,
        expectedPublic: complete,
        guests: complete,
      },
      where: {
        alias,
      },
    }) as any;
  }
}
