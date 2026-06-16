// app/api/modelos/route.ts

import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const modelos = await prisma.modelo.findMany({
    orderBy: {
      nombre: "asc",
    },
  });

  console.log(modelos);

  return NextResponse.json(modelos);
}