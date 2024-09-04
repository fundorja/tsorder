function updateDateTime() {
    const dateElement = document.querySelector(".date");
    const timeElement = document.querySelector(".time");

    const now = new Date();

    // Datum formatieren: Tag.Monat.Jahr
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Monat wird 0-basiert gezählt, daher +1
    const year = now.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;

    // Zeit formatieren: Stunden:Minuten:Sekunden
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    // Datum und Zeit in die entsprechenden Elemente einfügen
    dateElement.textContent = formattedDate;
    timeElement.textContent = formattedTime;
}

// Initiales Update und Intervall für das Zeit-Update setzen
updateDateTime();
setInterval(updateDateTime, 1000);
