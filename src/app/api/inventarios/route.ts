import { prisma } from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const inventario = await prisma.inventario.create({
      data: {
        serie: body.serie,
        pais: body.pais,
        estado: body.estado,
        ubicacion: body.ubicacion,
        cantidad: body.cantidad,
        fechaCorte: new Date(body.fechaCorte),
        idModelo: body.idModelo,
      },
    });

    return NextResponse.json(inventario, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Error creando inventario" },
      { status: 500 }
    );
  }
}