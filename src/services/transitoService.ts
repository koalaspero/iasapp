import { Transito } from "../types/models/Transito";

export async function createTransito(
  transito: Transito
) {
  const response = await fetch("/api/transitos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transito),
  });

  if (!response.ok) {
    throw new Error("Error creando registro de tránsito");
  }

  return response.json();
}