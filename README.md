# GAS-Reddit-mnlynam

> I'm not very well versed in Google Apps Script, and I'm having trouble with something in Google Sheets. I have a drop-down validation cell with a list taken from a range on the sheet. That range has checkboxes in the column directly to the left of that list, and by default all those checkboxes are ticked (TRUE). What I'm looking to do is have a script that notices when that drop-down list changes to another selection, and to uncheck the box on the left of the name that was last selected in the drop-down before it was changed.

-mnlynam


From what I understand, our friend /u/mnlynam is needed to create some sort of onchange event on the select drop down that unchecks a box related to that same value in some list (the same that is getting the values for the drop down)

So first, I'm gonna make an [example sheet.](https://docs.google.com/spreadsheets/d/1LPG1lb4bdh_-DucQN_1r9A2y4yWceDnrso5B6xDgFYw/edit?usp=sharing)