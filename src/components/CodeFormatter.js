import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaCopy } from 'react-icons/fa';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import prettier from 'prettier/standalone';
import babelParser from 'prettier/parser-babel';
import { Form, Container, Row, Col, Navbar } from 'react-bootstrap';
import './style/CodeFormatter.css';

function CodeFormatter() {
  const [code, setCode] = useState('');
  const [formattedCode, setFormattedCode] = useState('');

  function handleChange(event) {
    setCode(event.target.value);
  }

  function handleCopy() {
    alert('Code copied to clipboard!');
  }

  function handleFormat(event) {
    event.preventDefault();
    // Use Prettier to format the code and update the formattedCode state
    const formatted = prettier.format(code, {
      parser: 'babel',
      plugins: [babelParser],
      singleQuote: true,
    });
    setFormattedCode(formatted);
  }

  return (
    <div className="code-formatter-container">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>React/Javascript Code Formatter</Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="d-flex flex-column align-items-center justify-content-center h-100">
        <Row className="justify-content-center">
          <Col md={4}>
            <Form.Label className="text-light">
              This tool helps you format your JavaScript code with Prettier.
            </Form.Label>
          </Col>
          <Col md={4}>
            <Form onSubmit={handleFormat}>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  value={code}
                  onChange={handleChange}
                  placeholder="Paste your code here"
                  className="code-formatter-textarea"
                />
                <div className="d-flex justify-content-end">
                  <button type="submit" className="code-formatter-button">
                    Format
                  </button>
                </div>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        {formattedCode && (
          <Row className="mt-3 justify-content-center">
            <Col md={8}>
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
    </div>
  );
}

export default CodeFormatter;
