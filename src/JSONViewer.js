import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

const JSONViewer = () => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [editedJson, setEditedJson] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const copyToClipboard = () => {
    const jsonString = JSON.stringify(editedJson, null, 2);
    navigator.clipboard.writeText(jsonString);
    setCopySuccess(true);
  };

  const convertToJson = (obj) => {
    return JSON.stringify(obj, null, 2);
  };

  const handleJsonChange = (event) => {
    try {
      const jsonData = JSON.parse(event.target.value);
      if (typeof jsonData === "object") {
        setEditedJson(jsonData);
        setErrorMessage("");
      } else {
        setEditedJson("");
        setErrorMessage("Invalid JSON format");
      }
    } catch (error) {
      setEditedJson("");
      setErrorMessage("Invalid JSON format");
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col sm={4}>
          <Form.Control
            as="textarea"
            placeholder="Enter JSON data here"
            value={typeof editedJson === "object" ? JSON.stringify(editedJson, null, 2) : editedJson}
            onChange={handleJsonChange}
            style={{ height: "400px", fontSize: "14px" }}
          />
          {errorMessage && <div className="text-danger">{errorMessage}</div>}
        </Col>
        <Col sm={4} className="d-flex align-items-center justify-content-center">
          <Button onClick={copyToClipboard} className="mt-3">
            {copySuccess ? "Copied!" : "Copy to Clipboard"}
          </Button>
        </Col>
        <Col sm={4}>
          <SyntaxHighlighter language="json" style={dark}>
            {convertToJson(editedJson)}
          </SyntaxHighlighter>
        </Col>
      </Row>
    </Container>
  );
};

export default JSONViewer;
