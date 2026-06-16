import { Inventario } from "./Inventario";
import { Oportunidad } from "./Oportunidad";
import { Transito } from "./Transito";

export class Modelo {
  id: number = 0;
  nombre: string = "";
  familia: string = "";
  lineaProducto: string = "";
  valorRef: number = 0;

  inventarios: Inventario[];
  transitos: Transito[];
  oportunidades: Oportunidad[];

  constructor(data?: Partial<Modelo>) {
    Object.assign(this, data);
    this.inventarios ??= [];
    this.transitos ??= [];
    this.oportunidades ??= [];
  }
}