import { stations, inbound } from "./southern_line";

type LineData = {
  stations: string[];
  inbound: any;
  outbound: any;
};

export default {
  "southern line": {
    stations,
    inbound,
    outbound: {},
  },
} as Record<string, LineData>;
