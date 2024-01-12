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
} from "react-bootstrap";

const Home = () => {
  const [radioValue, setRadioValue] = useState("0");
  const [isSummarized, setIsSummarized] = useState(false);

  const radios = [
    { name: "TEXT", value: "0" },
    { name: "LINK", value: "1" },
  ];
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
      {radioValue === "0" && (
        <FloatingLabel label="TEXT" className="textArea">
          <Form.Control
            as="textarea"
            placeholder="Add text"
            style={{ height: "150px" }}
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
              style={{ height: "150px" }}
            />
          </FloatingLabel>
        </>
      )}
      <div className="button_container">
        <Button className="sum_btn">SUMMARIZE</Button>
      </div>
    </>
  );
};

export default Home;
