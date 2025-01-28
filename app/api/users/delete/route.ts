import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error('Error al leer usuarios', error);
    return NextResponse.json({ error: 'Error al leer usuarios' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  if (!id) {
    return NextResponse.json({ error: 'Se requiere un ID' }, { status: 400 });
  }

  try {
    await prisma.user.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: 'Usuario eliminado' }, { status: 200 });
  } catch (error) {
    console.error('Error al eliminar usuario', error);
    return NextResponse.json({ error: 'Error al eliminar usuario' }, { status: 500 });
  }
}
