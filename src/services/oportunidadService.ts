import { Oportunidad } from "../types/models/Oportunidad";

export async function createOportunidad(
  oportunidad: Oportunidad
) {
  const response = await fetch("/api/oportunidades", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(oportunidad),
  });

  if (!response.ok) {
    throw new Error("Error creando oportunidad");
  }

  return response.json();
}