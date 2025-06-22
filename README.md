# Dashboard Challenge Backend

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Descripción General del Proyecto

Este es el backend de la aplicación **Dashboard Challenge**, desarrollado con [NestJS](https://nestjs.com/), un framework progresivo de Node.js para construir aplicaciones del lado del servidor eficientes y escalables.

### Características Principales

- **Autenticación JWT**: Sistema de autenticación seguro con tokens JWT
- **Gestión de Usuarios**: Registro y autenticación de usuarios
- **Dashboards Dinámicos**: Creación y gestión de dashboards personalizables
- **Componentes de Widget**: Sistema de componentes reutilizables para dashboards
- **Base de Datos MySQL**: Persistencia de datos con TypeORM
- **API RESTful**: Endpoints bien estructurados con versionado
- **Validación de Datos**: Validación automática de entrada con class-validator
- **CORS Configurado**: Soporte para aplicaciones frontend

### Estructura del Proyecto

```
src/
├── auth/                 # Módulo de autenticación
│   ├── guards/          # Guards de autenticación
│   ├── strategies/      # Estrategias de Passport
│   └── dto/            # Data Transfer Objects
├── users/               # Módulo de usuarios
│   ├── entities/       # Entidades de base de datos
│   └── dto/           # DTOs de usuarios
├── dashboards/          # Módulo de dashboards
│   ├── components/     # Componentes de dashboard
│   ├── widgetTypes/    # Tipos de widgets
│   ├── entities/       # Entidades de dashboard
│   └── dto/           # DTOs de dashboard
└── utils/              # Utilidades y datos mock
```

## Requisitos del Sistema

### Software Requerido

- **Node.js**: Versión 18.x o superior
- **npm**: Gestor de paquetes de Node.js
- **MySQL**: Versión 8.0 o superior
- **Docker** (opcional): Para ejecutar MySQL en contenedor

### Versiones Recomendadas

```bash
Node.js: 18.x o 20.x
npm: 9.x o superior
MySQL: 8.0
Docker: 20.x o superior (opcional)
```

## Configuración del Proyecto

### 1. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd dashboard-challenge-back
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Configuración de Base de Datos
DB_HOST=localhost
DB_PORT=3306
DB_NAME=dashboard_challenge
DB_USER=root
DB_PASSWORD=tu_password

# Configuración de JWT
JWT_SECRET=tu_jwt_secret_
# Configuración del Servidor
PORT=3000
```

### 4. Configurar Base de Datos

#### Opción A: Usando Docker (Recomendado)

```bash
# Levantar la base de datos MySQL
docker-compose up -d db
```

#### Opción B: MySQL Local

1. Instalar MySQL en tu sistema
2. Crear la base de datos:

```sql
CREATE DATABASE dashboard_challenge;
```

### 5. Ejecutar Migraciones

La aplicación está configurada con `synchronize: true` en desarrollo, por lo que las tablas se crearán automáticamente al iniciar la aplicación.

### 6. Poblar Base de Datos con Datos Iniciales

Después de configurar las variables de entorno y la base de datos, ejecuta el siguiente endpoint para crear los widgets por defecto:

```bash
# Opción A: Usando curl
curl -X GET http://localhost:3000/api/v1/dashboards/seed

# Opción B: Usando un cliente HTTP como Postman o Insomnia
GET http://localhost:3000/api/v1/dashboards/seed
```

Este endpoint creará los tipos de widgets predeterminados necesarios para el funcionamiento de la aplicación.

## Ejecutar el Proyecto

### Modo Desarrollo

```bash
# Ejecutar en modo desarrollo con hot reload
npm run start:dev
```

### Modo Producción

```bash
# Compilar el proyecto
npm run build

# Ejecutar en modo producción
npm run start:prod
```

### Otros Comandos Útiles

```bash
# Ejecutar en modo debug
npm run start:debug

# Ejecutar tests unitarios
npm run test

# Ejecutar tests en modo watch
npm run test:watch

# Ejecutar tests e2e
npm run test:e2e

# Generar reporte de cobertura
npm run test:cov

# Linting y formateo
npm run lint
npm run format
```

## Endpoints de la API

### Autenticación

- `POST /api/v1/auth/login` - Iniciar sesión
- `GET /api/v1/auth/status` - Verificar estado de autenticación

### Usuarios

- `POST /api/v1/users` - Crear usuario
- `DELETE /api/v1/users/:id` - Eliminar usuario

### Dashboards

- `GET /api/v1/dashboards` - Obtener dashboards del usuario
- `POST /api/v1/dashboards` - Crear dashboard
- `GET /api/v1/dashboards/:id` - Obtener dashboard específico
- `PATCH /api/v1/dashboards/:id` - Actualizar dashboard
- `DELETE /api/v1/dashboards/:id` - Eliminar dashboard

### Widget Types

- `GET /api/v1/dashboards/widget-types` - Obtener tipos de widgets
- `POST /api/v1/dashboards/widget-types` - Crear tipo de widget

### Componentes

- `POST /api/v1/dashboards/:dashboardId/components` - Crear componentes
- `PATCH /api/v1/dashboards/:dashboardId/components` - Actualizar componentes

### Utilidades

- `GET /api/v1/dashboards/seed` - Poblar base de datos con datos iniciales

## Estructura de la Base de Datos

### Tablas Principales

- **users**: Información de usuarios
- **dashboards**: Dashboards creados por usuarios
- **widget_types**: Tipos de widgets disponibles
- **dashboard_components**: Componentes de cada dashboard

## Configuración de CORS

La aplicación está configurada para aceptar conexiones desde:

- `http://localhost:5173`
- `http://127.0.0.1:5173`

## Desarrollo

### Estructura de Archivos

- **Entidades**: Definidas en `src/*/entities/`
- **DTOs**: Data Transfer Objects en `src/*/dto/`
- **Servicios**: Lógica de negocio en `src/*/*.service.ts`
- **Controladores**: Endpoints de la API en `src/*/*.controller.ts`

### Convenciones

- Usar decoradores de class-validator para validación
- Implementar guards para protección de rutas
- Seguir el patrón de inyección de dependencias de NestJS
- Usar TypeORM para operaciones de base de datos

## Troubleshooting

### Problemas Comunes

1. **Error de conexión a MySQL**:

   - Verificar que MySQL esté ejecutándose
   - Comprobar credenciales en `.env`
   - Asegurar que la base de datos existe

2. **Error de puerto en uso**:

   - Cambiar el puerto en `.env` o `main.ts`
   - Verificar que no haya otra aplicación usando el puerto 3000

3. **Error de dependencias**:
   - Eliminar `node_modules` y `package-lock.json`
   - Ejecutar `npm install` nuevamente
