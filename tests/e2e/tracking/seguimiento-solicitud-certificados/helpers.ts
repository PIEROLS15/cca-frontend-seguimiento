import { expect, type Page } from "@playwright/test";

interface MockPerson {
  role: string;
  fullName: string;
  documentNumber: string;
}

interface MockField {
  label: string;
  value: string;
}

interface MockHistoryStep {
  status: string;
  date: string | null;
  done: boolean;
  note?: string | null;
}

interface MockTrackingData {
  documentType: string;
  title: string;
  code: string;
  currentStatus: string;
  information: {
    people: MockPerson[];
    fields: MockField[];
  };
  history: MockHistoryStep[];
}

export const DEFAULT_MOCK_DATA: MockTrackingData = {
  documentType: "solicitud-de-certificado",
  title: "Solicitud de Certificado de Residencia",
  code: "SOL-CERT-001",
  currentStatus: "En Revisión",
  information: {
    people: [
      { role: "Solicitante", fullName: "María García", documentNumber: "87654321" },
    ],
    fields: [
      { label: "Ubicación", value: "Asia" },
      { label: "Tipo de Solicitud", value: "Residencia" },
    ],
  },
  history: [
    { status: "Registro", date: "2025-01-15T10:00:00", done: true },
    { status: "En Revisión", date: "2025-01-16T14:30:00", done: true },
    { status: "Pendiente de Aprobación", date: null, done: false },
  ],
};

export async function mockTrackingAPI(
  page: Page,
  data: MockTrackingData = DEFAULT_MOCK_DATA
) {
  await page.route("**/api/public/tracking/**", (route) => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        message: "OK",
        error: false,
        status: 200,
        data,
      }),
    });
  });
}

export async function mockTrackingAPINotFound(page: Page) {
  await page.route("**/api/public/tracking/**", (route) => {
    route.fulfill({
      status: 404,
      contentType: "application/json",
      body: JSON.stringify({
        message: "No encontramos ningún trámite con ese código",
        error: true,
        status: 404,
        data: null,
      }),
    });
  });
}

export async function selectDocumentType(page: Page, type: string) {
  await page.getByRole("button", { name: type, exact: true }).click();
}

export async function searchDocument(page: Page, code: string) {
  await page.getByPlaceholder("Ingresa el código de tu trámite").fill(code);
  await page.getByRole("button", { name: "Consultar" }).click();
}

export async function expectTabInfoVisible(page: Page) {
  const tab = page.getByRole("button", { name: "Información" });
  await expect(tab).toBeVisible();
}

export async function expectTabHistoryVisible(page: Page) {
  const tab = page.getByRole("button", { name: "Historial" });
  await expect(tab).toBeVisible();
}

export async function expectPersonVisible(page: Page, name: string) {
  await expect(page.getByText(name)).toBeVisible();
}

export async function expectTimelineStepVisible(page: Page, label: string) {
  await expect(page.getByText(label).first()).toBeVisible();
}
