// Disabilita il ripristino automatico dello scroll del browser
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Funzioni di gestione del cursore personalizzato
function initCustomCursor() {
  const cursor = document.createElement('div');
  cursor.classList.add('cursor');
  document.body.appendChild(cursor);

  // Movimento del cursore
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    cursor.style.left = `${mouseX - cursor.offsetWidth / 2}px`;
    cursor.style.top = `${mouseY - cursor.offsetHeight / 2}px`;
  });

  // Visibilità del cursore
  document.addEventListener('mouseleave', () => {
    cursor.style.visibility = 'hidden';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.visibility = 'visible';
  });

  // Gestione del cursore sulla mappa
  const gmapsIframe = document.getElementById('gmaps');
  if (gmapsIframe) {
    gmapsIframe.addEventListener('mouseenter', () => {
      cursor.style.visibility = 'hidden';
    });
    gmapsIframe.addEventListener('mouseleave', () => {
      cursor.style.visibility = 'visible';
    });
  }

  // Cambio aspetto del cursore sui link
  const links = document.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-link');
    });
    link.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-link');
    });
  });
}

// Inizializza l'effetto typewriter
function initTypewriter() {
  if (typeof Typewriter !== 'undefined' && document.getElementById('titoloprimo')) {
    const typewriter = new Typewriter('#titoloprimo', {
      loop: false,
      delay: 150,
      cursor: '|'
    });
    typewriter.typeString('NERO DIEDRO').start();
  }
}

// Gestione del loading overlay
function handleLoadingOverlay() {
  const loadingOverlay = document.getElementById('loadingOverlay');
  if (loadingOverlay) {
    setTimeout(() => {
      loadingOverlay.classList.add('loaded');
      
      loadingOverlay.addEventListener('transitionend', () => {
        loadingOverlay.remove();
      });
    }, 1000);
  }
}

// Funzione per mostrare elementi con fade-in
function showElementsWithDelay() {
  const mainHeader = document.getElementById('main-header');
  const titolosecondo = document.getElementById('titolosecondo');
  const freccia = document.getElementById('freccia');

  setTimeout(() => {
    if (mainHeader) mainHeader.style.opacity = 1;
    if (titolosecondo) titolosecondo.style.opacity = 1;
    if (freccia) freccia.style.opacity = 1;
  }, 3800);
}

// Gestione delle immagini random
function initRandomImages() {
  const container = document.getElementById('random-images-container');
  if (!container) return;
  
  // Numero totale di immagini disponibili (random1.jpg, random2.jpg, ecc.)
  const totalImages = 13; // Modifica questo numero in base alle tue immagini disponibili
  const activeImages = new Set();
  const maxActiveImages = 6; // Numero massimo di immagini visualizzate contemporaneamente
  
  // Funzione per generare una posizione casuale
  function getRandomPosition() {
    const containerRect = container.getBoundingClientRect();
    const imgWidth = 400; // Larghezza massima dell'immagine
    const imgHeight = 400; // Altezza approssimativa
    
    const maxX = containerRect.width - imgWidth;
    const maxY = containerRect.height - imgHeight;
    
    return {
      left: Math.floor(Math.random() * maxX) + 'px',
      top: Math.floor(Math.random() * maxY) + 'px'
    };
  }
  
  // Funzione per rimuovere un'immagine dopo un certo tempo
  function removeImage(imgElement) {
    imgElement.style.animation = 'fadeOut 0.5s forwards';
    
    setTimeout(() => {
      if (container.contains(imgElement)) {
        container.removeChild(imgElement);
      }
      activeImages.delete(imgElement);
    }, 500);
  }
  
  // Funzione per aggiungere una nuova immagine
  function addRandomImage() {
    // Rimuovi immagini in eccesso se necessario
    if (activeImages.size >= maxActiveImages) {
      const oldestImage = Array.from(activeImages)[0];
      removeImage(oldestImage);
    }
    
    // Crea nuova immagine
    const imgNumber = Math.floor(Math.random() * totalImages) + 1;
    const img = document.createElement('img');
    img.src = `Immagini/immagini random/random${imgNumber}.jpg`;
    img.alt = `Immagine random ${imgNumber}`;
    img.classList.add('random-image');
    
    // Imposta posizione casuale
    const position = getRandomPosition();
    img.style.left = position.left;
    img.style.top = position.top;
    
    // Aggiungi al container
    container.appendChild(img);
    activeImages.add(img);
    
    // Avvia animazione di comparsa
    setTimeout(() => {
      img.style.animation = 'fadeIn 0.5s forwards';
      img.classList.add('visible');
    }, 10);
    
    // Imposta timer per rimuovere l'immagine
    setTimeout(() => {
      removeImage(img);
    }, 4000); // Durata di visualizzazione 4 secondi
  }
  
  // Avvia l'aggiunta periodica di immagini
  const imageInterval = setInterval(addRandomImage, 500);
  
  // Pulisci quando l'utente lascia la pagina
  window.addEventListener('beforeunload', () => {
    clearInterval(imageInterval);
  });
}

// Gestione al caricamento del DOM
document.addEventListener('DOMContentLoaded', function() {
  // Disabilita lo scroll all'avvio
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';

  // Riabilita lo scroll dopo 3 secondi
  setTimeout(function() {
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
  }, 3000);

  // Scrolla in cima alla pagina
  window.scrollTo(0, 0);

  // Inizializza il typewriter
  initTypewriter();
  
  // Inizializza il cursore personalizzato
  initCustomCursor();
});

// Gestione al caricamento completo della pagina
window.addEventListener('load', () => {
  const mainContent = document.getElementById('main-content');
  if (mainContent) mainContent.style.opacity = 1;
  
  handleLoadingOverlay();
  showElementsWithDelay();
  
  // Inizializza le immagini random
  initRandomImages();
});

