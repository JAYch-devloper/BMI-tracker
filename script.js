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

