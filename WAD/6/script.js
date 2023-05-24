function generateTables() {
    var input1 = document.getElementById("input1").value;
    var input2 = document.getElementById("input2").value;

    var table1Values = input1.split("#");
    var table2Values = input2.split("#");

    var table1Rows = parseInt(table1Values[0]);
    var table1Columns = parseInt(table1Values[1]);
    var table2Rows = parseInt(table2Values[0]);
    var table2Columns = parseInt(table2Values[1]);
    var firstTableValue = parseInt(table1Values[2]);
    var secondTableValue = parseInt(table2Values[2]);

    var tablesContainer = document.getElementById("tablesContainer");

    // Clear the tables container
    tablesContainer.innerHTML = "";

    // Generate the first table
    var firstTableHTML = generateTable(table1Rows, table1Columns, firstTableValue);
    tablesContainer.innerHTML += firstTableHTML;

    // Generate the second table
    var secondTableHTML = generateTable(table2Rows, table2Columns, secondTableValue);
    tablesContainer.innerHTML += secondTableHTML;

    // Generate the third table based on conditions
    if (
      table1Rows === table2Rows &&
      table1Columns === table2Columns &&
      firstTableValue !== secondTableValue
    ) {
      var thirdTableHTML = generateThirdTable(
        table1Rows,
        table1Columns,
        firstTableValue,
        secondTableValue
      );
      tablesContainer.innerHTML += thirdTableHTML;
    } else if (
      table1Rows === table2Rows &&
      table1Columns === table2Columns &&
      firstTableValue === secondTableValue
    ) {
      // Display the third table same as the first or second table
      tablesContainer.innerHTML += firstTableHTML;
    }
  }

  function generateTable(rows, columns, initialValue) {
    var tableHTML = "<table>";
    var multiply = 0;
    for (var i = 0; i < rows; i++) {
      tableHTML += "<tr>";
      multiply++;
      for (var j = initialValue; j < columns + initialValue; j++) {
        var cellValue = i === 0 ? j : j * multiply;
        tableHTML += "<td>" + cellValue + "</td>";
      }
      tableHTML += "</tr>";
    }
    tableHTML += "</table>";
    return tableHTML;
  }

  function generateThirdTable(rows, columns, initialValue1, initialValue2) {
    var thirdTableHTML = "<table>";
    var multiply1 = 0;
    for (var i = 0; i < rows; i++) {
      thirdTableHTML += "<tr>";
      multiply1++;
      var initialValue2temp = initialValue2;
      for (var j = initialValue1; j < columns + initialValue1; j++) {
        var cellValue = (i === 0)? j * initialValue2temp: (j*multiply1) * (initialValue2temp*multiply1) ;
        thirdTableHTML += "<td>" + cellValue + "</td>";
        initialValue2temp++;
      }
      thirdTableHTML += "</tr>";
    }
    thirdTableHTML += "</table>";
    return thirdTableHTML;
  }