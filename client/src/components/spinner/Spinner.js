import React from "react";
import { Row, Spinner } from "reactstrap";

export const GrowingSpinner = (
  <>
    <Row className="d-flex justify-content-center m-5">
      <Spinner
        style={{ width: "2rem", height: "2rem" }}
        type="grow"
        color="primary"
      />
      <Spinner
        style={{ width: "2rem", height: "2rem" }}
        type="grow"
        color="success"
      />
      <Spinner
        style={{ width: "2rem", height: "2rem" }}
        type="grow"
        color="dark"
      />
    </Row>
  </>
);
