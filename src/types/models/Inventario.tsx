import { Modelo } from "./Modelos";

export class Inventario {
  id: number | undefined;
  serie: string | undefined;
  pais: string | undefined;
  estado: string | undefined;
  ubicacion: string | undefined;
  cantidad: number | undefined;
  fechaCorte: Date | undefined;

  idModelo: number | undefined;
  modelo?: Modelo;

  constructor(data?: Partial<Inventario>) {
    Object.assign(this, data);
  }
}