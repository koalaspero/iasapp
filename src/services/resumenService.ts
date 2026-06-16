import { Modelo } from "@prisma/client";
import { Resumen } from "../types/models/Resumen";

export async function getResumen(): Promise<Resumen[]> {
  const response = await fetch("/api/resumen");

  if (!response.ok) {
    throw new Error("Error cargando resumen");
  }

  const modelos = await response.json();

  return modelos.map((modelo: { inventarios: any[]; transitos: any[]; oportunidades: any[]; nombre: any; familia: any; lineaProducto: any;}): Resumen => {
    const inventario = modelo.inventarios.reduce(
      (sum, item) => sum + item.cantidad,
      0
    );

    const enTransito = modelo.transitos.reduce(
      (sum, item) => sum + item.cantidad,
      0
    );

    const oportunidades = modelo.oportunidades.reduce(
      (sum, item) => sum + item.cantidad,
      0
    );

    const porcentajeCierrePromedio =
      modelo.oportunidades.length > 0
        ? modelo.oportunidades.reduce(
            (sum, item) => sum + item.probabilidadCierre,
            0
          ) / modelo.oportunidades.length
        : 0;

    const demandaEsperada = modelo.oportunidades.reduce(
      (sum, item) =>
        sum + item.cantidad * (item.probabilidadCierre / 100),
      0
    );

    const totalDisponible = inventario + enTransito;

    return {
      modelo: modelo.nombre,
      modeloFamilia : modelo.familia,
      modeloLineaProducto: modelo.lineaProducto,
      inventario,
      enTransito,
      totalDisponible,
      oportunidades,
      porcentajeCierrePromedio,
      demandaEsperada,
      gap: totalDisponible - demandaEsperada,
    };
  });
}