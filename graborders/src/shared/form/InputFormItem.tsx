
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";
import FormErrors from "./FormErrors";
import Message from "src/view/shared/message";

export function InputFormItem(props) {
  const {
    label,
    description,
    name,
    hint,
    type,
    placeholder,
    autoFocus,
    autoComplete,
    required,
    externalErrorMessage,
    disabled,
    endAdornment,
    className,
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  
  const {
    register,
    errors,
    formState: { touched, isSubmitted },
  } = useFormContext();

  if (externalErrorMessage) {
    Message.error(externalErrorMessage);
  }
  
  const errorMessage = FormErrors.errorMessage(
    name,
    errors,
    touched,
    isSubmitted
  );

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Determine the input type based on whether it's a password and if we should show it
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="input-group">
      {Boolean(label) && (
        <label
          className={`input-label ${required ? "required" : null}`}
          htmlFor={name}
        >
          {label}
        </label>
      )}
      {description}
      <div 
        className="input-container" 
        style={{ 
          position: 'relative',
          ...(className === "captcha-input" ? { padding: 0 } : {})
        }}
      >
        <input
          className={`${className} ${
            errorMessage ? "__danger" : ""
          }`}
          id={name}
          name={name}
          type={inputType}
          ref={register}
          onChange={(event) => {
            props.onChange && props.onChange(event.target.value);
          }}
          onBlur={(event) => {
            props.onBlur && props.onBlur(event);
          }}
          placeholder={placeholder || undefined}
          autoFocus={autoFocus || undefined}
          autoComplete={autoComplete || undefined}
          disabled={disabled}
          style={type === "password" ? { 
            paddingRight: "40px",
            width: "100%"
          } : { width: "100%" }}
        />
        
        {/* Eye icon for password fields - positioned inside input */}
        {type === "password" && (
          <div 
            className="toggle-password" 
            onClick={togglePasswordVisibility}
            style={{
              position: "absolute",
              right: "12px",
              top: "38%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "#888",
              zIndex: 2,
              background: "transparent",
              border: "none",
              padding: "8px"
            }}
          >
            <i className={showPassword ? "far fa-eye-slash" : "far fa-eye"} />
          </div>
        )}
      </div>
      {endAdornment && (
        <div className="input-group-append">
          <span className="input-group-text">{endAdornment}</span>
        </div>
      )}
    
      <div className="invalid-feedback">{errorMessage}</div>
      {Boolean(hint) && <small className="form-text text-muted">{hint}</small>}
    </div>
  );
}

InputFormItem.defaultProps = {
  type: "text",
  required: false,
};

InputFormItem.propTypes = {
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  type: PropTypes.string,
  label: PropTypes.string,
  description: PropTypes.string,
  hint: PropTypes.string,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  prefix: PropTypes.string,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,
  externalErrorMessage: PropTypes.string,
  endAdornment: PropTypes.any,
  onChange: PropTypes.any,
  className: PropTypes.string,
};

export default InputFormItem;