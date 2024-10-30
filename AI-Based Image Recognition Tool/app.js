function uploadImage() {
    const input = document.getElementById("imageInput");
    const file = input.files[0];
    if (!file) {
        alert("Please select an image.");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => displayResults(data))
    .catch(error => console.error("Error:", error));
}

function displayResults(predictions) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    predictions.forEach(prediction => {
        const p = document.createElement("p");
        p.textContent = `${prediction.description} - ${(prediction.score * 100).toFixed(2)}%`;
        resultsDiv.appendChild(p);
    });
}
