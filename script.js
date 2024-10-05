import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";
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

// Admin login functionality
document.getElementById('admin-login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const password = document.getElementById('admin-password').value;
    
    if (password === 'admin123') {
        document.getElementById('upload-section').style.display = 'block';
        document.getElementById('admin-login-form').style.display = 'none';
    } else {
        alert('Incorrect password!');
    }
});

// Handle file upload in admin panel
document.getElementById('upload-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById('question-paper');
    const file = fileInput.files[0];

    // Here you can add your logic to upload the file (e.g., to Firebase Storage)

    const message = document.getElementById('message');
    message.textContent = 'Question paper uploaded successfully!';
    fileInput.value = ''; // Clear the input
});

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
        document.getElementById('submission-form').reset(); // Clear the form
    } catch (error) {
        console.error('Error submitting:', error);
        alert('Error submitting your answers. Please try again.');
    }
});
