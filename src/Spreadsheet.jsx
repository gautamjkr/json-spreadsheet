import React, { useState, useRef } from "react";
import {
  Input,
  Space,
  Button,
  FloatButton,
  ColorPicker,
  message,
  Tour,
} from "antd";
import {
  PlusOutlined,
  CopyOutlined,
  FunctionOutlined,
  DownloadOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import ReadDocsModal from "./ReadDocsModal";

const Spreadsheet = () => {
  const defaultGridValue = Array(10)
    .fill(null)
    .map(() => Array(10).fill({ value: "", bold: false, bgColor: "" }));

  // to show the notification icon on the float button
  const localInfoStatus = localStorage.getItem("infoStatus");

  const [grid, setGrid] = useState(defaultGridValue);
  const [selectedCell, setSelectedCell] = useState(null);
  const [selectionRange, setSelectionRange] = useState(null);
  const [copiedData, setCopiedData] = useState(null);
  const [inputFormula, setInputFormula] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);
  const [isDocsModalOpen, setDocsModalOpen] = useState(false);
  const [infoStatus, setInfoStatus] = useState(localInfoStatus || false);

  // for tour, need multiple refs
  const addRowRef = useRef(null);
  const addColumnRef = useRef(null);
  const toggleBoldRef = useRef(null);
  const backgroundColorRef = useRef(null);
  const copyRef = useRef(null);
  const pasteRef = useRef(null);
  const computeRef = useRef(null);
  const clearButtonRef = useRef(null);
  const uploadRef = useRef(null);
  const saveButtonRef = useRef(null);

  // app tour steps
  const steps = [
    {
      title: "Add Row",
      description: "Click this button to add a new row to the table.",
      target: () => addRowRef.current,
    },
    {
      title: "Add Column",
      description: "Click this button to add a new column to the table.",
      target: () => addColumnRef.current,
    },
    {
      title: "Toggle Bold",
      description: "Click here to toggle the bold style for the selected text.",
      target: () => toggleBoldRef.current,
    },
    {
      title: "Change Background Color",
      description:
        "Use this color picker to change the background color of the selected cell.",
      target: () => backgroundColorRef.current,
    },
    {
      title: "Copy",
      description:
        "Click this button to copy the contents of the selected cell.",
      target: () => copyRef.current,
    },
    {
      title: "Paste",
      description:
        "Click this button to paste the copied content into the selected cell.",
      target: () => pasteRef.current,
    },
    {
      title: "Compute Formula",
      description:
        "Click here to compute the formula entered in the input field.",
      target: () => computeRef.current,
    },
    {
      title: "Clear Sheet",
      description:
        "Click this button to clear the contents of the entire sheet.",
      target: () => clearButtonRef.current,
    },
    {
      title: "Upload JSON",
      description:
        "Click here to upload a JSON file to populate the sheet with data.",
      target: () => uploadRef.current,
    },
    {
      title: "Save to JSON",
      description:
        "Click this button to save the current sheet as a JSON file.",
      target: () => saveButtonRef.current,
    },
  ];

  // Add row to the spreadsheet
  const addRow = () => {
    setGrid([
      ...grid,
      Array(grid[0].length).fill({ value: "", bold: false, bgColor: "" }),
    ]);
  };

  // Add column to the spreadsheet
  const addColumn = () => {
    setGrid(
      grid.map((row) => [...row, { value: "", bold: false, bgColor: "" }])
    );
  };

  // Handle cell selection and range selection
  const handleCellClick = (rowIndex, colIndex, isShiftKey) => {
    if (isShiftKey && selectedCell) {
      const startRow = Math.min(selectedCell.rowIndex, rowIndex);
      const endRow = Math.max(selectedCell.rowIndex, rowIndex);
      const startCol = Math.min(selectedCell.colIndex, colIndex);
      const endCol = Math.max(selectedCell.colIndex, colIndex);

      setSelectionRange({ startRow, endRow, startCol, endCol });
    } else {
      setSelectedCell({ rowIndex, colIndex });
      setSelectionRange(null);
    }
  };

  // Update cell value
  const handleInputChange = (rowIndex, colIndex, value) => {
    const updatedGrid = grid.map((row, rIdx) =>
      row.map((cell, cIdx) =>
        rIdx === rowIndex && cIdx === colIndex ? { ...cell, value } : cell
      )
    );
    setGrid(updatedGrid);
  };

  // Toggle bold formatting
  const toggleBold = () => {
    if (!selectedCell && !selectionRange) return;
    const updatedGrid = grid.map((row, rIdx) =>
      row.map((cell, cIdx) => {
        const inSelection =
          selectionRange &&
          rIdx >= selectionRange.startRow &&
          rIdx <= selectionRange.endRow &&
          cIdx >= selectionRange.startCol &&
          cIdx <= selectionRange.endCol;
        const isSelected =
          selectedCell &&
          rIdx === selectedCell.rowIndex &&
          cIdx === selectedCell.colIndex;
        if (inSelection || isSelected) {
          return { ...cell, bold: !cell.bold };
        }
        return cell;
      })
    );
    setGrid(updatedGrid);
  };

  // Change cell background color
  const changeBackgroundColor = (color) => {
    if (!selectedCell && !selectionRange) return;
    const updatedGrid = grid.map((row, rIdx) =>
      row.map((cell, cIdx) => {
        const inSelection =
          selectionRange &&
          rIdx >= selectionRange.startRow &&
          rIdx <= selectionRange.endRow &&
          cIdx >= selectionRange.startCol &&
          cIdx <= selectionRange.endCol;
        const isSelected =
          selectedCell &&
          rIdx === selectedCell.rowIndex &&
          cIdx === selectedCell.colIndex;
        if (inSelection || isSelected) {
          return { ...cell, bgColor: color };
        }
        return cell;
      })
    );
    setGrid(updatedGrid);
  };

  // Copy cell or range
  const handleCopy = () => {
    if (!selectedCell && !selectionRange) return;
    if (selectionRange) {
      const copiedRange = [];
      for (let r = selectionRange.startRow; r <= selectionRange.endRow; r++) {
        const row = [];
        for (let c = selectionRange.startCol; c <= selectionRange.endCol; c++) {
          row.push(grid[r][c]);
        }
        copiedRange.push(row);
      }
      setCopiedData(copiedRange);
    } else if (selectedCell) {
      const { rowIndex, colIndex } = selectedCell;
      setCopiedData([[grid[rowIndex][colIndex]]]);
    }
  };

  // Paste copied data into the selected cell or range
  const handlePaste = () => {
    if (!selectedCell || !copiedData) return;
    const { rowIndex, colIndex } = selectedCell;

    const updatedGrid = [...grid];
    copiedData.forEach((row, rIdx) => {
      row.forEach((cell, cIdx) => {
        const targetRow = rowIndex + rIdx;
        const targetCol = colIndex + cIdx;
        if (
          targetRow < updatedGrid.length &&
          targetCol < updatedGrid[0].length
        ) {
          updatedGrid[targetRow][targetCol] = { ...cell };
        }
      });
    });

    setGrid(updatedGrid);
  };

  // Save grid data as JSON file
  const saveToJSON = () => {
    const dataStr = JSON.stringify(grid);
    const blob = new Blob([dataStr], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "spreadsheet.json";
    link.click();
  };

  // Load grid data from uploaded JSON file
  const uploadFromJSON = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = JSON.parse(e.target.result);
        setGrid(data);
      };
      reader.readAsText(file);
    }
  };

  // Render individual cell
  const renderCell = (cell, rowIndex, colIndex) => {
    const isSelected =
      selectedCell &&
      selectedCell.rowIndex === rowIndex &&
      selectedCell.colIndex === colIndex;

    const isInRange =
      selectionRange &&
      rowIndex >= selectionRange.startRow &&
      rowIndex <= selectionRange.endRow &&
      colIndex >= selectionRange.startCol &&
      colIndex <= selectionRange.endCol;

    return (
      <td
        key={`${rowIndex}-${colIndex}`}
        style={{
          border: "2px solid black",
          backgroundColor: isInRange
            ? "lightblue"
            : isSelected
            ? "lightgray"
            : cell.bgColor,
        }}
        onClick={(e) => handleCellClick(rowIndex, colIndex, e.shiftKey)}
        onBlur={() => {
          if (cell.value.startsWith("=")) {
            setInputFormula(cell.value);
            evaluateFormula({ cellValue: cell.value });
          }
        }}
      >
        <input
          type="text"
          value={cell.value}
          onChange={(e) =>
            handleInputChange(rowIndex, colIndex, e.target.value)
          }
          style={{
            backgroundColor: "transparent",
            fontWeight: cell.bold ? "bold" : "normal",
            border: "none",
            outline: "none",
            width: "100%",
          }}
        />
      </td>
    );
  };

  const evaluateFormula = ({ cellValue = inputFormula }) => {
    // Convert formula to lowercase for case insensitivity
    const lowerCaseFormula = cellValue.toLowerCase();

    // Regex patterns
    const colonPattern = /=(sum|average)\(([a-z])([0-9]+):([a-z])([0-9]+)\)/;
    const commaPattern = /=(sum|average)\((([a-z][0-9]+),)+([a-z][0-9]+)\)/;

    // Check colon pattern (e.g., =SUM(A1:A2))
    if (colonPattern.test(lowerCaseFormula)) {
      const match = lowerCaseFormula.match(colonPattern);
      const operation = match[1]; // sum or average
      const startCol = match[2].charCodeAt(0) - 97; // Convert column letter to index
      const startRow = parseInt(match[3], 10) - 1; // Convert row to zero-based index
      const endCol = match[4].charCodeAt(0) - 97;
      const endRow = parseInt(match[5], 10) - 1;

      // Validate if the range is on the same row or column
      if (startCol !== endCol && startRow !== endRow) {
        messageApi.error(
          `Invalid formula: ranges must be on the same row or column.`
        );
      }

      // Extract values from the range
      const values = [];
      if (startCol === endCol) {
        // Same column
        for (let row = startRow; row <= endRow; row++) {
          const cellValue = parseFloat(grid[row][startCol]?.value || 0);
          values.push(cellValue);
        }
      } else {
        // Same row
        for (let col = startCol; col <= endCol; col++) {
          const cellValue = parseFloat(grid[startRow][col]?.value || 0);
          values.push(cellValue);
        }
      }

      // Perform the operation
      const result =
        operation === "sum"
          ? values.reduce((acc, val) => acc + val, 0)
          : values.reduce((acc, val) => acc + val, 0) / values.length;
      const updatedGrid = grid.map((row, rIdx) =>
        row.map((cell, cIdx) =>
          rIdx === selectedCell.rowIndex && cIdx === selectedCell.colIndex
            ? { ...cell, value: `${result}` }
            : cell
        )
      );
      setGrid(updatedGrid);
      return true;
    }

    // Check comma pattern (e.g., =SUM(A1,A2,A3))
    if (commaPattern.test(lowerCaseFormula)) {
      const match = lowerCaseFormula.match(commaPattern);
      const operation = match[1]; // sum or average
      const cellMatches = lowerCaseFormula
        .match(/\b[a-z][0-9]+\b/g)
        .map((cell) => {
          const colIndex = cell[0].charCodeAt(0) - 97; // Column letter to index
          const rowIndex = parseInt(cell.slice(1), 10) - 1; // Row to zero-based index
          return parseFloat(grid[rowIndex][colIndex]?.value || 0);
        });

      // Perform the operation
      const result =
        operation === "sum"
          ? cellMatches.reduce((acc, val) => acc + val, 0)
          : cellMatches.reduce((acc, val) => acc + val, 0) / cellMatches.length;

      const updatedGrid = grid.map((row, rIdx) =>
        row.map((cell, cIdx) =>
          rIdx === selectedCell.rowIndex && cIdx === selectedCell.colIndex
            ? { ...cell, value: `${result}` }
            : cell
        )
      );
      setGrid(updatedGrid);
      return true;
    }

    // If no valid pattern is matched
    messageApi.error(`Invalid formula pattern`);
    return false;
  };

  const getColumnLabel = (colIndex) => {
    let label = "";
    colIndex++; // Convert to 1-based index for easier mapping
    while (colIndex > 0) {
      colIndex--; // Adjust for 0-based indexing
      label = String.fromCharCode(65 + (colIndex % 26)) + label;
      colIndex = Math.floor(colIndex / 26);
    }
    return label;
  };

  return (
    <>
      {/* Context Holder is to show the error message */}
      {contextHolder}
      <Space
        style={{
          marginTop: "20px",
          marginLeft: "20px",
        }}
      >
        <Button onClick={addRow} ref={addRowRef}>
          <PlusOutlined />
          Add Row
        </Button>
        <Button onClick={addColumn} ref={addColumnRef}>
          <PlusOutlined />
          Add Column
        </Button>
        <Button onClick={toggleBold} ref={toggleBoldRef}>
          Toggle Bold
        </Button>
        <ColorPicker
          ref={backgroundColorRef}
          defaultValue="white"
          onChangeComplete={(e) => changeBackgroundColor(e.toHexString())}
        />
        <Button onClick={handleCopy} ref={copyRef}>
          <CopyOutlined />
          Copy
        </Button>
        <Button onClick={handlePaste} ref={pasteRef}>
          <CopyOutlined />
          Paste
        </Button>
        <Space.Compact
          style={{
            width: "300px",
          }}
        >
          <Input
            onChange={(e) => setInputFormula(e.target.value)}
            placeholder="Add your formula here"
          />
          <Button ref={computeRef} onClick={() => evaluateFormula({})}>
            <FunctionOutlined />
            Compute
          </Button>
        </Space.Compact>
        <Button onClick={() => setGrid(defaultGridValue)} ref={clearButtonRef}>
          Clear Sheet
        </Button>

        <input
          type="file"
          accept="application/json"
          onChange={uploadFromJSON}
          ref={uploadRef}
        />
        <Button onClick={saveToJSON} ref={saveButtonRef}>
          <DownloadOutlined />
          Save as JSON
        </Button>

        <FloatButton.Group
          trigger="click"
          onClick={() => {
            setInfoStatus(true);
            localStorage.setItem("infoStatus", true);
          }}
          style={{
            insetInlineEnd: 24,
          }}
          badge={{
            count: infoStatus ? 0 : 2,
            color: "teal",
          }}
          icon={<InfoCircleOutlined />}
        >
          <FloatButton
            description="Start Tour"
            shape="square"
            onClick={() => setOpen(true)}
            style={{
              width: 60,
              height: 60,
              fontSize: 14,
            }}
          />
          <FloatButton
            description="Read Docs"
            onClick={() => setDocsModalOpen(true)}
            shape="square"
            style={{ width: 60, height: 60, fontSize: 14 }}
          />
        </FloatButton.Group>

        <ReadDocsModal
          visible={isDocsModalOpen}
          onClose={() => setDocsModalOpen(false)}
        />
      </Space>

      <div
        style={{
          overflowX: "auto",
          marginTop: "20px",
          width: "100vw",
          marginLeft: "20px",
        }}
      >
        <table>
          <thead>
            <tr>
              <th></th>
              {grid[0].map((_, colIndex) => (
                <th key={colIndex}>{getColumnLabel(colIndex)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {grid.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <th>{rowIndex + 1}</th>
                {row.map((cell, colIndex) =>
                  renderCell(cell, rowIndex, colIndex)
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
    </>
  );
};

export default Spreadsheet;
