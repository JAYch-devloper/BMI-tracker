document.addEventListener('DOMContentLoaded', () => {
    const bmiForm = document.getElementById('bmiForm');
    const resultDiv = document.getElementById('result');

    bmiForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const height = parseFloat(document.getElementById('height').value);
        const weight = parseFloat(document.getElementById('weight').value);

        // Validate inputs
        if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
            resultDiv.innerHTML = `<div class="alert alert-danger">Please enter valid height and weight.</div>`;
            return;
        }

        // Calculate BMI
        const heightInMeters = height / 100;
        const bmi = (weight / (heightInMeters ** 2)).toFixed(2);

        // Determine status and styling
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

        // Show result
        resultDiv.innerHTML = `
            <div>Your BMI is <strong class="fs-3">${bmi}</strong>.</div>
            <div>This is considered <strong class="${statusClass}">${status}</strong>.</div>
        `;
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = document.getElementById('modalSignupUsername').value;
            const email = document.getElementById('modalSignupEmail').value;

            // Save basic info in localStorage
            localStorage.setItem('user', JSON.stringify({ username, email }));

            // Redirect to chart page (make sure this file exists)
            window.location.href = 'track.html';
        });
    }
});

// track page
const bmiHistory = JSON.parse(localStorage.getItem('bmiHistory')) || [];

        const labels = bmiHistory.map(entry => entry.date);
        const data = bmiHistory.map(entry => entry.bmi);

        const ctx = document.getElementById('bmiChart').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'BMI Over Time',
                    data: data,
                    fill: false,
                    borderColor: 'rgba(37, 99, 235, 1)',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    tension: 0.3,
                    pointRadius: 5,
                    pointHoverRadius: 8,
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: context => `BMI: ${context.raw}`
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'BMI Value'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    }
                }
            }
        });
// --- BMI Tracker Script ---

document.addEventListener('DOMContentLoaded', () => {
    // Check if the tracker form exists on the page before running the script
    if (document.getElementById('bmiTrackerForm')) {
        const bmiForm = document.getElementById('bmiTrackerForm');
        const resultDiv = document.getElementById('trackerResult');
        const historyTableBody = document.getElementById('historyTableBody');
        const clearHistoryBtn = document.getElementById('clearHistoryBtn');
        const chartCanvas = document.getElementById('bmiChart');
        let bmiChart;

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

        const renderAll = () => {
            renderTable();
            renderChart();
        };

        const renderTable = () => {
            historyTableBody.innerHTML = '';
            if (bmiHistory.length === 0) {
                historyTableBody.innerHTML = '<tr><td colspan="3" class="text-center text-muted">No history yet.</td></tr>';
                return;
            }
            bmiHistory.forEach(entry => {
                const statusClass = entry.status === 'Healthy' ? 'success' : (entry.status === 'Underweight' ? 'primary' : 'warning');
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
            const primaryColor = '#2563eb';
            const primaryColorTransparent = 'rgba(37, 99, 235, 0.1)';

            bmiChart = new Chart(chartCanvas, {
                type: 'line',
                data: {
                    labels,
                    datasets: [{
                        label: 'Your BMI Over Time',
                        data,
                        borderColor: primaryColor,
                        backgroundColor: primaryColorTransparent,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: primaryColor,
                        pointHoverRadius: 7,
                        pointHoverBackgroundColor: primaryColor,
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
            renderAll();
        });

        clearHistoryBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all history?')) {
                bmiHistory = [];
                localStorage.removeItem('bmiHistory');
                renderAll();
                resultDiv.innerHTML = `<div class="alert alert-info mt-3">Your history has been cleared.</div>`;
            }
        });

        renderAll();
    }
});
