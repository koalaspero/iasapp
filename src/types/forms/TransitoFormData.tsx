import { Dayjs } from "dayjs";
import { Transito } from "../models/Transito";

export class TransitoFormData {
  fechaCorte: Dayjs | null = null;

  paisDestino = "";
  cantidad = 1;

  eta: Dayjs | null = null;

  puertoOrigen = "";
  puertoDestino = "";
  estadoEmbarque = "";

  idModelo: number | null = null;

  constructor(data?: Partial<TransitoFormData>) {
    Object.assign(this, data);
  }

  validate(): TransitoFormErrors {
    const errors: TransitoFormErrors = {};

    if (!this.fechaCorte) {
      errors.fechaCorte = "La fecha de corte es obligatoria";
    }

    if (!this.paisDestino.trim()) {
      errors.paisDestino = "El país destino es obligatorio";
    }

    if (!Number.isInteger(this.cantidad) || this.cantidad <= 0) {
      errors.cantidad = "La cantidad debe ser mayor a 0";
    }

    if (!this.eta) {
      errors.eta = "La ETA es obligatoria";
    }

    if (
      this.fechaCorte &&
      this.eta &&
      this.eta.isBefore(this.fechaCorte, "day")
    ) {
      errors.eta =
        "La ETA no puede ser anterior a la fecha de corte";
    }

    if (!this.puertoOrigen.trim()) {
      errors.puertoOrigen = "El puerto origen es obligatorio";
    }

    if (!this.puertoDestino.trim()) {
      errors.puertoDestino = "El puerto destino es obligatorio";
    }

    if (!this.estadoEmbarque.trim()) {
      errors.estadoEmbarque =
        "Debe seleccionar un estado de embarque";
    }

    if (!this.idModelo) {
      errors.idModelo = "Debe seleccionar un modelo";
    }

    return errors;
  }

  isValid(): boolean {
    return Object.keys(this.validate()).length === 0;
  }

  toModel(): Transito {
    return {
      id: 0,
      fechaCorte: this.fechaCorte?.toDate() ?? new Date(),
      paisDestino: this.paisDestino,
      cantidad: this.cantidad,
      eta: this.eta?.toDate() ?? new Date(),
      puertoOrigen: this.puertoOrigen,
      puertoDestino: this.puertoDestino,
      estadoEmbarque: this.estadoEmbarque,
      idModelo: this.idModelo ?? 0,
    };
  }
}

export const ESTADOS_EMBARQUE = [
  "Pendiente",
  "En Puerto Origen",
  "Embarcado",
  "En Tránsito",
  "Arribado",
  "Entregado",
  "Cancelado",
] as const;

export type TransitoFormErrors =
  Partial<Record<keyof TransitoFormData, string>>;