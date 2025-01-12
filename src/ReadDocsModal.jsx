import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { marked } from "marked";

const ReadDocsModal = ({ visible, onClose }) => {
  const [markdownContent, setMarkdownContent] = useState("");

  useEffect(() => {
    // Fetch the Markdown file
    fetch("/docs.md")
      .then((response) => response.text())
      .then((text) => setMarkdownContent(marked(text)));
  }, []);

  return (
    <Modal visible={visible} onCancel={onClose} footer={null} width={800}>
      <div
        dangerouslySetInnerHTML={{ __html: markdownContent }}
        style={{ maxHeight: "500px", overflowY: "auto" }}
      />
    </Modal>
  );
};

export default ReadDocsModal;
