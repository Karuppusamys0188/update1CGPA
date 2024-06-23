

function generateCourseInputs() {
    const numCourses = document.getElementById('num-courses').value;
    const coursesContainer = document.getElementById('courses-container');
    coursesContainer.innerHTML = '';

    if (numCourses < 1) {
        document.getElementById('error').innerText = 'Please enter a valid number of courses (at least 1).';
        document.getElementById('error').style.display = 'block';
        return;
    }

    for (let i = 1; i <= numCourses; i++) {
        const courseDiv = document.createElement('div');
        courseDiv.classList.add('course-input-row');
        courseDiv.innerHTML = `
            <input type="number" step="0.01" class="input-field" placeholder="Credits" id="credits${i}" min="0">
            <input type="text" class="input-field" placeholder="Grade" id="grade${i}">
        `;
        coursesContainer.appendChild(courseDiv);
    }
    document.getElementById('course-inputs').style.display = 'none';
    document.getElementById('calculate-button').style.display = 'inline-block';
    document.getElementById('result').style.display = 'none';
    document.getElementById('error').style.display = 'none';
}

function calculateGPA() {
    const numCourses = document.getElementById('num-courses').value;
    let totalPoints = 0;
    let totalCredits = 0;
    const gradePoints = {
        'S': 10.0,
        'A': 9.0,
        'B': 8.0,
        'C': 7.0,
        'D': 6.0,
        'E': 5.0,
        'F': 0.0
    };

    for (let i = 1; i <= numCourses; i++) {
        const grade = document.getElementById(`grade${i}`).value.toUpperCase();
        const credits = parseFloat(document.getElementById(`credits${i}`).value);

        if (isNaN(credits) || credits <= 0) {
            document.getElementById('result').style.display = 'none';
            document.getElementById('error').innerText = `Invalid credits entered for Course ${i}. Please enter a valid positive number.`;
            document.getElementById('error').style.display = 'block';
            return;
        }
        if (grade in gradePoints) {
            totalPoints += gradePoints[grade] * credits;
            totalCredits += credits;
        } else {
            document.getElementById('result').style.display = 'none';
            document.getElementById('error').innerText = `Invalid grade entered for Course ${i}. Please enter a valid grade (S, A, B, C, D, E, F).`;
            document.getElementById('error').style.display = 'block';
            return;
        }
    }

    const gpa = totalPoints / totalCredits;
    let message = '';

    if (gpa >= 9) {
        message = `🎉 Arrey, 9 pointer! 🎉`;
    } else if (gpa >= 8) {
        message = `👍 Good job! 👍`;
    } else if (gpa >= 7) {
        message = `🙂 Not bad! 🙂`;
    } else if (gpa >= 6) {
        message = `😕 Needs improvement 😕`;
    } else {
        message = `😞 Better luck next time 😞`;
    }

    document.getElementById('result').innerText = `Your GPA is: ${gpa.toFixed(2)}. ${message}`;
    document.getElementById('result').style.display = 'block';
    document.getElementById('error').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    const aboutLink = document.getElementById('about-link');
    const modal = document.getElementById('about-modal');
    const closeButton = document.querySelector('.close-button');

    aboutLink.addEventListener('click', function(event) {
        event.preventDefault();
        modal.style.display = 'block';
    });

    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
function calculateCgpa() {
    // Get input values
    const completedCredits = parseFloat(document.getElementById('completedCredits').value);
    const lastCgpa = parseFloat(document.getElementById('lastCgpa').value);
    const currentCredits = parseFloat(document.getElementById('currentCredits').value);
    const currentGpa = parseFloat(document.getElementById('currentGpa').value);

    // Check if input values are valid
    if (isNaN(completedCredits) || isNaN(lastCgpa) || isNaN(currentCredits) || isNaN(currentGpa)) {
        document.getElementById('error-container').textContent = "Please enter valid numbers for all fields.";
        document.getElementById('result-container').style.display = 'none';
        document.getElementById('error-container').style.display = 'block';
        return;
    }

    // Calculate total GPA and total credits
    const totalGpa = (completedCredits * lastCgpa) + (currentCredits * currentGpa);
    const totalCredits = completedCredits + currentCredits;

    // Calculate CGPA
    const cgpa = totalGpa / totalCredits;

    // Display result
    document.getElementById('cgpaResult').textContent = cgpa.toFixed(2);
    document.getElementById('result-container').style.display = 'block';
    document.getElementById('error-container').style.display = 'none';
}

// Smooth scrolling for navigation links
document.querySelectorAll('.sidebar nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});



