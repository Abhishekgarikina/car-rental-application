// LARGE CAR DATASET
const cars = [
    { id: 1, name: "Toyota Camry", price: 2000, type: "Sedan", fuel: "Petrol" },
    { id: 2, name: "Honda City", price: 2500, type: "Sedan", fuel: "Petrol" },
    { id: 3, name: "Hyundai Creta", price: 3000, type: "SUV", fuel: "Diesel" },
    { id: 4, name: "Kia Seltos", price: 3200, type: "SUV", fuel: "Petrol" },
    { id: 5, name: "Mahindra Thar", price: 4000, type: "SUV", fuel: "Diesel" },
    { id: 6, name: "Swift", price: 1500, type: "Hatchback", fuel: "Petrol" },
    { id: 7, name: "Baleno", price: 1700, type: "Hatchback", fuel: "Petrol" },
    { id: 8, name: "Innova", price: 4500, type: "MPV", fuel: "Diesel" }
];

// LOGIN
function login() {
    let email = emailInput();
    let password = passwordInput();
    let role = roleInput();

    let user = JSON.parse(localStorage.getItem(email));

    if (user && user.password === password && user.role === role) {
        localStorage.setItem("currentUser", email);
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid credentials");
    }
}

// SIGNUP
function signup() {
    let email = emailInput();
    let password = passwordInput();
    let role = roleInput();

    if (!email || !password) {
        alert("Fill all fields");
        return;
    }

    let user = { email, password, role, bookings: [] };
    localStorage.setItem(email, JSON.stringify(user));

    alert("Signup successful");
}

// HELPERS
function emailInput() {
    return document.getElementById("email").value;
}
function passwordInput() {
    return document.getElementById("password").value;
}
function roleInput() {
    return document.getElementById("role").value;
}

// DASHBOARD LOAD
if (window.location.pathname.includes("dashboard.html")) {
    loadCars(cars);
    loadBookings();
}

// DISPLAY CARS
function loadCars(carList) {
    let container = document.getElementById("cars");
    container.innerHTML = "";

    carList.forEach(car => {
        container.innerHTML += `
        <div class="card">
            <h3>${car.name}</h3>
            <p>₹${car.price}/day</p>
            <p>${car.type} | ${car.fuel}</p>
            <button onclick="bookCar(${car.id})">Book</button>
        </div>`;
    });
}

// SEARCH
function searchCars() {
    let query = document.getElementById("search").value.toLowerCase();
    let filtered = cars.filter(car => car.name.toLowerCase().includes(query));
    loadCars(filtered);
}

// BOOKING
function bookCar(id) {
    let start = prompt("Enter Start Date (YYYY-MM-DD)");
    let end = prompt("Enter End Date (YYYY-MM-DD)");

    if (!start || !end) return;

    let days = (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24);
    let car = cars.find(c => c.id === id);

    let total = days * car.price;

    let email = localStorage.getItem("currentUser");
    let user = JSON.parse(localStorage.getItem(email));

    user.bookings.push({
        car: car.name,
        start,
        end,
        total,
        status: "Confirmed"
    });

    localStorage.setItem(email, JSON.stringify(user));

    alert(`Booking Confirmed! Total: ₹${total} (Email Sent)`);

    loadBookings();
}

// SHOW BOOKINGS
function loadBookings() {
    let email = localStorage.getItem("currentUser");
    let user = JSON.parse(localStorage.getItem(email));

    let container = document.getElementById("bookings");
    container.innerHTML = "";

    user.bookings.forEach(b => {
        container.innerHTML += `
        <div class="card">
            <p>${b.car}</p>
            <p>${b.start} to ${b.end}</p>
            <p>Total: ₹${b.total}</p>
            <p>Status: ${b.status}</p>
        </div>`;
    });
}

// LOGOUT
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}
