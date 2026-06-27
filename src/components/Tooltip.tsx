import {
  useState,
  useRef,
  useEffect,
  type ReactNode,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";

import "./Tooltip.css";

export interface ITooltipProps {
  /** The content to display in the tooltip */
  children: ReactNode;
  /** The content to display in the tooltip */
  label: ReactNode;
  /** The position of the tooltip */
  position?: "top" | "bottom" | "left" | "right";
  /** Show the arrow on the tooltip */
  showArrow?: boolean;
  /** Disable the tooltip */
  disabled?: boolean;
  /** Tailwind classes to override defaults */
  className?: string;
  /** Pure CSS inline styles */
  style?: CSSProperties;
  /** Delay in milliseconds before hiding the tooltip */
  delayHide?: number;
  /** Tailwind classes to override defaults */
  containerClassName?: string;
}

export function Tooltip({
  children,
  label,
  position = "top",
  showArrow = true,
  disabled = false,
  className = "",
  style = {},
  containerClassName = "react-tooltip-container",
  delayHide = 0,
}: ITooltipProps) {
  // isMounted: controla si el HTML existe. isVisible: controla la opacidad (0 o 1).
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: -9999, left: -9999 });

  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const unmountTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const TRANSITION_DURATION = 200; // Debe coincidir con los 0.2s del Tooltip.css

  const handleShow = () => {
    if (disabled) return;

    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    if (unmountTimeout.current) clearTimeout(unmountTimeout.current);

    setIsMounted(true);
    // Esperamos 10ms para que React pinte el HTML invisible, y luego activamos el fade-in
    setTimeout(() => {
      setIsVisible(true);
    }, 10);
  };

  const handleHide = () => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    if (unmountTimeout.current) clearTimeout(unmountTimeout.current);

    // Paso 1: Esperar el retardo configurado por el usuario
    hideTimeout.current = setTimeout(() => {
      // Paso 2: Apagar opacidad para que empiece el fade-out de CSS
      setIsVisible(false);

      // Paso 3: Destruir el HTML solo cuando el fade-out haya terminado
      unmountTimeout.current = setTimeout(() => {
        setIsMounted(false);
        setCoords({ top: -9999, left: -9999 }); // Reseteo para la próxima vez
      }, TRANSITION_DURATION);
    }, delayHide);
  };

  useEffect(() => {
    return () => {
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
      if (unmountTimeout.current) clearTimeout(unmountTimeout.current);
    };
  }, []);

  const updatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    let top = 0;
    let left = 0;
    const spacing = 8;

    switch (position) {
      case "top":
        top = triggerRect.top - tooltipRect.height - spacing;
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        break;
      case "bottom":
        top = triggerRect.bottom + spacing;
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        break;
      case "left":
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        left = triggerRect.left - tooltipRect.width - spacing;
        break;
      case "right":
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        left = triggerRect.right + spacing;
        break;
    }

    setCoords({ top, left });
  };

  useEffect(() => {
    if (isMounted && !disabled) {
      updatePosition();
      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);
      return () => {
        window.removeEventListener("scroll", updatePosition, true);
        window.removeEventListener("resize", updatePosition);
      };
    }
  }, [isMounted, disabled, position]);

  useEffect(() => {
    if (disabled) {
      handleHide();
    }
  }, [disabled]);

  const defaultClasses = "react-tooltip-base";
  const arrowClasses = {
    top: "top",
    bottom: "bottom",
    left: "left",
    right: "right",
  };

  return (
    <div
      ref={triggerRef}
      className={containerClassName}
      onMouseEnter={handleShow}
      onMouseLeave={handleHide}
      onFocus={handleShow}
      onBlur={handleHide}
    >
      {children}
      {isMounted &&
        !disabled &&
        createPortal(
          <div
            ref={tooltipRef}
            className={`${defaultClasses} ${className}`}
            style={{
              ...style,
              top: coords.top,
              left: coords.left,
              // Animación: 0 si está calculando coordenadas o si isVisible es false.
              opacity: coords.top === -9999 ? 0 : isVisible ? 1 : 0,
            }}
          >
            {label}
            {showArrow && (
              <div
                className={`react-tooltip-arrow ${arrowClasses[position]}`}
              />
            )}
          </div>,
          document.body,
        )}
    </div>
  );
}
