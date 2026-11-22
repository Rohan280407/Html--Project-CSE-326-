// This function is used to show or hide a form on the webpage
// formId is the ID of the form that we want to open or close
function toggleForm(formId) {
  // Finds the HTML element using the given form ID
  var form = document.getElementById(formId);

  // Adds the "show" class if it is not present
  // Removes the "show" class if it is already present
  // This makes the form open and close when the button is clicked
  form.classList.toggle("show"); 
}

// Add submitted form values as a new row in the matching table.

// Selects all HTML forms that have the "data-table" attribute
// forEach() runs the following function for each selected form
document.querySelectorAll("form[data-table]").forEach(function (form) {
  // Adds an event listener to each form
  // It waits for the form to be submitted
  form.addEventListener("submit", function (event) {
    // Prevents the webpage from refreshing after form submission
    event.preventDefault();

    // Gets the table ID stored in the form's data-table attribute
    // Then selects that table from the HTML webpage
    var table = document.getElementById(form.getAttribute("data-table"));

    // Creates a new row at the end of the selected table
    var row = table.insertRow(-1);

    // Selects all input fields, dropdowns and textareas inside the form
    var inputs = form.querySelectorAll("input,select,textarea");

    // Runs the following function for each input field
    // This helps transfer each form value into a table cell
    inputs.forEach(function (input) {
      // Creates a new cell inside the newly created table row
      var cell = row.insertCell();

      // Gets the value entered by the user in the current input field
      var value = input.value;

      // Checks whether the current input field is named "amount"
      if (input.name === "amount") {
        // Adds the Indian Rupee symbol before the entered amount
        value = "₹" + value;
      }

      // Checks whether the current input field is named "status"
      if (input.name === "status") {
        // Creates a new HTML span element
        // Span is used here to display the status as a styled tag
        var tag = document.createElement("span");

        // Assigns the "tag" class to the span
        // If the status is Pending, Upcoming or Waiting,
        // it also adds the "pending" class
        tag.className =
          "tag" +
          (value === "Pending" || value === "Upcoming" || value === "Waiting"
            ? " pending"
            : "");

        // Sets the text inside the status tag to the entered status value
        tag.textContent = value;

        // Adds the status tag inside the table cell
        cell.appendChild(tag);
      } else {
        // If the field is not a status field,
        // displays its value directly inside the table cell
        cell.textContent = value;
      }
    });

    // Checks whether the submitted form is the Owner form or Pet form
    if (form.id === "ownerForm" || form.id === "petForm") {
      // Automatically updates the first cell with the serial number
      // table.rows.length - 1 gives the number of data rows
      // excluding the table heading row
      row.cells[0].textContent = table.rows.length - 1;
    }

    // Clears all the input fields after successful form submission
    form.reset();

    // Removes the "show" class to hide the form after submission
    form.classList.remove("show");
  });
});
