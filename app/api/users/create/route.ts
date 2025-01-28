import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { nombre, edad } = await req.json();
  const user = await prisma.user.create({
    data: {
      nombre,
      edad,
    },
  });
  return NextResponse.json(user, { status: 201 });
}
