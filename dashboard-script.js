import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPItqOyLf6D3RqZbbppV8yvvVjb7XKRwk",
  authDomain: "proplecoin.firebaseapp.com",
  projectId: "proplecoin",
  storageBucket: "proplecoin.appspot.com",
  messagingSenderId: "975447426127",
  appId: "1:975447426127:web:1ecb3dd40c58f6c7aad63a",
  measurementId: "G-5TS5ED159S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('logoutButton');
    const referralLinkElement = document.getElementById('referralLink');
    const copyReferralLinkButton = document.getElementById('copyReferralLink');
    const referralCountElement = document.getElementById('referralCount');

    // Setup logout functionality
    logoutButton.addEventListener('click', () => {
        signOut(auth).then(() => {
            console.log('User signed out');
            window.location.href = 'index.html';
        }).catch((error) => {
            console.error('Sign out error:', error);
        });
    });

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            console.log("User is signed in:", user);
            await setupDashboard(user);
        } else {
            console.log("User is signed out");
            window.location.href = 'index.html';
        }
    });

    async function setupDashboard(user) {
        // Set user name
        const userNameElement = document.querySelector('.user-profile span');
        if (userNameElement) {
            userNameElement.textContent = user.email;
        }

        // Setup referral program
        const userId = user.uid;
        const referralLink = `https://yourwebsite.com/signup?ref=${userId}`;
        if (referralLinkElement) {
            referralLinkElement.textContent = referralLink;
        }

        if (copyReferralLinkButton) {
            copyReferralLinkButton.addEventListener('click', () => {
                navigator.clipboard.writeText(referralLink).then(() => {
                    alert('Referral link copied to clipboard!');
                });
            });
        }

        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            await setDoc(userDocRef, {
                referralCount: 0
            });
        }

        const referralCount = userDoc.data()?.referralCount || 0;
        if (referralCountElement) {
            referralCountElement.textContent = referralCount;
        }

        // Here you can add more functions to populate other parts of the dashboard
        // For example:
        // await loadWalletData(userId);
        // await loadTransactionHistory(userId);
        // setupCharts();
    }

    // Example function to load wallet data
    // async function loadWalletData(userId) {
    //     // Fetch wallet data from Firestore and update the UI
    // }

    // Example function to load transaction history
    // async function loadTransactionHistory(userId) {
    //     // Fetch transaction history from Firestore and update the UI
    // }

    // Example function to setup charts
    // function setupCharts() {
    //     // Use a charting library like Chart.js to create charts
    // }
});

// Function to handle new user signup with referral
export async function signUpWithReferral(newUserId, referrerId) {
    if (referrerId) {
        const referrerDocRef = doc(db, 'users', referrerId);
        await updateDoc(referrerDocRef, {
            referralCount: increment(1)
        });
    }
}
