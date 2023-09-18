import React from "react";
import "./Error.css";

export default function Error() {
  return (
    <div className="error">
      <div className="error__modal">
        <div className="error__modal__screen">
          <div className="error__modal__screen__content">
            <div className="error__modal__message">
              <div className="error__modal__message__heading">Error 404</div>
              <div className="error__modal__message__text">Page not found</div>
            </div>
          </div>
          <div className="error__modal__screen__background">
            <span className="error__modal__screen__background__shape shape1"></span>
            <span className="error__modal__screen__background__shape shape2"></span>
            <span className="error__modal__screen__background__shape shape3"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
