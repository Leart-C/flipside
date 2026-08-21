export async function GET() {
  return Response.json({
    service: "flipside-backend",
    status: "ok",
  });
}
