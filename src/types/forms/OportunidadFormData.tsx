import dayjs, { Dayjs } from "dayjs";
import { Oportunidad } from "../models/Oportunidad";


export class OportunidadFormData {
  idOportunidad = "";

  nombreCliente = "";
  pais = "";
  ejecutivo = "";

  cantidad = 1;
  probabilidadCierre = 50;

  fechaCierre: Dayjs | null = null;

  valorUSD = 0;
  estadoOportunidad = "";

  idModelo: number | null = null;

  constructor(data?: Partial<OportunidadFormData>) {
    Object.assign(this, data);
  }

  validate(): OportunidadFormErrors {
    const errors: OportunidadFormErrors = {};

    if (!this.idOportunidad.trim()) {
      errors.idOportunidad = "El ID de oportunidad es obligatorio";
    }

    if (!this.nombreCliente.trim()) {
      errors.nombreCliente = "El cliente es obligatorio";
    }

    if (!this.pais.trim()) {
      errors.pais = "El país es obligatorio";
    }

    if (!this.ejecutivo.trim()) {
      errors.ejecutivo = "El ejecutivo es obligatorio";
    }

    if (!Number.isInteger(this.cantidad) || this.cantidad <= 0) {
      errors.cantidad = "La cantidad debe ser mayor a 0";
    }

    if (
      !Number.isInteger(this.probabilidadCierre) ||
      this.probabilidadCierre < 0 ||
      this.probabilidadCierre > 100
    ) {
      errors.probabilidadCierre =
        "La probabilidad debe estar entre 0 y 100";
    }

    if (!this.fechaCierre) {
      errors.fechaCierre = "La fecha de cierre es obligatoria";
    }

    if (this.valorUSD <= 0) {
      errors.valorUSD = "El valor debe ser mayor a 0";
    }

    if (!this.estadoOportunidad.trim()) {
      errors.estadoOportunidad =
        "Debe seleccionar un estado";
    }

    if (!this.idModelo) {
      errors.idModelo =
        "Debe seleccionar un modelo";
    }

    return errors;
  }

  isValid(): boolean {
    return Object.keys(this.validate()).length === 0;
  }

  toModel(): Oportunidad {
    return {
      idOportunidad: this.idOportunidad,
      nombreCliente: this.nombreCliente,
      pais: this.pais,
      ejecutivo: this.ejecutivo,
      cantidad: this.cantidad,
      probabilidadCierre: this.probabilidadCierre,
      fechaCierre: this.fechaCierre?.toDate() ?? new Date(),
      valorUSD: this.valorUSD,
      estadoOportunidad: this.estadoOportunidad,
      idModelo: this.idModelo ?? 0,
    };
  }
}

export const ESTADOS_OPORTUNIDAD = [
  "Abierta",
  "En Evaluación",
  "En Desarrollo",
  "En Negociación",
  "Ganada",
  "Perdida",
] as const;

export type OportunidadFormErrors =
  Partial<Record<keyof OportunidadFormData, string>>;