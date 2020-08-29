import React from "react";
import { Row, Col } from "reactstrap";

const Footer = () => {
  const thisYear = () => {
    const year = new Date().getFullYear();

    return year;
  };

  return (
    // m-auto: margin auto, p-2: padding 0.25ren
    <div id="main-footer" className="text-center p-2">
      <Row>
        <Col>
          <p>
            Copyright &copy; <span>{thisYear()}</span>
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;