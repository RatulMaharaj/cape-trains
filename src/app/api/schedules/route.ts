export async function GET(request: Request) {
  // get the query parameters
  const url = new URL(request.url);
  const params = url.searchParams;
  const line = params.get("line");

  return Response.json({});
}
