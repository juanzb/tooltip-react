import { Tooltip } from "../../src/components/Tooltip";

export default function App() {
    return (
        <div
            style={{
                padding: "40px",
                fontFamily: "sans-serif",
                maxWidth: "1200px",
                margin: "0 auto",
            }}
        >
            <h2
                style={{
                    borderBottom: "2px solid #eee",
                    paddingBottom: "10px",
                    marginBottom: "30px",
                }}
            >
                Documentación: Tooltip React
            </h2>

            {/* Usamos un grid para aprovechar el espacio horizontal y evitar scroll vertical */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "40px",
                }}
            >
                <div>
                    <h3>1. Posiciones (`position`)</h3>
                    <p
                        style={{
                            fontSize: "14px",
                            color: "#555",
                            marginBottom: "15px",
                        }}
                    >
                        Valores aceptados: "top", "bottom", "left", "right".
                    </p>
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "10px",
                        }}
                    >
                        <Tooltip label="Arriba" position="top">
                            <button style={{ padding: "8px" }}>top</button>
                        </Tooltip>
                        <Tooltip label="Abajo" position="bottom">
                            <button style={{ padding: "8px" }}>bottom</button>
                        </Tooltip>
                        <Tooltip label="Izquierda" position="left">
                            <button style={{ padding: "8px" }}>left</button>
                        </Tooltip>
                        <Tooltip label="Derecha" position="right">
                            <button style={{ padding: "8px" }}>right</button>
                        </Tooltip>
                    </div>
                </div>

                <div>
                    <h3>2. Ocultar Flecha (`showArrow`)</h3>
                    <p
                        style={{
                            fontSize: "14px",
                            color: "#555",
                            marginBottom: "15px",
                        }}
                    >
                        Usa <code>showArrow={`{false}`}</code> para remover la
                        flecha del diseño.
                    </p>
                    <Tooltip
                        label="Sin flechita"
                        position="top"
                        showArrow={false}
                    >
                        <button style={{ padding: "8px" }}>
                            Ocultar flecha
                        </button>
                    </Tooltip>
                </div>

                <div>
                    <h3>3. Deshabilitar (`disabled`)</h3>
                    <p
                        style={{
                            fontSize: "14px",
                            color: "#555",
                            marginBottom: "15px",
                        }}
                    >
                        Usa <code>disabled={`{true}`}</code> para evitar que el
                        tooltip se despliegue.
                    </p>
                    <Tooltip label="No me ves" position="top" disabled={true}>
                        <button style={{ padding: "8px" }}>
                            Botón inactivo
                        </button>
                    </Tooltip>
                </div>

                <div>
                    <h3>4. Personalizar Color (`style`)</h3>
                    <p
                        style={{
                            fontSize: "14px",
                            color: "#555",
                            marginBottom: "15px",
                        }}
                    >
                        Cambia colores con{" "}
                        <code>
                            style={`{{ backgroundColor: 'green', ... }}`}
                        </code>
                        .
                    </p>
                    <Tooltip
                        label="Fondo verde"
                        position="top"
                        style={{
                            backgroundColor: "green",
                            borderColor: "green",
                        }}
                    >
                        <button style={{ padding: "8px" }}>
                            Tooltip Verde
                        </button>
                    </Tooltip>
                </div>

                <div>
                    <h3>5. Bordes Redondeados (`style`)</h3>
                    <p
                        style={{
                            fontSize: "14px",
                            color: "#555",
                            marginBottom: "15px",
                        }}
                    >
                        Como es rectangular por defecto, puedes añadir{" "}
                        <code>borderRadius: "8px"</code>.
                    </p>
                    <Tooltip
                        label="Bordes suaves"
                        position="top"
                        style={{ borderRadius: "8px" }}
                    >
                        <button style={{ padding: "8px" }}>
                            Bordes suaves
                        </button>
                    </Tooltip>
                </div>

                <div>
                    <h3>6. Retardo al ocultar (`delayHide`)</h3>
                    <p
                        style={{
                            fontSize: "14px",
                            color: "#555",
                            marginBottom: "15px",
                        }}
                    >
                        Pasa <code>delayHide={`{1000}`}</code> para que tarde 1
                        segundo en desaparecer.
                    </p>
                    <Tooltip
                        label="Me voy lento..."
                        position="top"
                        delayHide={1000}
                    >
                        <button style={{ padding: "8px" }}>
                            Retardo (1000ms)
                        </button>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
}
