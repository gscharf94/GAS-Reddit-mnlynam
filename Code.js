function onEdit(e) {
  // we begin by getting a reference to the current spreadsheet & sheet
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getActiveSheet();

  // then we get a reference to the range with the source values
  // and run the .getValues() method to return an array we can iterate over
  let sourceValues = sheet.getRange('C3:C10').getValues();

  // we'll keep a counter to keep track of how far down the list until we find
  // the correct value, we will use it later
  let offset = 0;

  // now we iterate over the sourceValues array and check to see if anything matches
  // the e.oldValue attribute. Everytime we finish a loop, we add 1 to the offset
  // If the values in the if statement match, we break out of the loop

  // note: remember the .getValues() function returns a 2d array, even if 
  // you're just pulling a column think of it as returning the rows in the sheet
  // ex: [
  // ['State A'],
  // ['State B'],
  //  ]
  // So to properly compare the value with the e.oldValue, we need to access the first element in the array
  // also the only one but that's why we need to do row[0] in our if statement

  for (const row of sourceValues) {
    if (row[0] == e.oldValue) {
      break;
    }
    offset++;
  }

  // now we have the proper row that we know our checkmark is at
  // it's going to be the starting row (3 in our case) + whatever the offset value is
  // so now let's get a reference to the cell with the .getRange() function

  let checkmarkBox = sheet.getRange(`B${3+offset}`);

  // then we just do a test to see if it's checked, and if it is, we uncheck it
  if (checkmarkBox.isChecked()) {
    checkmarkBox.uncheck();
  }
}