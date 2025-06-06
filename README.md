# Sistema de Gestión de Contratos

Aplicación web para la gestión de contratos, desarrollada con Next.js y TypeScript.

## 🚀 Características

- Interfaz de usuario moderna y responsiva
- Gestión de contratos
- Autenticación de usuarios
- Panel de administración
- Diseño con Tailwind CSS y componentes de shadcn/ui

## 🛠️ Requisitos Previos

- Node.js 18.0 o superior
- npm, yarn o pnpm
- Git

## 🚀 Instalación

1. Clona el repositorio:
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd frontend-next
   ```

2. Instala las dependencias:
   ```bash
   npm install
   # o
   yarn install
   # o
   pnpm install
   ```

3. Configura las variables de entorno:
   Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:
   ```
   NEXT_PUBLIC_API_URL=tu_url_de_api
   # Otras variables de entorno necesarias
   ```

4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   # o
   yarn dev
   # o
   pnpm dev
   ```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🏗️ Estructura del Proyecto

```
src/
├── app/               # Rutas de la aplicación (App Router)
├── components/        # Componentes reutilizables
├── lib/               # Utilidades y configuraciones
├── public/            # Archivos estáticos
└── styles/            # Estilos globales
```

## 🛠️ Tecnologías Utilizadas

- [Next.js](https://nextjs.org/) - Framework de React
- [TypeScript](https://www.typescriptlang.org/) - Tipado estático
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [shadcn/ui](https://ui.shadcn.com/) - Componentes de UI
- [Zustand](https://github.com/pmndrs/zustand) - Gestión de estado
- [React Hook Form](https://react-hook-form.com/) - Manejo de formularios
- [Zod](https://zod.dev/) - Validación de esquemas


