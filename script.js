import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD4uQXIDtODwV2...N1H8iBzU",
    authDomain: "student-insight-hub.firebaseapp.com",
    projectId: "student-insight-hub",
    storageBucket: "student-insight-hub.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdefg12345",
    measurementId: "G-N1H8iBzU"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Handle submission in dashboard
document.getElementById('submission-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('student-name').value;
    const code = document.getElementById('unique-code').value;
    const answers = document.getElementById('answers').value;

    try {
        await addDoc(collection(db, 'submissions'), {
            name,
            code,
            answers,
            timestamp: new Date()
        });
        alert('Submission successful!');
    } catch (error) {
        console.error('Error submitting:', error);
        alert('Error submitting your answers. Please try again.');
    }
});

// Fetch submissions in admin panel
async function fetchSubmissions() {
    const querySnapshot = await getDocs(collection(db, 'submissions'));
    const submissionsContainer = document.getElementById('submissions-container');
    submissionsContainer.innerHTML = '';

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        submissionsContainer.innerHTML += `
            <div>
                <h3>${data.name} (Code: ${data.code})</h3>
                <p>${data.answers}</p>
                <p>${data.timestamp.toDate()}</p>
            </div>
        `;
    });
}

// Call fetchSubmissions in admin panel
if (document.getElementById('submissions-container')) {
    fetchSubmissions();
}
