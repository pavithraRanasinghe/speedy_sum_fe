import React, { useState } from "react";
import "./css/Home.css";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FloatingLabel,
  Button,
  ButtonGroup,
  ToggleButton,
  Row,
  Col,
  Offcanvas,
  ListGroup,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as Constants from "./../common/Constants";
import request from "./../common/APIManager";
import MultiRangeSlider from "../components/MultiRangeSlider";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { getUser } from "../common/PersistanceManager";

const Home = () => {
  const [radioValue, setRadioValue] = useState("0");
  const [isSummarized, setIsSummarized] = useState(false);
  const [source, setSource] = useState("");
  const [webPageLink, setWebPageLink] = useState("");
  const [summarizeText, setSummarizeText] = useState("");
  const [keyPhrases, setKeyPhrases] = useState([]);
  const [minLength, setMinLength] = useState(50);
  const [maxLength, setMaxLength] = useState(500);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

  const radios = [
    { name: "TEXT", value: "0" },
    { name: "LINK", value: "1" },
  ];

  const onTextChange = (event) => {
    setSource(event.target.value);
  };

  const onLinkChange = (event) => {
    setWebPageLink(event.target.value);
  };

  const onSummarize = () => {
    const userId = getUser() ? getUser().id : 0;
    const url = "sum";
    if (radioValue === "0") {
      if (source === "") {
        return;
      }
      setIsLoading(true);
      const body = JSON.stringify({
        text: source,
        min: minLength,
        max: maxLength,
        user: userId,
      });
      console.log(body);
      request(url + "/text", Constants.POST, body)
        .then((res) => {
          setSummarizeText(res.summary);
          setKeyPhrases(res.keyPhrases);
          setIsSummarized(true);
        })
        .catch((error) => {
          toast.error(error.detail);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      if (webPageLink === "") {
        return;
      }
      setIsLoading(true);
      const body = JSON.stringify({
        text: webPageLink,
        min: minLength,
        max: maxLength,
        user: userId,
      });
      request(url + "/link", Constants.POST, body)
        .then((res) => {
          setSummarizeText(res.summary);
          setKeyPhrases(res.keyPhrases);
          setIsSummarized(true);
        })
        .catch((error) => {
          toast.error(error.detail);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const resetSummary = () => {
    setIsSummarized(false);
    setSummarizeText("");
    setSource("");
    setWebPageLink("");
  };

  const handleClose = () => setShow(false);

  const onHistory = () => {
    setShow(true);
  };

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#">SPEEDY SUM</Navbar.Brand>
          <Navbar.Toggle />
          <Nav className="me-auto">
            <Nav.Link onClick={onHistory}>History</Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            {getUser() !== null && (
              <Navbar.Text>Welcome : {getUser().name}</Navbar.Text>
            )}
            {getUser() === null && (
              <Link to="/register">
                <Button>Register</Button>
              </Link>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>History</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup>
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
      <h1 className="title">SPEEDY SUM</h1>
      <p className="subTitle">
        Speedy Sum is for people who need to do something new & creative
      </p>
      <Row>
        <Col>
          <ButtonGroup className="btn_group">
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant="outline-primary"
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </Col>
        <Col>
          <MultiRangeSlider
            min={50}
            max={500}
            onChange={({ min, max }) => {
              setMinLength(min);
              setMaxLength(max);
            }}
          />
        </Col>
      </Row>
      <Form>
        {radioValue === "0" && (
          <FloatingLabel label="TEXT" className="textArea">
            <Form.Control
              as="textarea"
              placeholder="Add text"
              style={{ height: "150px" }}
              value={source}
              onChange={onTextChange}
            />
          </FloatingLabel>
        )}
        {radioValue === "1" && (
          <FloatingLabel label="LINK" className="textArea">
            <Form.Control
              as="textarea"
              placeholder="Add text"
              value={webPageLink}
              onChange={onLinkChange}
            />
          </FloatingLabel>
        )}
        {isSummarized && (
          <>
            <Row>
              <Col>
                <p className="result_label">RESULT</p>
              </Col>
              <Col>
                <Button className="reset_btn" onClick={resetSummary}>
                  CLEAR
                </Button>
              </Col>
            </Row>
            <FloatingLabel label="TEXT" className="textArea">
              <Form.Control
                as="textarea"
                placeholder="Add text"
                value={summarizeText}
                onChange={() => {}}
                style={{ height: "150px" }}
              />
            </FloatingLabel>
            <Row className="justify-content-start">
              <Col xs={12} md={8}>
                <h4 className="tag-label">TAGS</h4>
                <Row className="justify-content-center key-list">
                  <ButtonGroup>
                    {keyPhrases.map((key, index) => (
                      <div key={index} className="tag">
                        {key}
                      </div>
                    ))}
                  </ButtonGroup>
                </Row>
              </Col>
            </Row>
          </>
        )}
      </Form>
      <div className="button_container">
        <Button className="sum_btn" onClick={onSummarize}>
          SUMMARIZE
        </Button>
      </div>
      <ToastContainer />
      {isLoading && <Loader />}
    </>
  );
};

export default Home;
