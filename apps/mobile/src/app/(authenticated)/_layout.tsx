import { Stack } from "expo-router";

import { AuthenticatedAppInitializer } from "@/features/app-initialization/AuthenticatedAppInitializer";

export default function AuthenticatedLayout() {
  return (
    <>
      <AuthenticatedAppInitializer />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
