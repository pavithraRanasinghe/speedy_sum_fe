import React, { useState } from "react";
import "./css/Home.css";
import {
  Navbar,
  Container,
  Form,
  FloatingLabel,
  Button,
  ButtonGroup,
  ToggleButton,
  Row,
  Col,
} from "react-bootstrap";

import * as Constants from "./../common/Constants";
import request from "./../common/APIManager";
import MultiRangeSlider from "../components/MultiRangeSlider";

const Home = () => {
  const [radioValue, setRadioValue] = useState("0");
  const [isSummarized, setIsSummarized] = useState(false);
  const [source, setSource] = useState("");
  const [summarizeText, setSummarizeText] = useState("");
  const [minLength, setMinLength] = useState(50);
  const [maxLength, setMaxLength] = useState(500);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const radios = [
    { name: "TEXT", value: "0" },
    { name: "LINK", value: "1" },
  ];

  const onTextChange = (event) => {
    console.log(event);
    setSource(event.target.value);
  };

  const onSummarize = () => {
    const url = "sum";
    if (radioValue === "0") {
      const body = JSON.stringify({
        text: source,
        min: minLength,
        max: maxLength
      });
      request(url + "/text", Constants.POST, body)
        .then((res) => {
          setSummarizeText(res[0].summary_text);
          setIsSummarized(true);
        })
        .catch((error) => {
          console.log("ERROR : ", error);
        });
    }
  };

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#">SPEEDY SUM</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {/* <Navbar.Text>
              Welcome : <a href="#login">Mark Otto</a>
            </Navbar.Text> */}
            <Button>Register</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <h1 className="title">SPEEDY SUM</h1>
      <p className="subTitle">
        Speedy Sum is for people who need to do something new, creative
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
            onChange={({ min, max }) =>{
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
              onChange={onTextChange}
            />
          </FloatingLabel>
        )}
        {radioValue === "1" && (
          <FloatingLabel label="LINK" className="textArea">
            <Form.Control as="textarea" placeholder="Add text" />
          </FloatingLabel>
        )}
        {isSummarized && (
          <>
            <p className="result_label">RESULT</p>
            <FloatingLabel label="TEXT" className="textArea">
              <Form.Control
                as="textarea"
                placeholder="Add text"
                value={summarizeText}
                style={{ height: "150px" }}
              />
            </FloatingLabel>
          </>
        )}
      </Form>
      <div className="button_container">
        <Button className="sum_btn" onClick={onSummarize}>
          SUMMARIZE
        </Button>
      </div>
    </>
  );
};

export default Home;
