import { Redirect, useLocalSearchParams } from "expo-router";

import { WriteMemoryScreen } from "@/features/write-memory/WriteMemoryScreen";

export default function WriteMemoryRoute() {
  const { photoId } = useLocalSearchParams<{
    photoId?: string | string[];
  }>();

  if (typeof photoId !== "string" || photoId.length === 0) {
    return <Redirect href="/photos" />;
  }

  return <WriteMemoryScreen photoId={photoId} />;
}
