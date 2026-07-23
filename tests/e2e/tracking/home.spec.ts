import { expect, test } from "@playwright/test";

test("loads the tracking page", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("Consulta el estado de tu trámite")).toBeVisible();
  await expect(page.getByText("Selecciona el tipo de documento e ingresa tu código")).toBeVisible();
});
