document.addEventListener('DOMContentLoaded', function() {
  // Gestione della schermata di caricamento
  window.addEventListener('load', function() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    
    setTimeout(() => {
      loadingOverlay.classList.add('loaded');
      
      loadingOverlay.addEventListener('transitionend', () => {
        loadingOverlay.style.display = 'none';
      });
    }, 1000);
  });

  // Crea il cursore personalizzato
  const cursor = document.createElement('div');
  cursor.classList.add('cursor');
  document.body.appendChild(cursor);

  // Gestione movimento del cursore
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    requestAnimationFrame(() => {
      cursor.style.left = `${mouseX - cursor.offsetWidth / 2}px`; 
      cursor.style.top = `${mouseY - cursor.offsetHeight / 2}px`;
    });
  });

  // Nascondi il cursore quando il mouse esce dalla pagina
  document.addEventListener('mouseleave', () => {
    cursor.style.visibility = 'hidden';
  });

  // Mostra il cursore quando il mouse entra nella pagina
  document.addEventListener('mouseenter', () => {
    cursor.style.visibility = 'visible';
  });

  // Cambia il cursore quando passa sopra i link
  const links = document.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-link');
    });
    
    link.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-link');
    });
  });
});