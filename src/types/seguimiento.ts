export type DocType = "certificado" | "solicitud" | "acta";

export type TimelineStepStatus = "done" | "active" | "pending";

export type StatusTone = "amber" | "green";

export interface Person {
  role: string;
  fullName: string;
  documentNumber: string;
}

export interface Field {
  label: string;
  value: string;
}

export interface TimelineStep {
  label: string;
  date?: string | null;
  status: TimelineStepStatus;
}

export interface TrackingResult {
  documentType: string;
  title: string;
  code: string;
  currentStatus: string;
  statusTone: StatusTone;
  people: Person[];
  fields: Field[];
  timeline: TimelineStep[];
}

export type Result = TrackingResult;

export interface DocMeta {
  label: string;
  tagBg: string;
  tagFg: string;
}
