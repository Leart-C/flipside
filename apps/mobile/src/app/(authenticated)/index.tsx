import { Redirect } from "expo-router";

export default function AuthenticatedIndexRoute() {
  return <Redirect href="/photos" />;
}
