# JSON Spreadsheet Application

A lightweight and interactive spreadsheet application built with React and Ant Design. This app supports dynamic rows and columns, styling, formulas, and import/export features. Access the live version here:[ [https://json-spreadsheet.example.com](https://json-spreadsheet.example.com)](https://jsonspreadsheet.netlify.app/).

---

## Table of Contents

1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Running the Application](#running-the-application)
5. [Using the Application](#using-the-application)
6. [Sample Formula Usage](#sample-formula-usage)

---

## Features

- Add or remove rows and columns dynamically.
- Apply cell styling (e.g., bold text, background color).
- Compute values using formulas like `=SUM` and `=AVERAGE`.
- Import and export spreadsheet data as JSON.
- Clear the sheet to reset to default.
- Clipboard support for copy and paste.

---

## Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm (comes with Node.js) or [yarn](https://yarnpkg.com/)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/gautamjkr/json-spreadsheet.git
   cd json-spreadsheet
   npm install
   ```
## Running the Application

1. Once the installation is complete, you can run the application using:
   ```bash
   npm run dev
   ```

2. The application will be accessible at (please check the port as per your system's configuration):
   ```bash
   http://localhost:3000
   ```

## Using the Application

1. Add/Remove Rows and Columns: You can dynamically add or remove rows and columns by clicking on the respective buttons.
2. Styling: Apply various cell styles such as bold text, background color, and more by selecting cells and using the provided styling options.
3. Formulas: Use built-in formulas like =SUM and =AVERAGE to compute values.
4. Import/Export: Export your spreadsheet data to JSON and import JSON data to populate the spreadsheet.
5. Clipboard Support: Use copy and paste functionality for cell content or entire rows/columns.

## Sample Formula Usage

#### Using Range Formulas
- `=SUM(A1:A5)`: Adds the values of cells A1 through A5.
- `=AVERAGE(B1:B3)`: Calculates the average of the values in cells B1, B2, and B3.

#### Using Specific Cell References
- `=SUM(A1, B2, C3)`: Adds the values of cells A1, B2, and C3.
- `=AVERAGE(A1, A3, B5)`: Calculates the average of the specified cells.


