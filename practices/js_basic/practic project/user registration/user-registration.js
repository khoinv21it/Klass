function showError(input, message) {
    const parent = input.parentElement;
    const errorElement = parent.querySelector('.error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
        if (input.tagName === 'INPUT' || input.tagName === 'SELECT' || input.tagName === 'TEXTAREA') {
            input.classList.add('invalid');
        }
    }
}

document.getElementById('registrationForm').addEventListener('submit', function (e) {
    e.preventDefault();
    let isValid = true;

    document.querySelectorAll('.error').forEach(error => {
        error.textContent = '';
        error.classList.add('hidden');
    });
    document.querySelectorAll('input, select, textarea').forEach(input => {
        input.classList.remove('invalid');
    });


    const fullName = document.getElementById('fullname');
    if (!fullName.value.trim()) {
        showError(fullName, 'Full name is required');
        isValid = false;
    } else if (fullName.value.trim().length < 3) {
        showError(fullName, 'Full name must be at least 3 characters');
        isValid = false;
    }

    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!emailRegex.test(email.value.trim())) {
        showError(email, 'A valid email is required');
        isValid = false;
    }

    const password = document.getElementById('password');
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!password.value) {
        showError(password, 'Password is required');
        isValid = false;
    } else if (!passwordRegex.test(password.value)) {
        showError(password, 'Password must be at least 8 characters with letters and numbers');
        isValid = false;
    }


    const confirmPassword = document.getElementById('confirmPassword');
    if (!confirmPassword.value) {
        showError(confirmPassword, 'Please confirm your password');
        isValid = false;
    } else if (confirmPassword.value !== password.value) {
        showError(confirmPassword, 'Passwords do not match');
        isValid = false;
    }


    const phone = document.getElementById('phone');
    const phoneRegex = /^\d{10,}$/;
    if (!phone.value.trim()) {
        showError(phone, 'Phone number is required');
        isValid = false;
    } else if (!phoneRegex.test(phone.value.trim())) {
        showError(phone, 'Phone number must be at least 10 digits');
        isValid = false;
    }


    const gender = document.querySelector('input[name="gender"]:checked');
    const genderContainer = document.querySelector('input[name="gender"]').parentElement.parentElement;
    if (!gender) {
        showError(genderContainer, 'Please select a gender');
        isValid = false;
    }

    // Date of Birth Validation
    const dob = document.getElementById('dob');
    if (!dob.value) {
        showError(dob, 'Date of birth is required');
        isValid = false;
    } else {
        const today = new Date();
        const birthDate = new Date(dob.value);
        let age = today.getFullYear() - birthDate.getFullYear();
        if (age < 18) {
            showError(dob, 'You must be over 18 years old');
            isValid = false;
        }
    }

    const country = document.getElementById('country');
    if (!country.value) {
        showError(country, 'Please select a country');
        country.classList.add('invalid');
        isValid = false;
    }

    const hobbies = document.querySelectorAll('input[name="hobbies"]:checked');
    const hobbiesContainer = document.querySelector('input[name="hobbies"]').parentElement.parentElement;
    if (hobbies.length === 0) {
        showError(hobbiesContainer, 'Please select at least one hobby');
        isValid = false;
    }

    const profilePic = document.getElementById('profilePic');
    if (profilePic.files.length > 0) {
        const file = profilePic.files[0];
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!validTypes.includes(file.type)) {
            showError(profilePic, 'Only .jpg, .jpeg, or .png files are allowed');
            isValid = false;
        }
    }


    const bio = document.getElementById('bio');
    if (bio.value.length > 300) {
        showError(bio, 'Bio must not exceed 300 characters');
        isValid = false;
    }

    if (isValid) {
        alert('Form submitted successfully!');
        this.reset();
    }
});
