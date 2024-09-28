let chemicals = [];
let originalData = []; // To hold the original order of the data

// Load the data from JSON file
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    chemicals = data;
    originalData = JSON.parse(JSON.stringify(data)); // Store a copy of the original data
    populateTable();
  })
  .catch(error => console.error('Error loading data:', error));

// Populate table with data
function populateTable() {
  const tableBody = document.getElementById('tableBody');
  tableBody.innerHTML = '';
  chemicals.forEach((chemical, index) => {
    const row = `
      <tr>
         <td><i class="fa-solid fa-check" title="Edit" onclick="editRow(this)" style="color: grey;"></i></td>
        <td>${chemical.id}</td>
        <td>${chemical.chemicalName}</td>
        <td>${chemical.vendor}</td>
        <td>${chemical.density}</td>
        <td>${chemical.viscosity}</td>
        <td>${chemical.packaging}</td>
        <td>${chemical.packSize}</td>
        <td>${chemical.unit}</td>
        <td>${chemical.quantity}</td>
     
      </tr>
    `;
    tableBody.insertAdjacentHTML('beforeend', row);
  });
}

// Sorting functionality
let isAscending = true;
function sortTable(columnIndex) {
  chemicals.sort((a, b) => {
    const cellA = Object.values(a)[columnIndex].toString().toLowerCase();
    const cellB = Object.values(b)[columnIndex].toString().toLowerCase();
    return isAscending ? (cellA > cellB ? 1 : -1) : (cellA < cellB ? 1 : -1);
  });
  isAscending = !isAscending;
  populateTable();
}


// Edit row functionality
let activeRow = null; // Variable to track the currently active row

// Edit row functionality
function editRow(icon) {
    const row = icon.closest("tr"); // Get the closest table row
    const cells = row.querySelectorAll("td");

    // If there is already an active row and it's not the current one, prevent editing
    if (activeRow && activeRow !== row) {
        alert("Please save the currently editing row before editing another.");
        return;
    }

    // Toggle between editable and non-editable state
    const isEditable = cells[1].isContentEditable;

    // Set contenteditable to true or false based on current state
    if (!isEditable) {
        cells.forEach((cell, index) => {
            if (index > 0) {
                cell.contentEditable = true; // Make the row editable
            }
        });
        activeRow = row; // Set the current row as active
        row.style.backgroundColor = "#CBC3E3"; 
        icon.style.color = "#0000FF";
         // Highlight the row with a background color
    } else {
        alert("Row is already being edited.");
    }
}

// Save data for the active row
function saveData() {
  if (activeRow) {
      const cells = activeRow.querySelectorAll("td");

      // Save the content and disable editing
      cells.forEach((cell, index) => {
          if (index > 0) {
              cell.contentEditable = false; // Disable editing
          }
      });

      // Reset background color and icon color
      activeRow.style.backgroundColor = ""; // Reset background color
      const editIcon = activeRow.querySelector("i.fa-check");
      editIcon.style.color = "grey"; // Change the edit icon color to grey (disabled)

      activeRow = null; // Reset the active row
      alert("Data saved successfully!");
  } else {
      alert("No row is being edited.");
  }
}

  // Refresh data functionality
function refreshData() {
    chemicals = JSON.parse(JSON.stringify(originalData)); // Reset chemicals to original data
    populateTable(); // Repopulate table with original data
  }
  
  // Example functions for addRow, deleteRow, moveRowUp, moveRowDown, refreshData, saveData
  function addRow() {
    const tableBody = document.getElementById("tableBody");
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td><i class="fa-solid fa-check" title="Edit" onclick="editRow(this)" style="color: grey;"></i></td>
      <td contenteditable="false"></td>
      <td contenteditable="false"></td>
      <td contenteditable="false"></td>
      <td contenteditable="false"></td>
      <td contenteditable="false"></td>
      <td contenteditable="false"></td>
      <td contenteditable="false"></td>
      <td contenteditable="false"></td>
      <td contenteditable="false"></td>
    
    `;
    tableBody.appendChild(newRow);
  }
  
  function deleteRow() {
    const tableBody = document.getElementById("tableBody");
    const rows = tableBody.querySelectorAll('tr'); // Get all rows in the table
  
    if (rows.length > 0) {
      const lastRow = rows[rows.length - 1]; // Get the last row
      tableBody.removeChild(lastRow); // Remove the last row
    }
  }
  
  
  // Add more functionality as needed
  
