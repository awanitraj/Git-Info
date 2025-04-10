// Dark mode toggle
const toggleButton = document.getElementById('darkModeToggle');
toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Search functionality
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keyup', () => {
  const filter = searchInput.value.toLowerCase();
  document.querySelectorAll('.command-card').forEach(card => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(filter) ? 'block' : 'none';
  });
});

// Copy to clipboard
document.querySelectorAll('.copy-btn').forEach(button => {
  button.addEventListener('click', e => {
    e.stopPropagation();
    const command = button.parentElement.getAttribute('data-command');
    navigator.clipboard.writeText(command);
    alert(`Copied: ${command}`);
  });
});

// Modal popup
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const closeModal = document.querySelector('.close');

document.querySelectorAll('.command-card').forEach(card => {
  card.addEventListener('click', () => {
    modalTitle.textContent = card.getAttribute('data-command');
    modalDescription.textContent = card.getAttribute('data-description');
    modal.style.display = 'flex';
  });
});

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', e => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});
