/**
 * ClaraElen — Controlador Principal y Formulario de Reservas Online
 */
import { initNavigation } from './navigation.js';
import { initAnimations } from './animations.js';
import { initMenu } from './menu.js';

const RESTAURANT_WHATSAPP = '51977555420';

function sanitize(str) {
  return String(str || '').replace(/[<>]/g, '').trim();
}

function initReservationForm() {
  const form = document.getElementById('reservationForm');
  const feedback = document.getElementById('reservationFeedback');
  const dateInput = document.getElementById('resDate');

  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    if (!dateInput.value) dateInput.value = today;
  }

  if (!form || !feedback) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      feedback.innerHTML =
        '<div class="alert alert-warning mb-0" role="alert">Completa los datos requeridos para confirmar tu reserva en ClaraElen.</div>';
      return;
    }

    const name = sanitize(document.getElementById('resName').value);
    const phone = sanitize(document.getElementById('resPhone').value);
    const date = sanitize(document.getElementById('resDate').value);
    const time = sanitize(document.getElementById('resTime').value);
    const guests = sanitize(document.getElementById('resGuests').value);
    const zone = sanitize(document.getElementById('resZone').value);
    const notes = sanitize(document.getElementById('resNotes').value);

    const summaryLines = [
      `Hola *ClaraElen*, deseo reservar una mesa:`,
      `• *Nombre:* ${name}`,
      `• *Teléfono:* ${phone}`,
      `• *Fecha:* ${date}`,
      `• *Hora:* ${time}`,
      `• *Comensales:* ${guests}`,
      `• *Ambiente:* ${zone}`,
      notes ? `• *Observación:* ${notes}` : null
    ].filter(Boolean);

    const waUrl = `https://wa.me/${RESTAURANT_WHATSAPP}?text=${encodeURIComponent(summaryLines.join('\n'))}`;

    feedback.innerHTML = '';
    const box = document.createElement('div');
    box.className = 'alert alert-success d-flex flex-column gap-2 mb-0';
    box.setAttribute('role', 'status');

    const title = document.createElement('p');
    title.className = 'mb-1 fw-semibold';
    title.textContent = `¡Solicitud lista, ${name}! Confirma tu reserva de ${guests} el ${date} a las ${time} por WhatsApp.`;

    const btn = document.createElement('a');
    btn.href = waUrl;
    btn.target = '_blank';
    btn.rel = 'noopener noreferrer';
    btn.className = 'btn btn-sm btn-success align-self-start fw-bold';
    btn.textContent = 'Confirmar Reserva en WhatsApp';

    box.appendChild(title);
    box.appendChild(btn);
    feedback.appendChild(box);

    window.open(waUrl, '_blank', 'noopener,noreferrer');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initAnimations();
  initMenu();
  initReservationForm();
});
