import React, { useEffect } from "react";
import {
  ExclamationCircleFill,
  X,
  CheckCircleFill,
} from "react-bootstrap-icons";
import "./Alert.css";
import { useSelector, useDispatch } from "react-redux";
import { hideGeneralAlert } from "../../redux/generalDucks";
const Alert = () => {
  const dispatch = useDispatch();
  const alert = useSelector((store) => store.general.alert);
  useEffect(() => {
    setTimeout(() => {
      dispatch(hideGeneralAlert());
    }, 3500);
  }, [dispatch]);
  return (
    <div>
      <div
        className={`custom-alert ${alert.show ? "show" : "hide"} ${
          alert.type === "success" ? "success" : "error-bg"
        }`}
      >
        {alert.type === "success" ? (
          <CheckCircleFill className="success-alert" />
        ) : (
          <ExclamationCircleFill className="exclamation-alert" />
        )}
        <span
          className={`msg ${alert.type === "success" ? "success" : "error-bg"}`}
        >
          {alert.msg}
        </span>
        <span
          className={`close-btn pointer ${
            alert.type === "success" ? "success" : "error-bg"
          }`}
          onClick={() => dispatch(hideGeneralAlert())}
        >
          <X className="close" />
        </span>
      </div>
    </div>
  );
};

export default Alert;
