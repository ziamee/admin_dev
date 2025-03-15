// DOM Elements
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('mainContent');
const toggleSidebar = document.getElementById('toggleSidebar');
const logoutBtn = document.getElementById('logoutBtn');
const userModal = document.getElementById('userModal');
const closeModal = document.getElementById('closeModal');
const modalTitle = document.getElementById('modalTitle');
const userForm = document.getElementById('userForm');
const addUserBtn = document.getElementById('addUserBtn');
const cancelBtn = document.getElementById('cancelBtn');
const userTableBody = document.getElementById('userTableBody');
const deleteModal = document.getElementById('deleteModal');
const closeDeleteModal = document.getElementById('closeDeleteModal');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const pageNumbersContainer = document.getElementById('pageNumbers');

// Stats elements
const totalUsersElement = document.getElementById('totalUsers');
const normalStatusElement = document.getElementById('normalStatus');
const cautionStatusElement = document.getElementById('cautionStatus');
const alertStatusElement = document.getElementById('alertStatus');

// Global variables
let users = [];
let currentPage = 1;
const rowsPerPage = 5;
let userToDelete = null;
let editMode = false;

function updateDateTime() {
    const now = new Date();

    // Format time (HH:MM:SS)
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    // Format date (e.g., March 13, 2025)
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = now.toLocaleDateString(undefined, options);

    // Update the HTML
    document.getElementById('current_time').textContent = formattedTime;
    document.getElementById('current_date').textContent = formattedDate;
}

// Update every second
setInterval(updateDateTime, 1000);

// Run immediately on page load
window.onload = updateDateTime;

function generateRandomId() {
    return Math.floor(1000 + Math.random() * 9000); // Random 4-digit ID
}

function populateUserTable() {
    const users = [
        { id: generateRandomId(), firstName: 'John', middleName: 'A', lastName: 'Smith', bodyTemp: 36.5, alcoholPercent: 0.00, dateTime: '2025-03-08T08:30' },
        { id: generateRandomId(), firstName: 'Jane', middleName: '', lastName: 'Doe', bodyTemp: 37.2, alcoholPercent: 0.01, dateTime: '2025-03-08T09:15' },
        { id: generateRandomId(), firstName: 'Michael', middleName: 'B', lastName: 'Johnson', bodyTemp: 38.1, alcoholPercent: 0.03, dateTime: '2025-03-08T10:00' },
        { id: generateRandomId(), firstName: 'Sarah', middleName: 'C', lastName: 'Williams', bodyTemp: 36.8, alcoholPercent: 0.06, dateTime: '2025-03-08T11:30' },
        { id: generateRandomId(), firstName: 'Robert', middleName: 'D', lastName: 'Brown', bodyTemp: 38.5, alcoholPercent: 0.09, dateTime: '2025-03-08T12:45' },
        { id: generateRandomId(), firstName: 'Emily', middleName: '', lastName: 'Davis', bodyTemp: 39.2, alcoholPercent: 0.12, dateTime: '2025-03-08T13:20' }
        
    ];

    const tableBody = document.getElementById('userTableBody');
    tableBody.innerHTML = ''; // Clear table before adding rows

    users.forEach(user => {
        let status = (user.bodyTemp <= 37.5 && user.alcoholPercent <= 0.02) ? "Pass" : "Fail";
        let statusClass = (status === "Pass") ? "status-pass" : "status-fail";

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.firstName}</td>
            <td>${user.middleName || '-'}</td>
            <td>${user.lastName}</td>
            <td>${user.bodyTemp.toFixed(1)}</td>
            <td>${user.alcoholPercent.toFixed(2)}</td>
            <td>${new Date(user.dateTime).toLocaleString()}</td>
            <td class="${statusClass}">${status}</td>
        `;
        tableBody.appendChild(row);
    });
}
// Populate table when the page loads
window.onload = populateUserTable;

// Toggle sidebar
    toggleSidebar.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    sidebar.classList.toggle('expanded');
    mainContent.classList.toggle('expanded');
});

// Logout functionality
logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm('Are you sure you want to log out?')) {
        alert('Logged out successfully!');
        // In a real app, redirect to login page
         window.location.href = 'http://127.0.0.1:5500/Admin_Login/AdminLogin.html';
    }
});

// Open modal to add new user
addUserBtn.addEventListener('click', () => {
    function openModal(modal) {
        modal.style.display = 'block'; // Show the modal
    }
    function resetForm() {
        document.getElementById('userForm').reset(); // Clears the form inputs
    }
    function closeModal(modal) {
        modal.style.display = 'none'; // Hide the modal
    }
    editMode = false;
    modalTitle.textContent = 'Add New User';
    resetForm();
    openModal(userModal);
    closeModal.addEventListener('click', () => closeModal(userModal));
});

// Close modals
closeModal.addEventListener('click', () => {
    function closeModal(modal) {
        modal.style.display = 'none'; // Hide the modal
    }
    closeModal(userModal)
});

closeDeleteModal.addEventListener('click', () => {
    function closeModal(modal) {
        modal.style.display = 'none'; // Hide the modal
    }
    closeModal(deleteModal)
});

cancelBtn.addEventListener('click', () =>{
    function closeModal(modal) {
        modal.style.display = 'none'; // Hide the modal
    }
     closeModal(userModal)
});

cancelDeleteBtn.addEventListener('click', () => {
    function closeModal(modal) {
        modal.style.display = 'none'; // Hide the modal
    }
    closeModal(deleteModal)
});

// Handle form submission
userForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const userData = {
        firstName: document.getElementById('firstName').value,
        middleName: document.getElementById('middleName').value};
});