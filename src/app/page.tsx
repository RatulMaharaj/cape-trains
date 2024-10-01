/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import SelectMenu from "@/components/combobox";
import { useQuery } from "@tanstack/react-query";
import { properCase } from "@/lib/text";
import { sortStations } from "@/lib/utils";

const baseUrl = "https://ratulmaharaj.github.io/cape-trains/data/json";

export default function Page() {
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
    queryKey: ["stations"],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/stations.json`);
      return response.json() as Promise<
        {
          name: string;
          lines: string[];
        }[]
      >;
    },
  });

  console.log({ stations });

  const { data: schedules, isLoading: isSchedulesLoading } = useQuery({
    queryKey: ["schedules", departure, arrival],
    queryFn: async () => {
      const response = await fetch(`/api/schedules`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          departure,
          arrival,
          day,
        }),
      });
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
    enabled: !!departure && !!arrival,
  });

  console.log({ day });

  return (
    <>
      <div className="flex flex-col gap-x-2 gap-y-2 w-full items-center justify-center">
        <p className="font-medium text-xs mb-1">
          Please select departure and arrival stations
        </p>
        <div className="flex-row flex items-center justify-center w-full gap-2 mb-2">
          <SelectMenu
            options={
              sortStations(stations)
                ?.filter((station) => {
                  return station.name !== arrival;
                })
                ?.map((station) => {
                  return {
                    value: station.name,
                    label: properCase(station.name),
                  };
                }) ?? []
            }
            onChange={(item) => {
              setDeparture(item.value);
            }}
            placeholder="From?"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-6 fill-primary hover:cursor-pointer"
            viewBox="0 0 256 256"
          >
            <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
          </svg>
          <SelectMenu
            options={
              sortStations(stations)
                ?.filter((station) => {
                  return station.name !== departure;
                })
                ?.map((station) => {
                  return {
                    value: station.name,
                    label: properCase(station.name),
                  };
                }) ?? []
            }
            onChange={(item) => {
              setArrival(item.value);
            }}
            placeholder="To?"
          />
          <button type="button" className="btn btn-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 fill-primary-content"
              viewBox="0 0 256 256"
            >
              <path d="M232.49,215.51,185,168a92.12,92.12,0,1,0-17,17l47.53,47.54a12,12,0,0,0,17-17ZM44,112a68,68,0,1,1,68,68A68.07,68.07,0,0,1,44,112Z"></path>
            </svg>
          </button>
        </div>

        {true ? null : (
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
