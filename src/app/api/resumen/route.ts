import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const modelos = await prisma.modelo.findMany({
    orderBy: {
      nombre: "asc",
    },
    include: {
      inventarios: true,
      transitos: true,
      oportunidades: true,
    },
  });

  console.log(modelos);

  return NextResponse.json(modelos);
}