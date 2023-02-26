import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaCopy } from "react-icons/fa";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import prettier from "prettier/standalone";
import babelParser from "prettier/parser-babel";
import { Form, Container, Row, Col } from "react-bootstrap";
import "./CodeFormatter.css";

function CodeFormatter() {
  const [code, setCode] = useState("");
  const [formattedCode, setFormattedCode] = useState("");

  function handleChange(event) {
    setCode(event.target.value);
  }

  function handleCopy() {
    alert("Code copied to clipboard!");
  }

  function handleFormat() {
    // Use Prettier to format the code and update the formattedCode state
    const formatted = prettier.format(code, {
      parser: "babel",
      plugins: [babelParser],
    });
    setFormattedCode(formatted);
  }

  return (
    <Container className="code-formatter-container">
      <Row className="justify-content-center">
        <Col md={6}>
          <Form.Control
            as="textarea"
            value={code}
            onChange={handleChange}
            placeholder="Paste your code here"
            className="code-formatter-textarea"
          />
          <button className="code-formatter-button" onClick={handleFormat}>
            Format
          </button>
        </Col>
      </Row>
      {formattedCode && (
        <Row className="mt-3 justify-content-center">
          <Col md={6}>
            <CopyToClipboard text={formattedCode} onCopy={handleCopy}>
              <button className="code-formatter-button mb-3">
                <FaCopy /> Copy to Clipboard
              </button>
            </CopyToClipboard>
            <SyntaxHighlighter
              language="javascript"
              style={darcula}
              className="code-formatter-syntax"
            >
              {formattedCode}
            </SyntaxHighlighter>
          </Col>
        </Row>
      )}
    </Container>
  );
}

function App() {
  return (
    <div>
      <CodeFormatter />
    </div>
  );
}

export default App;