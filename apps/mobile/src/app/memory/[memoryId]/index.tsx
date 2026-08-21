import { Redirect, useLocalSearchParams } from "expo-router";

import { EditSavedMemoryScreen } from "@/features/memories/EditSavedMemoryScreen";

export default function EditSavedMemoryRoute() {
  const { memoryId } = useLocalSearchParams<{
    memoryId?: string | string[];
  }>();

  if (typeof memoryId !== "string" || memoryId.length === 0) {
    return <Redirect href="/shoebox" />;
  }

  return <EditSavedMemoryScreen memoryId={memoryId} />;
}
