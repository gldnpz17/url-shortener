import { useState } from "react";
import { Form } from "react-bootstrap"
import ValidityStatusEnum from "../enums/ValidityStatus";

const ValidatedFormGroup = (props) => {
  return (
    <Form.Group>
      <div className="d-flex mb-1">
        <Form.Label style={{fontWeight: "bold"}} className="flex-grow-1 mb-0">{props.label}</Form.Label>
        <Form.Label 
          style={
            (props.validity === ValidityStatusEnum.neutral) ? {color: "black"} : 
            (props.validity === ValidityStatusEnum.valid) ? {color: "green"} : 
            {color: "red"}} className="mr-1 mb-0">{props.message}
        </Form.Label>
        {(props.validity === null) ? null :
            (props.validity === ValidityStatusEnum.neutral) ? null :
            (props.validity === ValidityStatusEnum.valid) ?
              <svg style={{width: "1.2em", height: "1.2em"}} viewBox="0 0 24 24" className="my-auto">
                <path fill="green" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
              </svg>
              :
              <svg style={{width: "1.2em", height: "1.2em"}} viewBox="0 0 24 24" className="my-auto">
                <path fill="red" d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
              </svg>
        }
      </div>
      {props.children}
    </Form.Group>
  );
};

export default ValidatedFormGroup;