

// Validar datos de la reserva
function validateReservationData(reservationData) {
    return reservationData.name && reservationData.licensePlate;
}

// Actualizar estadísticas en pantalla
function updateStatistics(disponibles, reservados, ocupados) {
    document.getElementById('disponibles').innerText = disponibles;
    document.getElementById('reservados').innerText = reservados;
    document.getElementById('ocupados').innerText = ocupados;
}

// Mostrar alerta rápida
function showAlert(message) {
    alert(message);
}
