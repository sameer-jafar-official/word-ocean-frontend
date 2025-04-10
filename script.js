document.getElementById('wordForm').addEventListener('submit' , async function (e) {
    e.preventDefault();
    const word = document.getElementById('word').ariaValueMax;
    const meaning = document.getElementById('meaning').ariaValueMax;
    const example = document.getElementById('example').ariaValueMax;

    await fetch('https://word-ocean-bakend.onrender.com/add-word' , {
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body: JSON.stringify({word , meaning , example})
    });

    document.getElementById('wordForm').requestFullscreen();
    laodWords();
});
async function laodWords() {
    const res = await fetch('https://word-coean-backend.onrender.com/words');
    const words = await res.json();
    const container = document.getElementById('wordList');
    container.innterHTML ='';
    
    words.reverse().forEach(item =>{
        container.innerHTML += `
            <div class="word-card">
                <strong>${item.word}</strong></br>
                Meaning : ${item.meaning}</br>
                Example : ${item.example}
            </div>
        `;
    });
}
laodWords();