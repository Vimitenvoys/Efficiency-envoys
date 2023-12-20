document.addEventListener('DOMContentLoaded', function () {
    // Path to the CSV file
    const csvFilePath = 'static/files/results.csv';

    // Fetch the CSV file using AJAX
    fetch(csvFilePath)
        .then(response => response.text())
        .then(csvData => { displayCSV(csvData), highlightRows() })
        .catch(error => console.error('Error fetching CSV file:', error));
});

function highlightRows() {
    const table = document.getElementById('dataBody');
    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const columnEValue = cells[16].textContent.trim(); // Assuming Column E is at index 4

        // Check the value in Column E and apply styles to the entire row
        if (columnEValue === '1') {
            console.log('Highlighting row', i, 'with red background');
            rows[i].style.backgroundColor = 'red';
            rows[i].style.color = 'white'; // Adjust text color for better visibility
        } else if (columnEValue === '2') {
            console.log('Highlighting row', i, 'with green background');
            rows[i].style.backgroundColor = 'green';
            rows[i].style.color = 'white'; // Adjust text color for better visibility
        }
    }
}



function displayCSV(csvData) {
    const lines = csvData.split('\n');
    const table = document.getElementById('dataBody');

    // Clear existing table body content
    const tbody = table.querySelector('tbody');
    if (tbody) {
        tbody.innerHTML = '';
    } else {
        // If tbody doesn't exist, create one
        const newTbody = document.createElement('tbody');
        table.appendChild(newTbody);
    }

    // Create table rows in the tbody (limit to 10 rows)
    for (let i = 1; i <= Math.min(20, lines.length - 1); i++) {
        const rowData = lines[i].split(',').slice(0, 50);
        const row = table.tBodies[0].insertRow();

        for (const data of rowData) {
            const cell = row.insertCell();
            cell.textContent = data;
        }
    }

        // Populate filter dropdown using existing table values
        populateFilterDropdown();

    // Attach event listener to filter input
    filterInput.addEventListener('input', function () {
        filterTable(this.value.toLowerCase());
    });
}

function populateFilterDropdown() {
    const table = document.getElementById('dataBody');
    const rows = table.getElementsByTagName('tr');
    const columnCValues = new Set();

    // Extract unique values from Column C in the displayed table
    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const columnCValue = cells[16].textContent.trim(); // Assuming Column A is at index 0

        if (columnCValue !== '') {
            columnCValues.add(columnCValue);
        }
    }

    // Populate the dropdown with unique values
    const filterSelect = document.getElementById('filterSelect');

    // Remove existing options
    filterSelect.innerHTML = '';

    // Add 'All' option
    const allOption = document.createElement('option');
    allOption.value = '';
    allOption.textContent = 'All';
    filterSelect.appendChild(allOption);

    // Add unique values from Column C
    columnCValues.forEach(value => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        filterSelect.appendChild(option);
    });
}

function filterTableByColumnC(selectedValue) {
    const table = document.getElementById('dataBody');
    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const columnCValue = cells[16].textContent.trim(); // Assuming Column A is at index 0

        if (selectedValue === '' || columnCValue === selectedValue) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}

function filterTable(filterValue) {
    const table = document.getElementById('dataBody');
    const tbody = table.querySelector('tbody');
    const rows = tbody.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        let rowShouldBeVisible = false;

        for (let j = 0; j < cells.length; j++) {
            const cellValue = cells[j].textContent.toLowerCase();

            // Check if any cell matches the filter value
            if (cellValue.includes(filterValue)) {
                rowShouldBeVisible = true;
                break;
            }
        }

        // Toggle row visibility based on the filter
        rows[i].style.display = rowShouldBeVisible ? '' : 'none';
    }
}

function downloadPDFPage() {
    const body = document.body;
    // Generate PDF of the entire HTML document with autoTable
    html2pdf(body, {
        jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' },
        image: { type: 'jpeg', quality: 0.98 },
    });
}