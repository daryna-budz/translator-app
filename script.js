const btn = document.getElementById("translate-btn");


async function getTranslation() {
    const textInput = document.getElementById('text-translate').value;
    const selectedLang = document.querySelector('input[name="language"]:checked').value;
    const container = document.querySelector(".app-body-container");

    const response = await fetch('http://localhost:3000/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textInput, targetLang: selectedLang })
    });

    const data = await response.json();
    container.innerHTML = `
        <h2>Original text 👇</h2>
        <div id="original-text">${textInput}</div>
        <h2>Your translation 👇</h2>
        <div id="translated-text">${data.translation}</div>
        <button id="over-btn">Start Over</button>
    `

    document.getElementById("over-btn").addEventListener("click", () => {
        location.reload(); 
    });
}

btn.addEventListener("click", getTranslation);


