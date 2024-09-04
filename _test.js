// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDVaj6AD18wtNqS082VD1NxJrfLWbgL5Ig",
    authDomain: "tsorder-830ef.firebaseapp.com",
    projectId: "tsorder-830ef",
    storageBucket: "tsorder-830ef.appspot.com",
    messagingSenderId: "972694354067",
    appId: "1:972694354067:web:790f69b681d9e71c5c7566",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

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

    const dataRef = ref(db, "shuffledTSMembers");

    get(dataRef)
        .then((snapshot) => {
            const data = snapshot.val();
            if (!data || data.date !== currentDay) {
                // Shuffle the array and store it in Firebase
                const newShuffledArray = shuffleArray([...TS_MEMBERS]);
                set(dataRef, {
                    date: currentDay,
                    members: newShuffledArray,
                });
                displayMembers(newShuffledArray);
            } else {
                displayMembers(data.members);
            }
        })
        .catch((error) => {
            console.error("Error getting data: ", error);
        });
}

// Function to display members
function displayMembers(members) {
    console.log("##", members);
    document.body.innerHTML = `<ol>${members.map((member) => `<li>${member}</li>`).join("")}</ol>`;
}

// Call the function to check and shuffle daily
checkAndShuffleDaily();
