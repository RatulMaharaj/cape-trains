import { stations, inbound } from "./southern_line";

type LineData = {
  stations: string[];
  inbound: {
    [key: string]: {
      [key: string]: string;
    };
  };
  outbound: {
    [key: string]: {
      [key: string]: string;
    };
  };
};

export default {
  "southern line": {
    stations,
    inbound,
    outbound: {},
  },
} as {
  [key: string]: LineData;
};
