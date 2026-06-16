
export class Resumen {
  modelo: string;
  modeloFamilia: string;
  modeloLineaProducto: string;
  inventario: number;
  enTransito: number;
  totalDisponible: number;
  oportunidades: number;
  porcentajeCierrePromedio: number;
  demandaEsperada: number;
  gap: number;

  constructor(
    modelo: string,
    modeloFamilia: string,
    modeloLineaProducto: string,
    inventario: number,
    enTransito: number,
    oportunidades: number,
    porcentajeCierrePromedio: number
  ) {
    this.modelo = modelo;
    this.modeloFamilia = modeloFamilia;
    this.modeloLineaProducto = modeloLineaProducto;
    this.inventario = inventario;
    this.enTransito = enTransito;
    this.totalDisponible = inventario + enTransito;
    this.oportunidades = oportunidades;
    this.porcentajeCierrePromedio = porcentajeCierrePromedio;

    this.demandaEsperada =
      oportunidades * (porcentajeCierrePromedio / 100);

    this.gap =
      this.totalDisponible - this.demandaEsperada;
  }
}