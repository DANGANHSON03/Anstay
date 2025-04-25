import React from "react";
import "./FormComponent.css";

const FormComponent = ({
  title,
  formFields,
  formData,
  handleChange,
  handleSubmit,
  submitButtonText,
}) => {
  return (
    <div className="form-container">
      <div className="form-header">
        <h1 className="form-titleqr">{title}</h1>
        <div className="form-divider" />
        <div className="form-description">
          <p className="light-text">
            Please fill in the details below to generate your QR code
          </p>
        </div>
      </div>

      <div className="toolbar">{/* Toolbar content */}</div>

      <form onSubmit={handleSubmit}>
        {formFields.map((field, index) => (
          <div key={index} className="form-field">
            <label>
              {field.label}
              {field.required && <span className="required">*</span>}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              placeholder={field.placeholder}
              required={field.required}
              className="form-input"
            />
          </div>
        ))}
        <button type="submit" className="submit-button">
          {submitButtonText}
        </button>
      </form>
    </div>
  );
};

export default FormComponent;
