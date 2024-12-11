// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, sendSignInLinkToEmail } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA2T2EwknAIj39ZbndBJtrzXahv0ow6jXU",
    authDomain: "voiceactor-d956f.firebaseapp.com",
    projectId: "voiceactor-d956f",
    storageBucket: "voiceactor-d956f.appspot.com",
    messagingSenderId: "264434531012",
    appId: "1:264434531012:web:f83f10c746e392129ee791",
    measurementId: "G-EB5677R90C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Google Sign-In Handler
document.getElementById('googleSignIn').addEventListener('click', async () => {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        
        // Show welcome message with animation
        const main = document.querySelector('main');
        const welcomeMsg = document.createElement('div');
        welcomeMsg.className = 'animate__animated animate__fadeInUp';
        welcomeMsg.style.textAlign = 'center';
        welcomeMsg.style.marginTop = '20px';
        welcomeMsg.innerHTML = `
            <h2>Welcome, ${user.displayName}! 🎉</h2>
            <p>Your email: ${user.email}</p>
            <img src="${user.photoURL}" alt="Profile" style="width: 50px; border-radius: 50%; margin-top: 10px;">
        `;
        main.insertBefore(welcomeMsg, main.firstChild);
        
        // Hide sign-in button
        document.getElementById('googleSignIn').style.display = 'none';
        
    } catch (error) {
        console.error('Error during sign-in:', error);
        alert('Sign-in failed. Please try again.');
    }
});

// Email Sign-In Handler
document.getElementById('splashSignInForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('splashEmailInput').value;
    const password = document.getElementById('splashPasswordInput').value;
    const actionCodeSettings = {
        url: 'http://localhost:8080',
        handleCodeInApp: true,
    };

    try {
        await sendSignInLinkToEmail(auth, email, actionCodeSettings);
        window.localStorage.setItem('emailForSignIn', email);
        // Show particle animation and message
        showParticleAnimation('Check your Gmail for a verification link!');
    } catch (error) {
        console.error('Error sending email sign-in link:', error);
        alert('Failed to send sign-in link. Please try again.');
    }
});

function showParticleAnimation(message) {
    const splashScreen = document.getElementById('splashScreen');
    splashScreen.innerHTML = `<div class="splash-content">
        <h2>${message}</h2>
        <div id="particles-js"></div>
    </div>`;
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
}

// Toggle email sign-in form visibility with animation
document.getElementById('emailSignInButton').addEventListener('click', () => {
    const form = document.getElementById('emailSignInForm');
    if (form.style.display === 'none') {
        form.style.display = 'block';
        form.classList.add('animate__fadeInDown');
    } else {
        form.style.display = 'none';
    }
});

// File Upload Handler
document.getElementById('uploadForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const fileInput = document.getElementById('fileInput');
    const progressBar = document.getElementById('progressBar');
    
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        
        // Simulate upload progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            progressBar.style.width = progress + '%';
            
            if (progress >= 100) {
                clearInterval(interval);
                // Show success message with animation
                const successMsg = document.createElement('div');
                successMsg.className = 'animate__animated animate__bounceIn';
                successMsg.style.textAlign = 'center';
                successMsg.style.marginTop = '20px';
                successMsg.innerHTML = `
                    <h3 style="color: #7f7fd5">Upload Complete! 🎉</h3>
                    <p>Your voice file "${file.name}" has been uploaded successfully.</p>
                `;
                document.getElementById('uploadForm').appendChild(successMsg);
                
                // Reset progress bar
                setTimeout(() => {
                    progressBar.style.width = '0';
                    fileInput.value = '';
                }, 3000);
            }
        }, 100);
    }
});
