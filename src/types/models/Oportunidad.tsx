import { Modelo } from "./Modelos";

export class Oportunidad {
  idOportunidad: string | undefined;

  nombreCliente: string | undefined;
  pais: string | undefined;
  ejecutivo: string | undefined;

  cantidad: number | undefined;
  probabilidadCierre: number | undefined;
  fechaCierre: Date | undefined;
  valorUSD: number | undefined;
  estadoOportunidad: string | undefined;

  idModelo: number | undefined;
  modelo?: Modelo;

  constructor(data?: Partial<Oportunidad>) {
    Object.assign(this, data);
  }
}