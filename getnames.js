fetch("shuffled_names.json")
    .then((response) => response.json())
    .then((data) => {
        const nameList = document.getElementById("nameList");
        data.forEach((name) => {
            const li = document.createElement("li");
            li.textContent = name;
            nameList.appendChild(li);
        });
    })
    .catch((error) => console.error("Fehler beim Laden der Namensliste:", error));
