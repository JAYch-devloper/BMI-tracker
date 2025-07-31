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
