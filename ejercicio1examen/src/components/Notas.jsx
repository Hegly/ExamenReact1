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

    // Calcular la suma de las notas
    const sumaNotas = parseFloat(primerParcial) + parseFloat(segundoParcial) + parseFloat(tercerParcial);

    // Calcular el porcentaje de la suma de las notas
    const porcentaje = (sumaNotas / 100) * 100;

    // Determinar el mensaje según el porcentaje
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
    <div className="container mt-3">
      <h2>Calculadora de Notas</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="primerParcial" className="form-label">Primer Parcial (30%)</label>
          <input
            type="number"
            className="form-control"
            id="primerParcial"
            value={primerParcial}
            onChange={(e) => setPrimerParcial(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="segundoParcial" className="form-label">Segundo Parcial (30%)</label>
          <input
            type="number"
            className="form-control"
            id="segundoParcial"
            value={segundoParcial}
            onChange={(e) => setSegundoParcial(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tercerParcial" className="form-label">Tercer Parcial (40%)</label>
          <input
            type="number"
            className="form-control"
            id="tercerParcial"
            value={tercerParcial}
            onChange={(e) => setTercerParcial(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Calcular</button>
        <button type="button" className="btn btn-secondary" onClick={handleClear}>Limpiar</button>
      </form>
    </div>
  );
};

export default Notas;
