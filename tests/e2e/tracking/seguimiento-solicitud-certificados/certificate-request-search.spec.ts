import { expect, test } from "@playwright/test";
import {
  DEFAULT_MOCK_DATA,
  expectPersonVisible,
  expectTabHistoryVisible,
  expectTabInfoVisible,
  expectTimelineStepVisible,
  mockTrackingAPI,
  searchDocument,
  selectDocumentType,
} from "./helpers";

test("búsqueda de solicitud de certificado muestra tabs de información e historial", async ({
  page,
}) => {
  await mockTrackingAPI(page);
  await page.goto("/");

  await selectDocumentType(page, "Solicitud de certificado");
  await searchDocument(page, DEFAULT_MOCK_DATA.code);

  await expect(
    page.getByText(DEFAULT_MOCK_DATA.currentStatus)
  ).toBeVisible();

  await expectTabInfoVisible(page);
  await expectPersonVisible(page, DEFAULT_MOCK_DATA.information.people[0].fullName);

  await page.getByRole("button", { name: "Historial" }).click();

  await expectTabHistoryVisible(page);
  await expectTimelineStepVisible(page, DEFAULT_MOCK_DATA.history[0].status);

  await expect(page).toHaveURL(
    new RegExp(`tab=history`)
  );
});

test("Limpiar búsqueda resetea la consulta", async ({ page }) => {
  await mockTrackingAPI(page);
  await page.goto("/");

  await selectDocumentType(page, "Solicitud de certificado");
  await searchDocument(page, DEFAULT_MOCK_DATA.code);

  await expect(
    page.getByText(DEFAULT_MOCK_DATA.currentStatus)
  ).toBeVisible();

  await page.getByRole("button", { name: "Limpiar búsqueda" }).click();

  await expect(page).toHaveURL(/\//);
  await expect(page.getByText(DEFAULT_MOCK_DATA.currentStatus)).not.toBeVisible();
});
