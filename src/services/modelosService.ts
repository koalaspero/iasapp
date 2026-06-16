import { Modelo } from "../generated/prisma/client";

export async function getModelos(): Promise<Modelo[]> {
  const response = await fetch("/api/modelos");

  if (!response.ok) {
    throw new Error("Error cargando modelos");
  }

  return response.json();
}