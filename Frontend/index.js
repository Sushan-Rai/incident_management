import { Country, State, City } from 'country-state-city';

document.getElementById('registrationForm').addEventListener('submit',async function (e) {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const password = document.getElementById('password').value.trim();
    const address = document.getElementById('address').value.trim();
    const country = document.getElementById('country').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const pinCode = document.getElementById('pincode').value;
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const email = document.getElementById('email').value.trim();
    const mobile = document.getElementById('mobile').value.trim();

    const firstNameRegex = /^[A-Za-z]+$/;
    const lastNameRegex = /^[A-Za-z]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;

    const firstNameError = document.getElementById('firstName').nextElementSibling;
    const lastNameError = document.getElementById('lastName').nextElementSibling;
    const addressError = document.getElementById('address').nextElementSibling;
    const passwordError = document.getElementById('passwordError');
    const cityError = document.getElementById('city').nextElementSibling;
    const countryError = document.getElementById('country').nextElementSibling;
    const stateError = document.getElementById('state').nextElementSibling;
    const pinCodeError = document.getElementById('pincode').nextElementSibling;
    const emailError = document.getElementById('emailError');
    const mobileError = document.getElementById('mobileError');

    let isValid = true;

    if (!firstNameRegex.test(firstName)) {
        firstNameError.textContent = "Please enter a valid first name (letters only).";
        isValid = false;
    } else {
        firstNameError.textContent = "";
    }

    if (address === "") {
        isValid = false;
        addressError.textContent = "Please enter a valid address.";
        isValid = false;
    }
    else {
        addressError.textContent = "";
    }

    if (country === "Select your country") {
        isValid = false;
        countryError.textContent = "Please select a country.";
    }
    else {
        countryError.textContent = ""
    }

    if (state === "Select your state") {
        isValid = false;
        stateError.textContent = "Please select a state.";
    }
    else {
        stateError.textContent = ""
    }

    if (city === "Select your country") {
        isValid = false;
        cityError.textContent = "Please select a country.";
    }
    else {
        cityError.textContent = ""
    }

    if (pinCode === "") {
        pinCodeError.textContent = "Please enter a valid pincode.";
        isValid = false
    }
    else {
        pinCodeError.textContent = ""
    }

    if (!lastNameRegex.test(lastName)) {
        lastNameError.textContent = "Please enter a valid last name (letters only).";
        isValid = false;
    } else {
        lastNameError.textContent = "";
    }

    if (!emailRegex.test(email)) {
        emailError.textContent = "Please enter a valid email.";
        isValid = false;
    } else {
        emailError.textContent = "";
    }

    if (!mobileRegex.test(mobile)) {
        mobileError.textContent = "Please enter a valid 10-digit mobile number.";
        isValid = false;
    } else {
        mobileError.textContent = "";
    }

    if (!passwordRegex.test(password)) {
        passwordError.textContent = "Password must contain at least one uppercase letter, one lowercase letter, one special character, and be at least 6 characters long.";
        isValid = false;
    } else if (password !== confirmPassword) {
        passwordError.textContent = "Passwords do not match.";
        isValid = false;
    } else {
        passwordError.textContent = "";
    }

    if (isValid) {
        console.log({
            email,
            firstName,
            lastName,
            password,
            address,
            country,
            state,
            city,
            pinCode,
            mobile
        });  
        const payload = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "password": password,
            "confirmPassword": confirmPassword,
            "address": address,
            "country": country,
            "state": state,
            "city": city,
            "pincode": pinCode,
            "mobileNumber": mobile,
        }; 
        localStorage.setItem('userDetails', JSON.stringify({
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
            address: payload.address,
            country: payload.country,
            state: payload.state,
            city: payload.city,
            pincode: payload.pincode,
            mobileNumber: payload.mobileNumber
        }));     
        const resp = await fetch('http://localhost:8080/api/users/register',{
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(payload)
        })
        const text = await resp.text(); 
        console.log("Raw Response:", text);
        window.location.href = "/login.html"
    }
});

document.getElementById('country').addEventListener('focusin', function (e) {
    const selectbar = e.target;

    if (!selectbar.querySelector('option[value="AF"]')) {
        Country.getAllCountries().forEach((e) => {
            const country = document.createElement('option');
            country.value = e.isoCode;
            country.textContent = e.name;
            selectbar.append(country);
        });
    } else {
        console.log('Countries already populated');
    }
});
document.getElementById('country').addEventListener('change', function (e) {
    const selectedCountry = e.target.value; 
    const phoneCode = Country.getCountryByCode(selectedCountry).phonecode;
    document.getElementById('countryCode').textContent = "+" + phoneCode;
});

document.getElementById('state').addEventListener('focusin', function (e) {
    const country = document.getElementById('country');
    const selectbar = e.target;

    selectbar.innerHTML = ''; 

    const defaultOption = document.createElement('option');
    defaultOption.textContent = "Select your state";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    selectbar.append(defaultOption);

    if (country.value) {
        State.getStatesOfCountry(country.value).forEach((e) => {
            const state = document.createElement('option');
            state.value = e.isoCode;
            state.textContent = e.name;
            selectbar.append(state);
        });
    } else {
        console.log('No country selected');
    }
});

document.getElementById('city').addEventListener('focusin', function (e) {
    const country = document.getElementById('country');
    const state = document.getElementById('state');
    const selectbar = e.target;

    selectbar.innerHTML = ''; 

    const defaultOption = document.createElement('option');
    defaultOption.textContent = "Select your city";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    selectbar.append(defaultOption);

    if (country.value && state.value) {
        City.getCitiesOfState(country.value,state.value).forEach((e) => {
            const city = document.createElement('option');
            city.textContent = e.name;
            selectbar.append(city);
        });
    } else {
        console.log('No country selected');
    }
});

// document.querySelector('#user-info').addEventListener('click',async (e)=>{
//     const firstName = document.querySelector("#firstName").value
//     const lastName = document.querySelector("#lastName").value
//     const email = document.querySelector("#email").value
//     const password = document.querySelector("#password").value
//     const confirmPassword = document.querySelector("#confirmPassword").value
//     const address = document.querySelector("#address").value
//     const country = document.querySelector("#country").value
//     const state = document.querySelector("#state").value
//     const city = document.querySelector("#city").value
//     const pincode = document.querySelector("#pincode").value
//     const mobile = document.querySelector("#mobile").value
// })

fetch('http://localhost:8080/api/incidents/user/example@example.com')
.then(response => response.json())
.then(data => console.log(data))



// try {
//     const response = await fetch('http://localhost:8080/api/users/register', {
//         method: 'POST',
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//     });

//     if (!response.ok) {
//         const error = await response.json();
//         console.error("Server Error:", error);
//     } else {
//         const data = await response.json();
//         console.log("Success:", data);
//     }
// } catch (err) {
//     console.error("Network Error:", err);
// }
