const { GoogleSpreadsheet } = require("google-spreadsheet");
const creds = require("./path/to/your/service/account/json/file.json"); // Pfad zu deiner Service-Account-JSON-Datei

async function accessSpreadsheet() {
    // Spreadsheet-ID aus der URL der Tabelle entnehmen
    const doc = new GoogleSpreadsheet("your-spreadsheet-id");

    // Authentifizieren mit den Service-Account-Credentials
    await doc.useServiceAccountAuth(creds);

    // Lese Informationen über das Dokument
    await doc.loadInfo();
    console.log(`Title: ${doc.title}`);

    // Greife auf das erste Blatt zu
    const sheet = doc.sheetsByIndex[0];
    console.log(`Sheet title: ${sheet.title}`);
    console.log(`Rows: ${sheet.rowCount}`);

    // Lese Zeilen
    const rows = await sheet.getRows();
    rows.forEach((row) => {
        console.log(row._rawData); // Alle Spalten ausgeben
    });

    // Füge eine neue Zeile hinzu
    await sheet.addRow({ Column1: "Value1", Column2: "Value2" });

    // Aktualisiere eine bestehende Zeile
    rows[0].Column1 = "Updated Value";
    await rows[0].save();

    // Lösche eine Zeile
    await rows[0].delete();
}

accessSpreadsheet().catch(console.error);
