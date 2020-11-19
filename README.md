# GAS-Reddit-mnlynam

> I'm not very well versed in Google Apps Script, and I'm having trouble with something in Google Sheets. I have a drop-down validation cell with a list taken from a range on the sheet. That range has checkboxes in the column directly to the left of that list, and by default all those checkboxes are ticked (TRUE). What I'm looking to do is have a script that notices when that drop-down list changes to another selection, and to uncheck the box on the left of the name that was last selected in the drop-down before it was changed.

-mnlynam


From what I understand, our friend /u/mnlynam is needed to create some sort of onchange event on the select drop down that unchecks a box related to that same value in some list (the same that is getting the values for the drop down)

So first, I'm gonna make an [example sheet.](https://docs.google.com/spreadsheets/d/1LPG1lb4bdh_-DucQN_1r9A2y4yWceDnrso5B6xDgFYw/edit?usp=sharing)

![Image1](/images/1.png)

We have

* A range from B2:C10 with checkmarks and southern state names.
* A drop down selection on E3 where the possible values come from the previous range

For this, we should use the ```onEdit(e)``` function which runs everytime somebody edits a value in the spreadsheet. Conveniently for this purpose, the variable ```e``` (stands for event) is passed automatically into this function as an input. This object has a few useful attributes, the most relevant being ```oldValue``` which will be the value of the cell before the edit. 

This means we just need to..

1. Get the data in C3:C10
2. Find out which row matches ```e.oldValue```
3. Go to the checkbox next to it and mark it

So let's begin writing our ```onEdit(e)``` function

```javascript
function onEdit(e) {
    // we begin by getting a reference to the current spreadsheet & sheet

  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getActiveSheet();

  // then we get a reference to the range with the source values
  // and run the .getValues() method to return an array we can iterate over
  

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
```

So now we double check if it's working correctly....

[Image2](/images/2.png)


[Image3](/images/3.png)





and it seems to be, so that about wraps up this mini-tutorial.