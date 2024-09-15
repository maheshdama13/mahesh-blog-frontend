import React from "react";

export default function CustomTextArea({ label, className, ...props }) {
  return (
    <>
      <label
        htmlFor="message"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <textarea
        id="message"
        rows="4"
        className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 ${className}`}
        placeholder="Write your thoughts here..."
        {...props}
      ></textarea>
    </>
  );
}
