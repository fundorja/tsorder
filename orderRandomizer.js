// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const TS_MEMBERS = ["Christian", "Niko", "Olga", "Elisa", "Krystyna", "Iryna Z", "Stefanos", "Julia", "Hasan", "Thomas", "Iryna P", "Anna", "Robert"];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function checkAndShuffleDaily() {
    const now = new Date();
    const currentDay = now.toISOString().split("T")[0]; // Current date in YYYY-MM-DD format

    const db = firebase.database();
    const ref = db.ref("shuffledTSMembers");

    ref.once("value").then((snapshot) => {
        const data = snapshot.val();
        if (!data || data.date !== currentDay) {
            // Shuffle the array and store it in Firebase
            const newShuffledArray = shuffleArray([...TS_MEMBERS]);
            ref.set({
                date: currentDay,
                members: newShuffledArray,
            });
            displayMembers(newShuffledArray);
        } else {
            displayMembers(data.members);
        }
    });
}

// Function to display members
function displayMembers(members) {
    console.log("##", members);
    document.body.innerHTML = `<ol>${members.map((member) => `<li>${member}</li>`).join("")}</ol>`;
}
