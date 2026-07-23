# Comunidad Campesina Asia - Frontend Seguimiento

[![CI](https://github.com/PIEROLS15/cca-frontend-seguimiento/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/PIEROLS15/cca-frontend-seguimiento/actions/workflows/ci.yml)
![Next.js](https://img.shields.io/badge/next.js-16.2.6-black)
![React](https://img.shields.io/badge/react-19.2.4-61DAFB)
![TypeScript](https://img.shields.io/badge/typescript-5.x-blue)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-4.x-38B2AC)

Frontend público de seguimiento para consultas de trámites de la Comunidad Campesina de Asia.
Permite buscar documentos por código y visualizar su estado, historial e información asociada.

---

## Tecnologias principales

- [Next.js 16](https://nextjs.org/) - Framework de React con App Router.
- [React 19](https://react.dev/) - Interfaz declarativa basada en componentes.
- [TypeScript](https://www.typescriptlang.org/) - Tipado estatico.
- [Tailwind CSS 4](https://tailwindcss.com/) - Estilos utilitarios.
- [Radix UI](https://www.radix-ui.com/) - Componentes accesibles.
- [Sonner](https://sonner.emilkowal.ski/) - Notificaciones toast.
- [Recharts](https://recharts.org/) - Visualizacion de datos.
- [Playwright](https://playwright.dev/) - Pruebas E2E.

---

## Estructura del proyecto

```bash
src/
  app/                      # App Router de Next.js
    api/health/             # Healthcheck para despliegues y pruebas
    layout.tsx              # Layout raiz
    page.tsx                # Pantalla principal de seguimiento
  components/
    layout/                 # Header, Footer y contenedores
    seguimiento/            # Formulario, resultados, historial y vacios
    ui/                     # Base de componentes reutilizables
    theme-provider.tsx      # Manejo de tema visual
  hooks/                    # Logica reutilizable de seguimiento
  services/                 # Llamadas a API y adaptacion de respuestas
  lib/                      # Utilidades y helpers
  store/                    # Estado global con Zustand
  types/                    # Tipos TypeScript
```

---

## Configuracion

### Prerequisitos

- Node.js 20 o superior
- pnpm instalado globalmente
- Backend disponible para consumir la API

Verifica versiones:

```bash
node -v
pnpm -v
```

### Variables de entorno

Crea el archivo `.env` en la raiz de `cca-frontend-seguimiento` usando `.env.example` como referencia:

```bash
NEXT_PUBLIC_API_URL=http://localhost:9001
```

---

## Instalacion

1. Clona el repositorio y entra al frontend de seguimiento:

```bash
git clone https://github.com/PIEROLS15/comunidad-campesina-asia.git
cd comunidad-campesina-asia/cca-frontend-seguimiento
```

2. Instala dependencias:

```bash
pnpm install
```

3. Crea el archivo `.env`:

```bash
cp .env.example .env
```

4. Ajusta `NEXT_PUBLIC_API_URL` segun tu backend local o remoto.

---

## Desarrollo

Inicia el frontend en modo desarrollo:

```bash
pnpm run dev
```

Servidor por defecto: `http://localhost:9002`

Healthcheck:

```bash
GET /api/health
```

---

## Pruebas

### Tests E2E

```bash
pnpm run test:e2e
```

El archivo `.env` se carga automaticamente desde `playwright.config.ts`, asi que no hace falta exportar `FRONTEND_TEST_URL` a mano.

---

## Docker

### Prerequisitos

- [Docker](https://docs.docker.com/engine/install/) y [Docker Compose](https://docs.docker.com/compose/install/) instalados.

### Configuracion

El contenedor del frontend necesita `NEXT_PUBLIC_API_URL` para conectarse al backend.
Si usas `docker compose`, define tambien `FRONTEND_PORT` para exponer el puerto local.

### Primer despliegue

1. Crea el archivo `.env` en la raiz de `cca-frontend-seguimiento` usando `.env.example` como referencia:

```bash
cp .env.example .env
```

2. Ajusta las variables segun tu entorno.

3. Construye e inicia los contenedores:

```bash
docker compose up -d --build
```

Esto levanta el frontend de seguimiento en el puerto definido por `FRONTEND_PORT`.

### Pruebas con Docker

Para validar el frontend de seguimiento contra el backend de pruebas:

Antes de ejecutarlo, crea `.env` desde `.env.example` y completa la seccion de test.

```bash
docker compose --env-file .env -p cca-frontend-seguimiento-test -f docker-compose.test.yml up -d --build frontend
pnpm test:e2e
```

Antes de correr `Playwright`, asegúrate de tener arriba el backend de test.
El archivo `.env` se carga automaticamente desde `playwright.config.ts`, asi que no hace falta exportar `FRONTEND_TEST_URL` a mano.

Para limpiar el entorno de pruebas:

```bash
docker compose --env-file .env -p cca-frontend-seguimiento-test -f docker-compose.test.yml down
```

El script `deploy/test/deploy.sh` replica el despliegue de test en el VPS con `--build` y el workflow `e2e.yml` ejecuta Playwright contra ese entorno.

---

## Despliegue en VPS

Para produccion usamos release por carpeta y rollback seguro.

Estructura esperada:

```bash
/opt/app/frontend-seguimiento/current
/opt/app/frontend-seguimiento/releases/<sha>
/opt/app/frontend-seguimiento/shared/.env
```

Antes del primer deploy crea el archivo `/opt/app/frontend-seguimiento/shared/.env` con la URL publica del backend:

```bash
NEXT_PUBLIC_API_URL=https://api.comunidadcampesina-asia.com
FRONTEND_PORT=9002
```

El workflow `deploy/frontend/deploy.sh` sube un release nuevo, valida `/api/health` y solo despues promueve el release.
Recuerda que `FRONTEND_PORT` define el puerto expuesto en el host, mientras que el frontend dentro del contenedor escucha siempre en `9002`.

---

## Scripts disponibles

```bash
pnpm run dev      # Ejecuta Next.js en modo desarrollo
pnpm run build    # Genera build de produccion
pnpm run start    # Ejecuta la build generada
pnpm run lint     # Ejecuta ESLint
pnpm run test:e2e # Ejecuta Playwright
```

---

## Funcionalidades

- Consulta publica del estado de tramites.
- Busqueda por tipo de documento y codigo.
- Visualizacion de informacion del documento.
- Historial de estados del tramite.
- Mensajes de error amigables para consultas no encontradas.

---

## Contribucion

1. Crea una rama para tu cambio (`feature/...` o `fix/...`).
2. Mantiene la estructura por capas: `app`, `components`, `hooks`, `services`, `types`, etc.
3. Si cambias contratos con la API, actualiza servicios y tipos correspondientes.
4. Ejecuta `pnpm run lint`, `pnpm run build` y `pnpm run test:e2e` antes de abrir un Pull Request.

---

## Licencia

Este proyecto no declara una licencia publica.

---

Desarrollado por [PIEROLS15](https://github.com/PIEROLS15)
