import { useState, useEffect } from "react";
import prettier from "prettier/standalone";
import babelParser from "prettier/parser-babel";
import { Form, Container, Row, Col } from "react-bootstrap";

function CodeFormatter() {
  const [code, setCode] = useState("");
  const [formattedCode, setFormattedCode] = useState("");

  useEffect(() => {
    // Use Prettier to format the code and update the formattedCode state
    const formatted = prettier.format(code, {
      parser: "babel",
      plugins: [babelParser],
    });
    setFormattedCode(formatted);
  }, [code]);

  function handleChange(event) {
    setCode(event.target.value);
  }

  return (
    <Container>
      <Row className="mt-5">
        <Col md={{ span: 6, offset: 3 }}>
          <Form.Control
            as="textarea"
            value={code}
            onChange={handleChange}
            placeholder="Paste your code here"
            style={{ height: "300px" }}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={{ span: 6, offset: 3 }}>
          <pre className="bg-light p-3" style={{ whiteSpace: "pre-wrap" }}>
            {formattedCode}
          </pre>
        </Col>
      </Row>
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