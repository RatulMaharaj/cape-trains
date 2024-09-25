import { stations as southern } from "../data/southern_line";
import { stations as northern } from "../data/northern_line";

export async function GET(request: Request) {
  // get the query parameters
  const url = new URL(request.url);
  const params = url.searchParams;
  const line = params.get("line")?.toLowerCase();

  // NOTE: Lines are listed in INBOUND order
  if (line === "southern line") {
    return Response.json(southern);
  } else if (line === "northern line") {
    return Response.json(northern);
  }

  return Response.json([]);
}
