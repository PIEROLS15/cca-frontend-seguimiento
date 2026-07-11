export type DocType = "certificado" | "solicitud" | "acta";

export type TimelineStepStatus = "done" | "active" | "pending";

export type StatusTone = "amber" | "green";

export interface TimelineStep {
  label: string;
  date?: string;
  status: TimelineStepStatus;
}

export interface BaseResult {
  type: DocType;
  code: string;
  currentStatus: string;
  statusTone: StatusTone;
  timeline: TimelineStep[];
}

export interface CertResult extends BaseResult {
  type: "certificado";
  fullName: string;
  dni: string;
  ubicacion: string;
  tipoTerreno: string;
  manzana: string;
  lote: string;
}

export interface SolResult extends BaseResult {
  type: "solicitud";
  fullName: string;
  dni: string;
  descripcion: string;
  tipoSolicitud: string;
  sector: string;
  destino: string;
}

export interface ActaResult extends BaseResult {
  type: "acta";
  comprador: string;
  compradorDni: string;
  vendedor: string;
  vendedorDni: string;
  ubicacion: string;
  tipoTerreno: string;
}

export type Result = CertResult | SolResult | ActaResult;

export interface DocMeta {
  label: string;
  tagBg: string;
  tagFg: string;
}
