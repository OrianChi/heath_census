const addPatientButton = document.getElementById("addPatient");
const report = document.getElementById("report");
const btnSearch = document.getElementById('btnSearch');
const patients = [];

/*
addPatientButton: The button used to add patient data
report: The HTML element where you will see analysis reports displayed
btnSearch: The variable name of the button which displays the search results when clicked
An empty array named patients is also created to store the collected patient data.
*/

function addPatient() {
    const name = document.getElementById("name").value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const age = document.getElementById("age").value;
    const condition = document.getElementById("condition").value;

    if (name && gender && age && condition) {
      patients.push({ name, gender: gender.value, age, condition });
      resetForm();
      generateReport();
    }
  }

  /*
  This function retrieves the patient's details in the form such as name, gender, age, and condition. For example, the variable name is defined by
const name = document.getElementById("name").value;

Additionally, it:

appends the patient's details to the patients[] array, which stores all entered patient data using the push() method
resets the form fields using the resetForm() method to clear the input fields for the next entry
triggers the generateReport() method to update and display the analysis report based on the newly added patient data
  */

//The above code assigns an empty value to all the fields to clear previously entered details.
function resetForm() {
    document.getElementById("name").value = "";
    document.querySelector('input[name="gender"]:checked').checked = false;
    document.getElementById("age").value = "";
    document.getElementById("condition").value = "";
  }

  function generateReport() {
    const numPatients = patients.length;
    const conditionsCount = {
      Diabetes: 0,
      Thyroid: 0,
      "High Blood Pressure": 0,
    };
    const genderConditionsCount = {
      Male: {
        Diabetes: 0,
        Thyroid: 0,
        "High Blood Pressure": 0,
      },
      Female: {
        Diabetes: 0,
        Thyroid: 0,
        "High Blood Pressure": 0,
      },
    };

    for (const patient of patients) {
      conditionsCount[patient.condition]++;
      genderConditionsCount[patient.gender][patient.condition]++;
    }

    report.innerHTML = `Number of patients: ${numPatients}<br><br>`;
    report.innerHTML += `Conditions Breakdown:<br>`;
    for (const condition in conditionsCount) {
      report.innerHTML += `${condition}: ${conditionsCount[condition]}<br>`;
    }

    report.innerHTML += `<br>Gender-Based Conditions:<br>`;
    for (const gender in genderConditionsCount) {
      report.innerHTML += `${gender}:<br>`;
      for (const condition in genderConditionsCount[gender]) {
        report.innerHTML += `&nbsp;&nbsp;${condition}: ${genderConditionsCount[gender][condition]}<br>`;
      }
    }
  }

addPatientButton.addEventListener("click", addPatient);

/*
* This generateReport() function calculates and constructs an analysis report based on the collected patient data stored in the patients[] array. Here's a breakdown:

* Initialization:
    1. numPatients Represents the total number of patients stored in the patients[] array
    2. conditionsCount A data structure (object) initializing counters for specific medical conditions (Diabetes, Thyroid, High Blood Pressure), initially set to zero.
    3. genderConditionsCount A nested object with gender-specific condition counters ( male and female) for each medical condition, also initialized to zero for each condition

* Data processing loop:
    1. Iterates through the patients[] array: Utilizes a for…of loop to iterate through each patient's data within the patients[] array
    2. Increment condition counts: Increments the count for each patient's specific medical condition in the conditionsCount object.
    3. Updating gender-based condition counts: Increases the count of each medical condition within the respective gender category in the genderConditionsCount object based on the patient's gender and condition

*HTML update:
    1. Update report element: Dynamically updates the HTML content within the designated report element
    2. Total patients display: Displays the total number of patients
    3. Conditions breakdown: Lists the counts for each medical condition in the conditionsCount object
    4. Gender-based conditions display: Illustrates counts of each condition categorized by gender in the genderConditionsCount object, showing the distribution of conditions among males and females separately.

    Event Listener
    1. Now, you need to set up event listener using addPatientButton.addEventListener("click", addPatient) to add patient details when the user clicks the Add Patient button.

    Go to your browser where your code runs, enter details, and click the Add Patient button. It should generate data, as shown in the screenshot below.
*/


function searchCondition() {
    const input = document.getElementById('conditionInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('health_analysis.json')
      .then(response => response.json())
      .then(data => {
        const condition = data.conditions.find(item => item.name.toLowerCase() === input);

        if (condition) {
          const symptoms = condition.symptoms.join(', ');
          const prevention = condition.prevention.join(', ');
          const treatment = condition.treatment;

          resultDiv.innerHTML += `<h2>${condition.name}</h2>`;
          resultDiv.innerHTML += `<img src="${condition.imagesrc}" alt="hjh">`;

          resultDiv.innerHTML += `<p><strong>Symptoms:</strong> ${symptoms}</p>`;
          resultDiv.innerHTML += `<p><strong>Prevention:</strong> ${prevention}</p>`;
          resultDiv.innerHTML += `<p><strong>Treatment:</strong> ${treatment}</p>`;
        } else {
          resultDiv.innerHTML = 'Condition not found.';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
      });
  }
    btnSearch.addEventListener('click', searchCondition);



/*

    *This function fetches the health condition data from the health.json file and searches for a matching condition based on user input. Then, it displays the condition details or an error message in a designated HTML element (resultDiv).

    *The above code includes:

1. const input = document.getElementById('conditionInput').value.toLowerCase(); This retrieves the value entered into the input field with the ID conditionInput. It converts the entered text to lowercase to ensure case-insensitive comparison.

2.const resultDiv = document.getElementById('result'); resultDiv.innerHTML = ''; This retrieves the HTML element with the ID 'result'. It clears any previous content within this HTML element.

3. fetch('health.json') This API method initiates a fetch request to the file named 'health.json'. It assumes a JSON file named 'health.json' is in the same directory as the HTML file.

4.   .then(response => response.json()) Converts the fetched response into JSON format.

5.  .then(data => {  ...  }) This handles the retrieved JSON data. It searches for a health condition that matches the user input.

6. const condition = data.conditions.find(item => item.name.toLowerCase() === input); This searches within the JSON data for a health condition whose name matches the entered input.

7. if (condition) { /* ...  } else { /* ... } This code checks for a matching condition. If found, it constructs HTML content to display details about the condition (name, symptoms, prevention, treatment) within the resultDiv. If the system cannot find a matching condition, it displays a 'Condition not found' message within the resultDiv.

8  .catch(error => { /* ...  }) This handles any errors that might occur during the fetch request or data processing. If an error occurs, it logs it to the console and displays an error message within the resultDiv.

9. Suppose you have entered Thyroid in search bar. After clicking on Search button it will display given information from health_analysis.json.
*/

/*
HTML Structure: The HTML file establishes a structure comprising navigation links for analysis options and form elements to input patient data, including name, gender, age, and medical condition.

JavaScript Logic: The embedded JavaScript code manages patient data storage, providing functions to add patients, reset the form inputs, and generate an analysis report based on the entered information.

Data Analysis Capabilities: The code includes functionalities to filter patients based on specific conditions and age groups triggered by the navigation links. These functions prompt user input via prompts and display the corresponding analysis results within the webpage.

Event Handling: Event listeners are set up to respond to user interactions with the navigation links and the "Add Patient" button, facilitating dynamic updates and analysis generation based on the healthcare data provided.
*/