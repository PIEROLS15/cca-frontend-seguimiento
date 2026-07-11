import type { DocType, Result } from "@/types/seguimiento";

export const MOCK: Record<DocType, Record<string, Result>> = {
  certificado: {
    "023665": {
      type: "certificado",
      code: "023665",
      fullName: "ACOSTA ALFARO, DIANA CLAUDIA",
      dni: "43422119",
      ubicacion: "Santa Rosa Praderas",
      tipoTerreno: "Vivienda",
      manzana: "I-2",
      lote: "5",
      currentStatus: "Por firmar",
      statusTone: "amber",
      timeline: [
        { label: "Solicitud recibida", date: "15/05/2026 5:07pm", status: "done" },
        { label: "Por firmar", date: "15/05/2026 5:07pm", status: "active" },
        { label: "Por recoger", status: "pending" },
        { label: "Entregado", status: "pending" },
      ],
    },
  },
  solicitud: {
    "003205-26": {
      type: "solicitud",
      code: "003205-26",
      fullName: "TENEMAS PONCE, MARIA MAGDALENA",
      dni: "41106610",
      descripcion: "Traspaso",
      tipoSolicitud: "Certificado de posesión",
      sector: "San Jorge de Asia",
      destino: "Secretaría",
      currentStatus: "En proceso",
      statusTone: "amber",
      timeline: [
        { label: "Solicitud recibida", date: "15/05/2026 4:16pm", status: "done" },
        { label: "En proceso", date: "15/05/2026 4:16pm", status: "active" },
        { label: "Entregado", status: "pending" },
      ],
    },
  },
  acta: {
    "018461": {
      type: "acta",
      code: "018461",
      comprador: "CACERES PEREZ, EVERT ROGER",
      compradorDni: "41106610",
      vendedor: "PEREZ LOPEZ, JUAN CARLOS",
      vendedorDni: "15362458",
      ubicacion: "Santa Rosa Praderas",
      tipoTerreno: "Vivienda",
      currentStatus: "En proceso",
      statusTone: "amber",
      timeline: [
        { label: "Solicitud recibida", date: "15/05/2026 4:16pm", status: "done" },
        { label: "En proceso", date: "15/05/2026 4:20pm", status: "active" },
        { label: "Por recoger", status: "pending" },
        { label: "Entregado", status: "pending" },
      ],
    },
  },
};

export const DOC_META: Record<DocType, { label: string; tagBg: string; tagFg: string }> = {
  certificado: {
    label: "Certificado",
    tagBg: "var(--tag-cert-bg)",
    tagFg: "var(--tag-cert-fg)",
  },
  solicitud: {
    label: "Solicitud de certificado",
    tagBg: "var(--tag-sol-bg)",
    tagFg: "var(--tag-sol-fg)",
  },
  acta: {
    label: "Acta de asamblea",
    tagBg: "var(--tag-acta-bg)",
    tagFg: "var(--tag-acta-fg)",
  },
};
