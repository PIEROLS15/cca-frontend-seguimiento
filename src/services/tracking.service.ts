const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9001";

export interface TrackingPerson {
  role: string;
  fullName: string;
  documentNumber: string;
}

export interface TrackingField {
  label: string;
  value: string;
}

export interface TrackingHistoryStep {
  status: string;
  date: string | null;
  done: boolean;
}

export interface TrackingResponse {
  documentType: string;
  title: string;
  code: string;
  currentStatus: string;
  information: {
    people: TrackingPerson[];
    fields: TrackingField[];
  };
  history: TrackingHistoryStep[];
}

export interface ApiResponse {
  message: string;
  error: boolean;
  status: number;
  data: TrackingResponse;
}

export async function fetchDocumentTracking(
  documentType: string,
  code: string
): Promise<TrackingResponse> {
  const res = await fetch(
    `${API_BASE_URL}/api/public/tracking/${encodeURIComponent(documentType)}/${encodeURIComponent(code)}`
  );

  if (!res.ok) {
    if (res.status === 404 || res.status === 400) {
      throw new Error("No encontramos ningún trámite con ese código");
    }
    throw new Error("No se pudo conectar con el servidor. Intenta nuevamente.");
  }

  const json: ApiResponse = await res.json();

  if (json.error) {
    throw new Error(json.message || "No encontramos ningún trámite con ese código");
  }

  return json.data;
}
