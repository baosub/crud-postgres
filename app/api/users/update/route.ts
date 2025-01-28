import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
  const { id, nombre, edad } = await req.json();
  const user = await prisma.user.update({
    where: { id },
    data: { nombre, edad },
  });
  return NextResponse.json(user, { status: 200 });
}
