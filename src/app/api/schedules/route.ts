import data from "../data";

export async function GET(request: Request) {
  // get the query parameters
  const url = new URL(request.url);
  const params = url.searchParams;
  const line = params.get("line");

  if (!line) {
    return Response.json({ error: "No line provided" }, { status: 400 });
  }

  // get the line data
  const lineData = data[line];

  const departure = params.get("departure");
  const arrival = params.get("arrival");

  if (!departure || !arrival) {
    return Response.json(
      { error: "No departure or arrival provided" },
      { status: 400 },
    );
  }

  const isInbound = true;

  const stations = lineData[isInbound ? "inbound" : "outbound"];

  // get departure times for the departure and arrival stations
  const departureTimes = stations[departure];
  const arrivalTimes = stations[arrival];

  // remove empty times from the departures
  const trainNumbers = Object.keys(departureTimes).filter(
    (key) => departureTimes[key] !== "",
  );
  console.log(trainNumbers);

  // only return the times for the selected train numbers
  for (const key in departureTimes) {
    if (!trainNumbers.includes(key)) {
      delete departureTimes[key];
    }
  }
  for (const key in arrivalTimes) {
    if (!trainNumbers.includes(key)) {
      delete arrivalTimes[key];
    }
  }

  console.log({
    departureStation: departure,
    arrivalStation: arrival,
    departures: departureTimes,
    arrivals: arrivalTimes,
  });

  // transform data into a more usable format
  const res = trainNumbers.map((trainNumber) => {
    return {
      trainNumber,
      departureStation: departure,
      departureTime: departureTimes[trainNumber],
      arrivalStation: arrival,
      arrivalTime: arrivalTimes[trainNumber],
    };
  });

  console.log(res);
  return Response.json(res);
}
