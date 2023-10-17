import { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ControlPresupuesto = ({
    presupuesto,
    setPresupuesto,
    gastos,
    setGastos,
    setIsValidPresupuesto

}) => {

    const [porcentaje, setPorcentaje] = useState(0)
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
        const totalDisponible = presupuesto - totalGastado;

        // Calcular el porcentaje gastado
        const nuevoPorcenjaje = (
            ((presupuesto - totalDisponible) / presupuesto) *
            100
        ).toFixed(2);

        setGastado(totalGastado)
        setDisponible(totalDisponible)

        setTimeout(() => {
            setPorcentaje(nuevoPorcenjaje)
        }, 1500)
    }, [gastos])

    const handleResetApp = () => {
        const resultado = confirm('Deseas reiniciar presupuesto y gastos?')

        if(resultado){
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }

    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    }

    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? '#d62626' : '#3B82F6',
                        trailColor: '#F5f5f5',
                        textColor: porcentaje > 100 ? '#d62626' : '#3B82F6'
                    })}
                    value={porcentaje}
                    text={`${porcentaje}% Gastado`}
                />
            </div>

            <div className="contenido-presupuesto">
                <button
                    className='reset-app'
                    type='button'
                    onClick={handleResetApp}
                >
                    Resetear App
                </button>
                <p>
                    <span>Presupuesto:</span> {formatearCantidad(presupuesto)}
                </p>
                <p className={`${disponible <= 0 ? 'negativo' : ''}`}>
                    <span>Disponible:</span> {formatearCantidad(disponible)}
                </p>
                <p>
                    <span>Gastado:</span> {formatearCantidad(gastado)}
                </p>
            </div>

        </div>
    )
}

export default ControlPresupuesto