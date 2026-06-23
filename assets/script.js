const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach((element) => observer.observe(element));
} else {
  reveals.forEach((element) => element.classList.add('visible'));
}

const dialog = document.querySelector('.lightbox');
const dialogImage = dialog?.querySelector('img');
const closeButton = dialog?.querySelector('.lightbox-close');

document.querySelectorAll('.gallery-item').forEach((item) => {
  item.addEventListener('click', () => {
    const full = item.getAttribute('data-full');
    const img = item.querySelector('img');
    if (!dialog || !dialogImage || !full) return;
    dialogImage.src = full;
    dialogImage.alt = img?.alt ? `${img.alt} expanded` : 'Expanded Hairstylista gallery look';
    if (typeof dialog.showModal === 'function') dialog.showModal();
  });
});

closeButton?.addEventListener('click', () => dialog?.close());
dialog?.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && dialog?.open) dialog.close();
});
