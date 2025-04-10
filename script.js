// Instead of localhost, use your Render URL
const BASE_URL = 'https://word-ocean-backend.onrender.com';

// Submit Word Form
document.getElementById('wordForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const word = document.getElementById('word').value;
  const meaning = document.getElementById('meaning').value;
  const example = document.getElementById('example').value;

  const response = await fetch(`${BASE_URL}/add-word`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ word, meaning, example })
  });

  const result = await response.json();
  alert(result.message);
  this.reset();
  loadWords(); // Reload word list after adding
});

// Load words on page load
async function loadWords() {
  const response = await fetch(`${BASE_URL}/words`);
  const words = await response.json();
  const wordList = document.getElementById('wordList');
  wordList.innerHTML = '';

  words.forEach(entry => {
    const card = document.createElement('div');
    card.className = 'word-card';
    card.innerHTML = `
      <h3>${entry.word}</h3>
      <p><strong>Meaning:</strong> ${entry.meaning}</p>
      <p><strong>Example:</strong> ${entry.example}</p>
      <p><em>Added on: ${new Date(entry.createdAt).toLocaleDateString()}</em></p>
    `;
    wordList.appendChild(card);
  });
}

loadWords(); // Initial load
