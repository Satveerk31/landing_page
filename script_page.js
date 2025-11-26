/* script_page.js — responsible for loading overlay, modal interactions, form check */

// Basic debug log
console.log('script_page.js loaded');

// Helper: show page & hide overlay
function showPage() {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) overlay.style.display = 'none';
  const page = document.getElementById('page');
  if (page) {
    page.style.visibility = 'visible';
    page.removeAttribute('aria-busy');
  }
}

// Hide overlay on full load
window.addEventListener('load', function() {
  console.log('window loaded - showing page');
  showPage();
});

// Fallback: in case load event doesn't fire, show after 1.5s
setTimeout(function() {
  const page = document.getElementById('page');
  if (page && page.style.visibility !== 'visible') {
    console.warn('fallback: showing page after timeout');
    showPage();
  }
}, 1500);

// Modal controls
const modal = document.getElementById('modal');
const modalSend = document.getElementById('modal-send');
const modalClose = document.getElementById('modal-close');

function openModal() {
  if (modal) modal.classList.add('show');
}
function closeModal() {
  if (modal) modal.classList.remove('show');
}

// click outside modal to close
if (modal) {
  modal.addEventListener('click', function(e) {
    if (e.target === modal) closeModal();
  });
}

// Hook CTAs (only if present)
['get-started','primary-cta','signup-cta','start2'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('click', openModal);
});

// Demo button
const demoBtn = document.getElementById('demo');
if (demoBtn) demoBtn.addEventListener('click', function() {
  alert('Demo: paste content into the app to get a one-page summary (mock).');
});

// Simple email check and mock send
if (modalSend) {
  modalSend.addEventListener('click', function() {
    const emailEl = document.getElementById('email');
    const raw = emailEl ? emailEl.value.trim() : '';
    if (!raw || !raw.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }

    // simple UI feedback
    modalSend.disabled = true;
    modalSend.textContent = 'Sending…';

    // Simulate network delay and success (replace with real API POST later)
    setTimeout(function() {
      alert('Magic link sent to ' + raw + ' (demo).');
      modalSend.disabled = false;
      modalSend.textContent = 'Send link';
      closeModal();
    }, 800);
  });
}

// modal close cancel button
if (modalClose) modalClose.addEventListener('click', closeModal);
