/* import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore  } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js"; */
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

        // Import the functions you need from the SDKs you need
        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries
      
        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        const firebaseConfig = {
          apiKey: "AIzaSyCnpQf-8OqAlif2OvXpXFBFq_88oh_T5Yk",
          authDomain: "squidgamesimplonghhrjc.firebaseapp.com",
          projectId: "squidgamesimplonghhrjc",
          storageBucket: "squidgamesimplonghhrjc.appspot.com",
          messagingSenderId: "878056195564",
          appId: "1:878056195564:web:5a472572910536dd35acc9",
          measurementId: "G-4YCHBHGY3Q"
        };
      
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const analytics = getFirestore (app);