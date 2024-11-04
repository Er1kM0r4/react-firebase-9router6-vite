import { forwardRef } from "react";

export const FormInput = forwardRef(
  (
    { type, placeholder, onChange, onBlur, name, label, error, children },
    ref
  ) => {
    const errorClassLabel = `block mb-2 text-sm font-medium ${
      error ? "text-red-700 dark:text-red-500" : "text-gray-900 dark:text-white"
    }`;

    const errorInput = error
      ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
      : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
    return (
      <div className="mb-6">
        <label htmlFor={name} className={errorClassLabel}>
          {label}
        </label>
        <input
          className={errorInput}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          ref={ref}
        />
        {children}
      </div>
    );
  }
);
