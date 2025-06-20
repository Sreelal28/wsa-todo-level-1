import React, { forwardRef } from "react";
import clsx from "clsx";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CustomDatePicker({
  name,
  date,
  onDateChange,
  isClear = true,
}) {
  const CustomInput = forwardRef(({ value, onClick }, ref) => {
    const formatedData = value
      ? moment(new Date(value)).format("DD MMM YYYY")
      : "Due Date";
    return (
      <button
        className={clsx(
          "datepicker-btn",
          value ? "date-input-value" : "date-input-placeholder"
        )}
        onClick={onClick}
        ref={ref}
      >
        {" "}
        {formatedData}
      </button>
    );
  });
  return (
    <div className="input-field-datepicker">
      <DatePicker
        name={name}
        selected={date}
        onChange={onDateChange}
        isClearable={isClear}
        customInput={<CustomInput />}
      />
    </div>
  );
}
