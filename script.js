

document.addEventListener('DOMContentLoaded', () => {
    const bmiForm = document.getElementById('bmiForm');
    const resultDiv = document.getElementById('result');

    bmiForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent form from submitting the traditional way

        const heightInput = document.getElementById('height');
        const weightInput = document.getElementById('weight');

        // Get values and convert to numbers
        const height = parseFloat(heightInput.value);
        const weight = parseFloat(weightInput.value);

        // Basic validation
        if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
            resultDiv.innerHTML = `<div class="alert alert-danger">Please enter valid height and weight.</div>`;
            return;
        }

        // Calculate BMI
        // BMI = weight (kg) / (height (m))^2
        const heightInMeters = height / 100;
        const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);

        // Determine weight status
        let status = '';
        let statusClass = '';

        if (bmi < 18.5) {
            status = 'Underweight';
            statusClass = 'text-warning';
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            status = 'Healthy Weight';
            statusClass = 'text-success';
        } else if (bmi >= 25 && bmi <= 29.9) {
            status = 'Overweight';
            statusClass = 'text-warning';
        } else {
            status = 'Obesity';
            statusClass = 'text-danger';
        }

        // Display the result
        resultDiv.innerHTML = `
            Your BMI is <strong class="fs-3">${bmi}</strong>.
            <br>
            This is considered <strong class="${statusClass}">${status}</strong>.
        `;
    });
});
