"use client";

import React, { useState } from "react";
import SelectMenu from "@/components/ui/selectMenu";
import { useQuery } from "@tanstack/react-query";
import { trainLines } from "@/lib/lines";
import { properCase } from "@/lib/text";

export default function Page() {
  const [line, setLine] = useState(trainLines[0]);

  // Automatically set the schedule based on the day of the week
  const d = new Date();
  const dayInt = d.getDay();
  let dayOfWeek = "monday - friday";
  switch (dayInt) {
    case 0:
      dayOfWeek = "sunday / public holidays";
      break;
    case 6:
      dayOfWeek = "saturday";
      break;
    default:
      dayOfWeek = "monday - friday";
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
        `/api/schedules?line=${line}&departure=${departure}&arrival=${arrival}`
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

  console.log(schedules);

  return (
    <>
      <div className="flex flex-col gap-x-2 gap-y-2 w-full items-center justify-center">
        <p className="font-medium text-xs mb-2">
          Please select a line and schedule
        </p>
        <div className="flex-col md:flex-row flex items-center justify-center w-full gap-2">
          <SelectMenu
            placeholder="Select a line"
            options={trainLines.map((line) => {
              return {
                value: line,
                label: properCase(line),
              };
            })}
            value={line}
            setValue={setLine}
          />

          <SelectMenu
            placeholder="Select schedule"
            options={[
              "monday - friday",
              "saturday",
              "sunday / public holidays",
            ].map((day) => {
              return {
                value: day,
                label: properCase(day),
              };
            })}
            value={day}
            setValue={setDay}
          />
        </div>
        {!isStationsLoading && stations ? (
          <>
            <p className="font-medium text-xs mt-4 mb-2">
              Please select departure and arrival stations
            </p>
            <div className="flex-col md:flex-row flex items-center justify-center w-full gap-2">
              <SelectMenu
                placeholder={"Select departure station"}
                options={
                  stations?.map((station: string) => {
                    return {
                      value: station,
                      label: properCase(station),
                    };
                  }) ?? ["No stations found"]
                }
                value={departure}
                setValue={setDeparture}
              />

              <SelectMenu
                placeholder={"Select arrival station"}
                options={
                  stations?.map((station: string) => {
                    return {
                      value: station,
                      label: properCase(station),
                    };
                  }) ?? ["No stations found"]
                }
                value={arrival}
                setValue={setArrival}
              />
            </div>
          </>
        ) : null}

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
