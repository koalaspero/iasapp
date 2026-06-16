import { Inventario } from "@/src/types/models/Inventario";

export async function createInventario(
  inventario: Inventario
) {
  const response = await fetch("/api/inventarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inventario),
  });

  if (!response.ok) {
    throw new Error("Error creando inventario");
  }

  return response.json();
}