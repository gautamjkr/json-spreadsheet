# JSON Spreadsheet Documentation

## Overview
This spreadsheet application allows you to create, edit, and manipulate grid-based data, with support for formulas, styling, and importing/exporting data.

---

## Features
- **Dynamic Row and Column Management**: Add or remove rows and columns dynamically.
- **Cell Styling**: Customize text styles such as bold and background colors.
- **Formula Support**: Compute values using formulas like `=SUM` and `=AVERAGE`.
- **Formula Input Box**: Enter formulas directly into the formula input box and compute results for a selected cell.
- **Import/Export**: Save the spreadsheet as a JSON file and reload it anytime.
- **Clipboard Support**: Copy and paste data between cells.
- **Clear Sheet**: Reset the entire spreadsheet to the default state.

---

## How to Use

### Adding Rows and Columns
- Click the **"Add Row"** button to append a new row to the spreadsheet.
- Click the **"Add Column"** button to add a new column to the spreadsheet.

### Styling Cells
- **Toggle Bold**: Select one or more cells and click the **"Toggle Bold"** button to apply or remove bold styling.
- **Background Color**: Use the color picker to select a color and apply it to the background of the currently selected cell(s).

---

## Formula Support

You can use formulas in two ways:

1. **Directly in the Cell**: Click a cell to edit and type a formula (e.g., `=SUM(A1:A5)`). Press "Tab" or Click any other cell to compute the formula.
2. **Formula Input Box**:
   - Select a cell where you want the result to appear.
   - Enter a formula in the formula input box (e.g., `=SUM(A1:A5)`).
   - Click the **"Compute"** button to calculate and display the result in the selected cell.

---

### Formula Examples

#### Using Range Formulas
- `=SUM(A1:A5)`: Adds the values of cells A1 through A5.
- `=AVERAGE(B1:B3)`: Calculates the average of the values in cells B1, B2, and B3.

#### Using Specific Cell References
- `=SUM(A1, B2, C3)`: Adds the values of cells A1, B2, and C3.
- `=AVERAGE(A1, A3, B5)`: Calculates the average of the specified cells.

---

## Importing and Exporting

### Save
- Click the **"Save to JSON"** button to download the spreadsheet data as a JSON file.

### Load
- Use the file input to upload a previously saved JSON file and restore your spreadsheet data.

---

## Additional Functionalities

- **Clear Sheet**: Click the **"Clear Sheet"** button to reset the spreadsheet to its default state.
- **Clipboard Support**: Use the **"Copy"** button to copy the content of selected cells and the **"Paste"** button to paste the content into other cells.

---

Enjoy your seamless spreadsheet experience!

