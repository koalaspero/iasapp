import { prisma } from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const oportunidad = await prisma.transito.create({
      data: {
        fechaCorte: new Date(body.fechaCorte),
        paisDestino: body.paisDestino,
        cantidad: body.cantidad,
        estadoEmbarque: body.estadoEmbarque,
        puertoOrigen: body.puertoOrigen,
        puertoDestino: body.puertoDestino,
        eta: new Date(body.eta),
        idModelo: body.idModelo,
      },
    });

    return NextResponse.json(oportunidad, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Error registrando tránsito" },
      { status: 500 }
    );
  }
}