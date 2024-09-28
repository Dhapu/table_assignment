let chemicals = [];
let originalData = []; 

// Load the data from JSON file
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    chemicals = data;
    originalData = JSON.parse(JSON.stringify(data)); 
    populateTable();
  })
  .catch(error => console.error('Error loading data:', error));


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

function moveRowDown() {
  const tableBody = document.getElementById('tableBody');
  const selectedRow = Array.from(tableBody.querySelectorAll('tr')).find(row => row.style.backgroundColor === "rgb(203, 195, 227)"); // Get the active row by checking the background color

  if (selectedRow) {
      const nextRow = selectedRow.nextElementSibling; 

      if (nextRow) {
          
          tableBody.insertBefore(nextRow, selectedRow);
          tableBody.insertBefore(selectedRow, nextRow.nextElementSibling); 
      } else {
          alert("This row is already at the bottom.");
      }
  } else {
      alert("Please select a row to move down.");
  }
}


function moveRowUp() {
  const tableBody = document.getElementById('tableBody');
  const selectedRow = Array.from(tableBody.querySelectorAll('tr')).find(row => row.style.backgroundColor === "rgb(203, 195, 227)"); // Get the active row by checking the background color

  if (selectedRow) {
      const previousRow = selectedRow.previousElementSibling; 

      if (previousRow) {
          
          tableBody.insertBefore(selectedRow, previousRow); 
      } else {
          alert("This row is already at the top.");
      }
  } else {
      alert("Please select a row to move up.");
  }
}



let activeRow = null; 


function editRow(icon) {
  const row = icon.closest("tr"); 
  const cells = row.querySelectorAll("td");


  if (activeRow && activeRow !== row) {
      alert("Please save the currently editing row before editing another.");
      return;
  }


  const isEditable = cells[1].isContentEditable;

  
  if (!isEditable) {
      cells.forEach((cell, index) => {
          if (index > 0) {
              cell.contentEditable = true; 
          }
      });
      activeRow = row; 
      row.style.backgroundColor = "#CBC3E3"; 
      icon.style.color = "#0000FF"; 
  } else {
      alert("Row is already being edited.");
  }
}



function saveData() {
  if (activeRow) {
      const cells = activeRow.querySelectorAll("td");

      
      cells.forEach((cell, index) => {
          if (index > 0) {
              cell.contentEditable = false;
          }
      });

  
      activeRow.style.backgroundColor = ""; 
      const editIcon = activeRow.querySelector("i.fa-check");
      editIcon.style.color = "grey";

      activeRow = null; 
      alert("Data saved successfully!");
  } else {
      alert("No row is being edited.");
  }
}

 
function refreshData() {
    chemicals = JSON.parse(JSON.stringify(originalData)); 
    populateTable(); 
  }
  
 
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
    const rows = tableBody.querySelectorAll('tr'); 
  
    if (rows.length > 0) {
      const lastRow = rows[rows.length - 1];
      tableBody.removeChild(lastRow); 
    }
  }
  
 
  
