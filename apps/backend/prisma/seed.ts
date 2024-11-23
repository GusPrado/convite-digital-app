import { PrismaClient } from '@prisma/client';
import { events_seed } from 'core';

async function seed() {
  const prisma = new PrismaClient();

  const transactions = events_seed.map(async (event) => {
    await prisma.event.create({
      data: {
        id: event.id,
        alias: event.alias,
        password: event.password,
        name: event.name,
        date: event.date,
        location: event.location,
        description: event.description,
        image: event.image,
        backgroundImage: event.backgroundImage,
        expectedPublic: event.expectedPublic,
        guests: {
          create: event.guests.map((guest) => ({
            id: guest.id,
            name: guest.name,
            email: guest.email,
            confirmed: guest.confirmed,
            companion: guest.companion,
            companionAmount: guest.companionAmount,
          })),
        },
      },
    });
  });

  await Promise.all(transactions);
}

seed();
