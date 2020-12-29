import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

const makeID = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const WatchNow = (props) => {
  const { url, id, setID } = props;
  let render;
  if (id === null) {
    render = (
      <Button
        variant="primary"
        onClick={() => {
          setID(makeID(7));
        }}
      >
        Click here to enable this game to be watched
      </Button>
    );
  } else {
    const link = `${url}watch/${id}`;
    render = (
      <>
        <a href={link}>
          <p>Click here to see the watch link</p>
        </a>
        <p>Or share the watch link: {link}</p>
      </>
    );
  }
  return (
    <Row style={props.style}>
      <Col align="center">{render}</Col>
    </Row>
  );
};

export default WatchNow;
