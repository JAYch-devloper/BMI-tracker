// ----------------- BMI Calculator on index.html -----------------
document.addEventListener('DOMContentLoaded', () => {
    const bmiForm = document.getElementById('bmiForm');
    const resultDiv = document.getElementById('result');

    if (bmiForm) {
        bmiForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const height = parseFloat(document.getElementById('height').value);
            const weight = parseFloat(document.getElementById('weight').value);

            if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
                resultDiv.innerHTML = `<div class="alert alert-danger">Please enter valid height and weight.</div>`;
                return;
            }

            const heightInMeters = height / 100;
            const bmi = (weight / (heightInMeters ** 2)).toFixed(2);

            let status = '';
            let statusClass = '';

            if (bmi < 18.5) {
                status = 'Underweight';
                statusClass = 'text-warning';
            } else if (bmi < 25) {
                status = 'Healthy Weight';
                statusClass = 'text-success';
            } else if (bmi < 30) {
                status = 'Overweight';
                statusClass = 'text-warning';
            } else {
                status = 'Obesity';
                statusClass = 'text-danger';
            }

            resultDiv.innerHTML = `
                <div>Your BMI is <strong class="fs-3">${bmi}</strong>.</div>
                <div>This is considered <strong class="${statusClass}">${status}</strong>.</div>
            `;
        });
    }
});

// ----------------- Sign Up with PHP/MySQL -----------------
document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = document.getElementById('modalSignupUsername').value;
            const email = document.getElementById('modalSignupEmail').value;
            const password = document.getElementById('modalSignupPassword').value;

            fetch('signup.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
            })
            .then(res => res.text())
            .then(data => {
                if (data.trim() === 'success') {
                    alert("Signup successful! Redirecting...");
                    window.location.href = 'track.html';
                } else {
                    alert("Signup failed. Try again.");
                }
            });
        });
    }
});

// ----------------- Login with PHP/MySQL -----------------
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#loginModal form');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('modalLoginEmail').value;
            const password = document.getElementById('modalLoginPassword').value;

            fetch('login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
            })
            .then(res => res.text())
            .then(data => {
                if (data.trim() === 'success') {
                    alert("Login successful! Redirecting...");
                    window.location.href = 'track.html';
                } else {
                    alert("Invalid login credentials.");
                }
            });
        });
    }
});

// ----------------- BMI Tracker on track.html -----------------
document.addEventListener('DOMContentLoaded', () => {
    const bmiForm = document.getElementById('bmiTrackerForm');
    const resultDiv = document.getElementById('trackerResult');
    const historyTableBody = document.getElementById('historyTableBody');
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');
    const chartCanvas = document.getElementById('bmiChart');
    let bmiChart;

    if (!bmiForm || !chartCanvas) return;

    let bmiHistory = JSON.parse(localStorage.getItem('bmiHistory')) || [];

    const calculateBmi = (weight, height) => {
        const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
        let status = '';
        if (bmi < 18.5) status = 'Underweight';
        else if (bmi < 25) status = 'Healthy';
        else if (bmi < 30) status = 'Overweight';
        else status = 'Obesity';
        return { bmi, status };
    };

    const renderTable = () => {
        historyTableBody.innerHTML = '';
        if (bmiHistory.length === 0) {
            historyTableBody.innerHTML = '<tr><td colspan="3" class="text-center text-muted">No history yet.</td></tr>';
            return;
        }

        bmiHistory.forEach(entry => {
            const statusClass = entry.status === 'Healthy' ? 'success' :
                               (entry.status === 'Underweight' ? 'primary' : 'warning');
            const row = `<tr>
                <td>${entry.date}</td>
                <td>${entry.bmi}</td>
                <td><span class="badge bg-${statusClass}">${entry.status}</span></td>
            </tr>`;
            historyTableBody.insertAdjacentHTML('beforeend', row);
        });
    };

    const renderChart = () => {
        if (bmiChart) bmiChart.destroy();
        const labels = bmiHistory.map(entry => entry.date);
        const data = bmiHistory.map(entry => entry.bmi);

        bmiChart = new Chart(chartCanvas, {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    label: 'Your BMI Over Time',
                    data,
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#2563eb',
                    pointHoverRadius: 7,
                    pointHoverBackgroundColor: '#2563eb',
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { grid: { drawBorder: false } },
                    x: { grid: { display: false } }
                }
            }
        });
    };

    bmiForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const height = parseFloat(document.getElementById('height').value);
        const weight = parseFloat(document.getElementById('weight').value);

        if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
            resultDiv.innerHTML = `<div class="alert alert-danger mt-3">Please enter valid data.</div>`;
            return;
        }

        const { bmi, status } = calculateBmi(weight, height);
        const date = new Date().toLocaleDateString('en-GB');

        bmiHistory.push({ date, bmi, status });
        localStorage.setItem('bmiHistory', JSON.stringify(bmiHistory));

        resultDiv.innerHTML = `<div class="alert alert-success mt-3">New entry added: BMI of ${bmi}.</div>`;
        bmiForm.reset();
        renderTable();
        renderChart();
    });

    clearHistoryBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all history?')) {
            bmiHistory = [];
            localStorage.removeItem('bmiHistory');
            renderTable();
            renderChart();
            resultDiv.innerHTML = `<div class="alert alert-info mt-3">Your history has been cleared.</div>`;
        }
    });

    // Initial render
    renderTable();
    renderChart();
});
