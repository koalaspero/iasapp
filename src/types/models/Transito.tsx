import { Modelo } from "./Modelos";

export class Transito {
  id: number | undefined;
  fechaCorte: Date | undefined;

  paisDestino: string | undefined;
  cantidad: number | undefined;

  eta: Date | undefined;
  puertoOrigen: string | undefined;
  puertoDestino: string | undefined;
  estadoEmbarque: string | undefined;

  idModelo: number | undefined;
  modelo?: Modelo;

  constructor(data?: Partial<Transito>) {
    Object.assign(this, data);
  }
}