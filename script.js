let livelloAttuale = 1;
let punteggioTotale = 0;
let punteggioMensile = 0;
let punteggioGiornaliero = 0;
let punteggioLivelli = [380, 760, 1140, 1520];
let attivitaCompletate = [];

// Elenco delle ricompense in base ai punteggi
const ricompense = [
  { punteggio: 50, descrizione: 'bubble the' },
  { punteggio: 100, descrizione: 'massaggio rilassante' },
  { punteggio: 150, descrizione: 'Un biglietto per un evento culturale (es. museo, mostra)' },
  { punteggio: 200, descrizione: 'Un accessorio per il tuo hobby preferito' },
  { punteggio: 234, descrizione: 'Un buono per una lezione di surf o di skateboard' },
  { punteggio: 300, descrizione: 'Una serata con gli amici' },
  { punteggio: 380, descrizione: 'Un’uscita per un’attività sportiva o di gruppo (es. bowling, laser tag)' },
  { punteggio: 468, descrizione: 'Un kit per la preparazione di cocktail a casa' },
  { punteggio: 500, descrizione: 'Un gadget tecnologico' },
  { punteggio: 600, descrizione: 'Un giorno di relax in una spa urbana' },
  { punteggio: 702, descrizione: 'Un’esperienza di volo in parapendio o paracadutismo indoor' },
  { punteggio: 750, descrizione: 'Un’esperienza avventurosa (es. escape room, parco avventura)' },
  { punteggio: 936, descrizione: 'Un viaggio in una destinazione esotica o un’avventura all’aria aperta' },
  { punteggio: 1140, descrizione: 'Un gadget tecnologico avanzato' },
  { punteggio: 1520, descrizione: 'Un viaggio di lusso o un’esperienza esclusiva' }
];

// Funzione per salvare i dati nel localStorage
function salvaDati() {
    localStorage.setItem('punteggioTotale', punteggioTotale);
    localStorage.setItem('livelloAttuale', livelloAttuale);
    localStorage.setItem('punteggioMensile', punteggioMensile);
    localStorage.setItem('punteggioGiornaliero', punteggioGiornaliero);
}

// Funzione per caricare i dati dal localStorage
function caricaDati() {
    punteggioTotale = parseInt(localStorage.getItem('punteggioTotale')) || 0;
    livelloAttuale = parseInt(localStorage.getItem('livelloAttuale')) || 1;
    punteggioMensile = parseInt(localStorage.getItem('punteggioMensile')) || 0;
    punteggioGiornaliero = parseInt(localStorage.getItem('punteggioGiornaliero')) || 0;

    // Aggiorna l'interfaccia con i dati caricati
    document.getElementById('punteggioTotale').textContent = punteggioTotale;
    document.getElementById('livelloAttuale').textContent = livelloAttuale;
    document.getElementById('punteggioMensile').textContent = punteggioMensile;
    document.getElementById('punteggioGiornaliero').textContent = punteggioGiornaliero;

    aggiornaRicompense();
    verificaLivello();
}

// Funzione per aggiornare i punteggi basata sui punti assegnati alle attività
function aggiornaPunteggio(punti) {
  punteggioTotale += punti;
  punteggioGiornaliero += punti;
  punteggioMensile += punti;

  document.getElementById('punteggioTotale').textContent = punteggioTotale;
  document.getElementById('punteggioMensile').textContent = punteggioMensile;
  document.getElementById('punteggioGiornaliero').textContent = punteggioGiornaliero;

  verificaLivello();
  aggiornaRicompense();

  // Salva i dati aggiornati nel localStorage
  salvaDati();
}

// Funzione per controllare il livello e avanzare quando raggiungi i punti necessari
function verificaLivello() {
  if (punteggioTotale >= punteggioLivelli[livelloAttuale - 1]) {
    livelloAttuale++;
    document.getElementById('livelloAttuale').textContent = livelloAttuale;
    document.getElementById('prossimoObiettivo').textContent = punteggioLivelli[livelloAttuale - 1];
    salvaDati();  // Salva il livello aggiornato
  }
}

// Funzione per passare da una pagina all'altra
document.getElementById('dashboardBtn').addEventListener('click', () => switchPage('dashboard'));
document.getElementById('segnaAttivitaBtn').addEventListener('click', () => switchPage('segnaAttivita'));
document.getElementById('attivitaCompletateBtn').addEventListener('click', () => switchPage('attivitaCompletate'));

function switchPage(pageId) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => page.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
}

// Funzione per trovare la ricompensa attuale e la prossima
function aggiornaRicompense() {
  let ricompensaAttuale = "Nessuna";
  let prossimaRicompensa = ricompense[0].descrizione + " (" + ricompense[0].punteggio + " punti)";
  
  for (let i = 0; i < ricompense.length; i++) {
    if (punteggioTotale >= ricompense[i].punteggio) {
      ricompensaAttuale = ricompense[i].descrizione;
      if (i + 1 < ricompense.length) {
        prossimaRicompensa = ricompense[i + 1].descrizione + " (" + ricompense[i + 1].punteggio + " punti)";
      } else {
        prossimaRicompensa = "Nessuna ricompensa successiva";
      }
    }
  }

  document.getElementById('ricompensaAttuale').textContent = ricompensaAttuale;
  document.getElementById('prossimaRicompensa').textContent = prossimaRicompensa;
}

// Funzione per aggiungere un'attività completata alla lista e visualizzarla
function aggiungiAttivitaCompletata(attivita, punteggio) {
  const lista = document.getElementById('listaAttivitaCompletate');
  const li = document.createElement('li');
  li.textContent = `${attivita}: ${punteggio} punti`;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Elimina';
  deleteBtn.classList.add('deleteBtn');
  deleteBtn.addEventListener('click', function() {
    rimuoviAttivitaCompletata(li, punteggio);
  });

  li.appendChild(deleteBtn);
  lista.appendChild(li);

  attivitaCompletate.push({ attivita, punteggio });
}

// Funzione per rimuovere un'attività completata e aggiornare i punteggi
function rimuoviAttivitaCompletata(elemento, punteggio) {
  elemento.remove(); // Rimuove l'elemento dalla lista visivamente
  aggiornaPunteggio(-punteggio); // Sottrae il punteggio dall'attuale
}

// Reset del punteggio giornaliero a mezzanotte
function resetPunteggioGiornaliero() {
  punteggioGiornaliero = 0;
  document.getElementById('punteggioGiornaliero').textContent = punteggioGiornaliero;
  salvaDati(); // Salva il reset giornaliero
}

// Esegui reset a mezzanotte
setInterval(() => {
  const now = new Date();
  if (now.getHours() === 0 && now.getMinutes() === 0) {
    resetPunteggioGiornaliero();
  }
}, 60000);

// Carica i dati dal localStorage quando la pagina viene caricata
window.onload = function() {
    caricaDati(); // Carica i dati salvati nel localStorage

    // Associa eventi click solo dopo il caricamento completo della pagina
    const addPunteggioBtns = document.querySelectorAll('.addPunteggio');
    addPunteggioBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const input = this.previousElementSibling;
        const punteggio = parseInt(input.value);
        if (!isNaN(punteggio) && punteggio >= -5 && punteggio <= 5) {
          const idAttivita = this.getAttribute('data-id');
          aggiornaPunteggio(punteggio);
          aggiungiAttivitaCompletata(idAttivita, punteggio);
          input.value = ''; // Resetta l'input dopo aver aggiunto
        }
      });
    });
};
