// header
const bar = document.getElementById("bar");
const nav = document.getElementById("nav");

bar.addEventListener('click', function() {
    nav.classList.toggle('show');
});

// Close the menu when clicking outside
document.addEventListener('click', function(event) {
    const isClickInsideNav = nav.contains(event.target);
    const isClickOnBar = bar.contains(event.target);

    if (!isClickInsideNav && !isClickOnBar && nav.classList.contains('show')) {
        nav.classList.remove('show');
    }
});

// carousel
const carouselContainer = document.querySelector(".carouselContainer");
const eachCarousel = document.querySelector(".eachCarousel").clientWidth;
const allEachCarousel = document.querySelectorAll(".eachCarousel");
const allIndicator = document.querySelectorAll(".indicator");

const slideCarousel = (index) => {
    for(let x = 0; x<allEachCarousel.length;x++){
        if(x === index){
            allEachCarousel[x].classList.add("eachCarouselBorder")
            allIndicator[x].classList.add("activeIndicator")
        }else{
            allEachCarousel[x].classList.remove("eachCarouselBorder")
            allIndicator[x].classList.remove("activeIndicator")
        }
    }
   carouselContainer.scrollLeft = (index * (eachCarousel + 10))
   console.log(carouselContainer.scrollLeft)
}

document.addEventListener('DOMContentLoaded', function() {
    const bar = document.getElementById('bar');
    const nav = document.getElementById('nav');

    bar.addEventListener('click', function() {
        nav.classList.toggle('show');
    });

    // Close the menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = nav.contains(event.target);
        const isClickOnBar = bar.contains(event.target);

        if (!isClickInsideNav && !isClickOnBar && nav.classList.contains('show')) {
            nav.classList.remove('show');
        }
    });

    const userIcon = document.getElementById('userIcon');
    const authFormContainer = document.getElementById('authFormContainer');
    const closeAuthForm = document.getElementById('closeAuthForm');

    userIcon.addEventListener('click', () => {
        console.log('User icon clicked'); // Add this line for debugging
        authFormContainer.classList.remove('hidden');
    });

    closeAuthForm.addEventListener('click', () => {
        authFormContainer.classList.add('hidden');
    });

    authFormContainer.addEventListener('click', (e) => {
        if (e.target === authFormContainer) {
            authFormContainer.classList.add('hidden');
        }
    });

    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Here you would typically send these credentials to your server for verification
        // This is a simplified example
        if (username === 'user' && password === 'password') {
            // Successful login
            window.location.href = 'dashboard.html';
        } else {
            alert('Invalid credentials');
        }
    });
});
