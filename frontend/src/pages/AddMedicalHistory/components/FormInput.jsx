import React from "react";

const FormInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  icon: Icon,
  isTextArea = false,
  rows = 4,
}) => {
  const InputComponent = isTextArea ? "textarea" : "input";

  return (
    <div>
      <label className="text-sm font-medium text-gray-700 block mb-1">
        {label}
      </label>
      <div className="relative">
        <InputComponent
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          className={`w-full p-3 border border-gray-300 rounded-lg ${
            Icon ? "pr-10" : ""
          } ${type === "date" ? "appearance-none" : ""}`}
          placeholder={placeholder}
          required={required}
        />
        {Icon && (
          <Icon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        )}
      </div>
    </div>
  );
};

export default FormInput;
