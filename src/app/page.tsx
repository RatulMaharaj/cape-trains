/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import SelectMenu from "@/components/combobox";
import { useQuery } from "@tanstack/react-query";
import { trainLines } from "@/lib/lines";
import { properCase } from "@/lib/text";

export default function Page() {
  const [line, setLine] = useState(trainLines[0]);

  // Automatically set the schedule based on the day of the week
  const d = new Date();
  const dayInt = d.getDay();
  let dayOfWeek = "Mon-Fri";
  switch (dayInt) {
    case 0:
      dayOfWeek = "Sunday / Public Holiday";
      break;
    case 6:
      dayOfWeek = "Saturday";
      break;
    default:
      dayOfWeek = "Mon-Fri";
  }

  const [day, setDay] = useState(dayOfWeek);
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");

  const { data: stations, isLoading: isStationsLoading } = useQuery({
    queryKey: ["stations", line],
    queryFn: async () => {
      const response = await fetch(`/api/stations?line=${line}`, {});
      return response.json() as Promise<string[]>;
    },
    enabled: !!line,
  });

  const { data: schedules, isLoading: isSchedulesLoading } = useQuery({
    queryKey: ["schedules", line, departure, arrival],
    queryFn: async () => {
      const response = await fetch(
        `/api/schedules?line=${line}&departure=${departure}&arrival=${arrival}`,
      );
      return response.json() as Promise<
        {
          trainNumber: string;
          departureStation: string;
          arrivalStation: string;
          departureTime: string;
          arrivalTime: string;
        }[]
      >;
    },
    enabled: !!line && !!departure && !!arrival,
  });

  console.log({ day });

  return (
    <>
      <div className="flex flex-col gap-x-2 gap-y-2 w-full items-center justify-center">
        <p className="font-medium text-xs mb-2">
          Please select departure and arrival stations
        </p>
        <div className="flex-col md:flex-row flex items-center justify-center w-full gap-2 mb-2">
          <SelectMenu
            options={trainLines.map((line) => {
              return {
                value: line,
                label: properCase(line),
              };
            })}
            onChange={(item) => {
              setDeparture(item.value);
            }}
            placeholder="From?"
          />
          <SelectMenu
            options={trainLines
              .map((line) => {
                if (line !== departure) {
                  return {
                    value: line,
                    label: properCase(line),
                  };
                } else {
                  return null;
                }
              })
              .filter((item) => item !== null)}
            onChange={(item) => {
              setArrival(item.value);
            }}
            placeholder="To?"
          />
        </div>
        <div className="join">
          <input
            className="join-item btn btn-sm"
            type="radio"
            name="day"
            onChange={() => setDay("Mon-Fri")}
            checked={day === "Mon-Fri"}
            aria-label="Mon-Fri"
          />
          <input
            className="join-item btn btn-sm"
            type="radio"
            name="day"
            onChange={() => setDay("Saturday")}
            checked={day === "Saturday"}
            aria-label="Saturday"
          />
          <input
            className="join-item btn btn-sm"
            type="radio"
            name="day"
            onChange={() => setDay("Sunday / Public Holiday")}
            checked={day === "Sunday / Public Holiday"}
            aria-label="Sunday / Public Holiday"
          />
        </div>

        {isSchedulesLoading ? null : (
          <div className="w-full flex flex-col gap-y-4 my-8">
            {schedules?.map((train, index) => {
              console.log(train);
              return (
                <div
                  key={index}
                  className="card card-bordered p-4 bg-base-200 hover:bg-base-300 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center justify-center w-full text-xs text-neutral font-bold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5 fill-primary mr-2"
                      viewBox="0 0 256 256"
                    >
                      <path d="M184,24H72A32,32,0,0,0,40,56V184a32,32,0,0,0,32,32h8L65.6,235.2a8,8,0,1,0,12.8,9.6L100,216h56l21.6,28.8a8,8,0,1,0,12.8-9.6L176,216h8a32,32,0,0,0,32-32V56A32,32,0,0,0,184,24ZM84,184a12,12,0,1,1,12-12A12,12,0,0,1,84,184Zm36-64H56V80h64Zm52,64a12,12,0,1,1,12-12A12,12,0,0,1,172,184Zm28-64H136V80h64Z"></path>
                    </svg>
                    {train?.trainNumber}
                  </div>
                  <div className="items-center flex">
                    <div className="p-4 flex flex-col">
                      <span className="text-xs font-bold whitespace-nowrap">
                        {properCase(train?.departureStation)}
                      </span>
                      <span className="text-xs font-bold whitespace-nowrap">
                        {train?.departureTime}
                      </span>
                    </div>
                    <span className="w-full grow h-0 border-t border-accent/50"></span>
                    <div className="p-4 flex flex-col">
                      <span className="text-xs font-bold whitespace-nowrap">
                        {properCase(train?.arrivalStation)}
                      </span>
                      <span className="text-xs font-bold whitespace-nowrap">
                        {train?.arrivalTime}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
