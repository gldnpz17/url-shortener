import { useState } from "react";
import { Button, Card, Col, Container, Form, FormControl, InputGroup, Jumbotron, Row } from "react-bootstrap";

const HomePage = () => {
  const [shortName, setShortName] = useState("");
  const [longUrl, setLongUrl] = useState("");

  const createShortenedUrl = async () => {
    var response = await fetch('/api/url', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        shortName: shortName,
        longUrl: longUrl,
      })
    });

    if (response.status === 200) {
      window.alert("success");
      setShortName("");
      setLongUrl("");
    } else {
      window.alert(`${response.status}:${(await response.json()).error}`);
    }
  }

  return(
   <Container fluid className="h-100 d-flex" style={{backgroundColor: "whitesmoke"}}>
      <Row className="w-100 m-0 align-self-center justify-content-center">
        <Col className="col-12 col-lg-10 col-xl-8 mx-auto">
          <h1 className="text-center mb-0 display-5">short.gldnpz.com</h1>
          <h5 className="text-center mb-3 display-5">the not-so-short url shortener</h5>
          <Card>
            <Card.Body>
              <Form>
                <Form.Group controlId="formShortUrl">
                  <Form.Label>Short URL</Form.Label>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>short.gldnpz.com/</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control type="shortUrl" placeholder="example" value={shortName} onChange={(e) => {
                      setShortName(e.target.value);
                      }}/>
                  </InputGroup>
                </Form.Group>
                <Form.Group controlId="formLongUrl">
                  <Form.Label>Long URL</Form.Label>
                  <Form.Control type="longUrl" placeholder="https://example.com/path" value={longUrl} onChange={(e) => {
                    setLongUrl(e.target.value);
                  }}/>
                </Form.Group>
                <div className="d-flex justify-content-center">
                  <Button style={{width: "10rem"}} onClick={createShortenedUrl}>save</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
          <h5 className="text-center mt-3">©Firdaus Bisma S</h5>
        </Col>
      </Row>
   </Container>
  );
}

export default HomePage;