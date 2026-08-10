# @juanzbdev/tooltip-react

Un componente de Tooltip para React moderno, ligero, fluido y altamente personalizable.

Desarrollado con las mejores prácticas: animaciones fluidas (fade-in / fade-out), acoplamiento perfecto de bordes, y soporte total para Tailwind CSS o CSS puro.

## Características

- **Animaciones fluidas**: Transiciones suaves de entrada y salida gracias al manejo avanzado del ciclo de vida en React.
- **Bordes Dinámicos**: La flecha del tooltip hereda dinámicamente el grosor y color del borde, fusionándose como una sola pieza (gracias al uso inteligente de `drop-shadow`).
- **Agnóstico al CSS**: Estilos neutros por defecto. Úsalo como lienzo en blanco con Tailwind CSS o tus propios estilos en línea.
- **Portales de React**: Renderizado seguro fuera de la jerarquía del DOM para evitar problemas con `overflow: hidden` o `z-index`.
- **Cero dependencias pesadas**: Construido nativamente sobre React.

## Instalación

DEMO: -->> https://tooltip-react-jz.vercel.app

Puedes instalarlo utilizando tu gestor de paquetes favorito:

```bash
npm install @juanzbdev/tooltip-react
```

```bash
pnpm add @juanzbdev/tooltip-react
```

```bash
yarn add @juanzbdev/tooltip-react
```

## Uso Básico

1. Importa el componente (¡los estilos se inyectan automáticamente!).
2. Envuelve el elemento que disparará el tooltip.

```tsx
import { Tooltip } from "@juanzbdev/tooltip-react";

export default function App() {
    return (
        <div style={{ padding: "50px" }}>
            <Tooltip label="¡Hola, soy un tooltip!" position="top">
                <button>Pasa el mouse sobre mí</button>
            </Tooltip>
        </div>
    );
}
```

## Personalización (Tailwind / CSS)

El componente está diseñado para ser moldeable. Puedes sobreescribir completamente su apariencia usando la prop `className` (ideal para **Tailwind CSS**) o la prop `style`.

```tsx
<Tooltip
    label="Tooltip verde y redondeado"
    position="right"
    style={{
        backgroundColor: "#10b981",
        borderColor: "#059669",
        borderRadius: "12px",
    }}
>
    <button>Hover me</button>
</Tooltip>
```

_¡Magia!: La flecha heredará automáticamente el color de fondo y del borde, adaptándose perfectamente a tu diseño sin que tengas que hacer trucos adicionales._

## Props (API)

| Prop                 | Tipo                                     | Por defecto                 | Descripción                                                                                   |
| -------------------- | ---------------------------------------- | --------------------------- | --------------------------------------------------------------------------------------------- |
| `label` **(\*)**     | `ReactNode`                              | `-`                         | El texto o componente que se mostrará dentro del tooltip.                                     |
| `children` **(\*)**  | `ReactNode`                              | `-`                         | El elemento (ej. botón) sobre el cual se hará hover para mostrar el tooltip.                  |
| `position`           | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'`                     | La dirección hacia donde aparecerá el tooltip.                                                |
| `showArrow`          | `boolean`                                | `true`                      | Muestra u oculta la flecha del tooltip.                                                       |
| `disabled`           | `boolean`                                | `false`                     | Desactiva temporalmente el tooltip para que no se muestre al hacer hover.                     |
| `delayHide`          | `number`                                 | `0`                         | Retardo en milisegundos (ms) que el tooltip esperará antes de desaparecer al quitar el mouse. |
| `className`          | `string`                                 | `""`                        | Clases CSS adicionales (ej. Tailwind) para la caja del tooltip.                               |
| `style`              | `CSSProperties`                          | `{}`                        | Estilos en línea para personalizar la caja del tooltip.                                       |
| `containerClassName` | `string`                                 | `"react-tooltip-container"` | Clase CSS para el contenedor que envuelve a los `children`.                                   |

## Licencia

MIT
