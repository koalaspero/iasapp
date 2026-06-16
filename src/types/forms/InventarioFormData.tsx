import { Dayjs } from "dayjs";
import { Inventario } from "../models/Inventario";

export class InventarioFormData {
  serie = "";
  pais = "";
  estado = "";
  ubicacion = "";

  cantidad = 1;

  fechaCorte: Dayjs | null = null;

  idModelo: number | null = null;

  constructor(data?: Partial<InventarioFormData>) {
    Object.assign(this, data);
  }

  validate(): InventarioFormErrors {
    const errors: InventarioFormErrors = {};

    if (!this.serie.trim()) {
      errors.serie = "La serie es obligatoria";
    }

    if (!this.pais.trim()) {
      errors.pais = "El país es obligatorio";
    }

    if (!this.estado.trim()) {
      errors.estado = "El estado es obligatorio";
    }

    if (!this.ubicacion.trim()) {
      errors.ubicacion = "La ubicación es obligatoria";
    }

    if (!Number.isInteger(this.cantidad) || this.cantidad <= 0) {
      errors.cantidad = "La cantidad debe ser mayor a 0";
    }

    if (!this.fechaCorte) {
      errors.fechaCorte = "La fecha de corte es obligatoria";
    }

    if (!this.idModelo) {
      errors.idModelo = "Debe seleccionar un modelo";
    }

    return errors;
  }

  isValid(): boolean {
    return Object.keys(this.validate()).length === 0;
  }


  toModel(): Inventario {
    return {
      id: 0,
      serie: this.serie,
      pais: this.pais,
      estado: this.estado,
      ubicacion: this.ubicacion,
      cantidad: this.cantidad,
      fechaCorte: this.fechaCorte?.toDate() ?? new Date(),
      idModelo: this.idModelo ?? 0,
    };
  }
}

export type InventarioFormErrors =
  Partial<Record<keyof InventarioFormData, string>>;