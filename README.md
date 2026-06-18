# Roles API — Obel Challenge

## Stack
- NestJS + TypeScript
- Persistencia in-memory
- Swagger/OpenAPI en /docs
- Auth por header Authorization

## Correr localmente

```bash
pnpm install
pnpm run start:dev
```

## Variables de entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| AUTH_TOKEN | Token de autenticación | obel-secret-token |
| PORT | Puerto del servidor | 3000 |

Copiar `.env.example` a `.env` y completar los valores.

## Endpoints

### Roles
- `POST   /roles`           — Crear role
- `GET    /roles`           — Listar roles
- `GET    /roles/:id`       — Obtener role por ID
- `PUT    /roles/:id`       — Actualizar role
- `DELETE /roles/:id`       — Eliminar role

### Users
- `POST   /users/:id/roles`           — Asignar role a usuario
- `DELETE /users/:id/roles/:roleId`   — Desasignar role
- `GET    /users/:id/roles`           — Listar roles de un usuario

## Autenticación
Todos los endpoints requieren el header:
```
Authorization: <token>
```

## Documentación
Swagger UI disponible en `/docs`

## Producción
- API: [COMPLETAR CON URL DE RAILWAY]
- Docs: [COMPLETAR CON URL DE RAILWAY]/docs
