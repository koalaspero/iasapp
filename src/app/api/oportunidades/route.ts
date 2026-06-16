import { prisma } from "@/src/lib/prisma";
import { Oportunidad } from "@/src/types/models/Oportunidad";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const oportunidad = await prisma.oportunidad.create({
      data: {
        idOportunidad: body.idOportunidad,
        nombreCliente: body.nombreCliente,
        pais: body.pais,
        ejecutivo: body.ejecutivo,
        cantidad: body.cantidad,
        probabilidadCierre: body.probabilidadCierre,
        fechaCierre: new Date(body.fechaCierre),
        valorUSD: body.valorUSD,
        estadoOportunidad: body.estadoOportunidad,
        idModelo: body.idModelo,
      },
    });

    return NextResponse.json(oportunidad, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Error registrando oportunidad" },
      { status: 500 }
    );
  }
}