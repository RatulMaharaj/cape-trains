import React from "react";

export default function Page() {
  return (
    <div className="flex flex-col gap-y-2">
      <select className="select select-bordered w-full max-w-xs md:max-w-md">
        <option disabled selected>
          Select a line
        </option>
        <option>Southern line</option>
        <option>Nothern line</option>
      </select>

      <select className="select select-bordered w-full max-w-xs md:max-w-md">
        <option disabled selected>
          Select schedule
        </option>
        <option>Monday - Friday</option>
        <option>Saturday</option>
        <option>Sunday / Public Holidays</option>
      </select>

      <div className="flex gap-x-2">
        <select className="select select-bordered w-full max-w-xs md:max-w-md">
          <option disabled selected>
            Departure station
          </option>
          <option>Monday - Friday</option>
          <option>Saturday</option>
          <option>Sunday / Public Holidays</option>
        </select>

        <select className="select select-bordered w-full max-w-xs md:max-w-md">
          <option disabled selected>
            Arrival station
          </option>
          <option>Weekday</option>
          <option>Saturday</option>
          <option>Sunday</option>
        </select>
      </div>
    </div>
  );
}
