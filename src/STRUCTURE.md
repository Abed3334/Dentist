# Source structure

- **`components/`** – Shared UI used in more than one place (navbar, footer, Modal, EmptyState, etc.). Page-specific pieces live under `pages/…/components/`.
- **`layouts/`** – Route-level layouts (Public, Dashboard, User). Used in the router; dashboard and public use `<Outlet />`, user layout wraps `children`.
- **`pages/`** – One folder per route section. Each route has a `page.tsx` (or `NotFound.tsx`). Feature-specific components live in that section’s `components/` subfolder.
- **`router/`** – Route config and `AppRoutes`. Layout routes have nested `children`; dashboard and public use a single layout for all their sub-routes.
- **`constants/`** – App-wide constants (e.g. assets, config).
- **`contexts/`** – React context providers (e.g. Toast).
- **`mocks/`** – Mock data; replace with `api/` or `services/` when wiring a backend.

Import from `@/…` (e.g. `@/layouts/UserLayout`, `@/components/ui/Modal`). Shared hooks or utils can go in `hooks/` and `utils/` when needed.
