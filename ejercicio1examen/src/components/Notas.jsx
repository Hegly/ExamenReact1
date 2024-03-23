import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Notas = () => {
  const [primerParcial, setPrimerParcial] = useState('');
  const [segundoParcial, setSegundoParcial] = useState('');
  const [tercerParcial, setTercerParcial] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que las notas sean números entre 0 y la máxima nota de cada parcial
    if (
      isNaN(primerParcial) ||
      isNaN(segundoParcial) ||
      isNaN(tercerParcial) ||
      primerParcial < 0 || primerParcial > 30 ||
      segundoParcial < 0 || segundoParcial > 30 ||
      tercerParcial < 0 || tercerParcial > 40
    ) {
      MySwal.fire({
        title: 'Error',
        text: 'Por favor ingrese notas válidas entre 0 y la máxima nota de cada parcial',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return;
    }

    // Suma
    const sumaNotas = parseFloat(primerParcial) + parseFloat(segundoParcial) + parseFloat(tercerParcial);

    const porcentaje = (sumaNotas / 100) * 100;

    // Mensaje según el porcentaje
    let mensaje;
    if (porcentaje >= 90) {
      mensaje = 'Sobresaliente';
    } else if (porcentaje >= 80) {
      mensaje = 'Muy Bueno';
    } else if (porcentaje >= 60) {
      mensaje = 'Bueno';
    } else {
      mensaje = 'Reprobado';
    }

    // Mostrar el mensaje
    MySwal.fire({
      title: 'Resultado',
      html: `La suma de tus notas es: <b>${sumaNotas}%</b><br/>${mensaje}`,
      icon: 'info',
      confirmButtonText: 'Ok',
    });
  };

  const handleClear = () => {
    setPrimerParcial('');
    setSegundoParcial('');
    setTercerParcial('');
  };

  return (
    <div className="container mt-5">
      <h2>Calculadora de Notas</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="primerParcial" className="form-label fw-bold mt-3">Primer Parcial</label>
          <input
            type="number"
            className="form-control mt-3 shadow p-3"
            id="primerParcial"
            placeholder="Ingrese la nota del primer parcial (máximo 30%)"
            value={primerParcial}
            onChange={(e) => setPrimerParcial(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="segundoParcial" className="form-label fw-bold mt-3">Segundo Parcial</label>
          <input
            type="number"
            className="form-control mt-3 shadow p-3"
            id="segundoParcial"
            placeholder="Ingrese la nota del segundo parcial (máximo 30%)"
            value={segundoParcial}
            onChange={(e) => setSegundoParcial(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tercerParcial" className="form-label fw-bold mt-3">Tercer Parcial</label>
          <input
            type="number"
            className="form-control mt-3 shadow p-3"
            id="tercerParcial"
            placeholder="Ingrese la nota del tercer parcial (máximo 40%)"
            value={tercerParcial}
            onChange={(e) => setTercerParcial(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-outline-success border-3 shadow-sm mt-4 fw-bold">Calcular Nota</button>
        
        <button type="button" className="btn btn-outline-warning border-3 shadow-sm mt-4 fw-bold" onClick={handleClear}>Limpiar campos</button>
      </form>
    </div>
  );
};

export default Notas;
