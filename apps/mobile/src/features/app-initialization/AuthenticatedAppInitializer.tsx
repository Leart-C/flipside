import { useClaimLegacyMemories } from "@/features/memories/hooks/useClaimLegacyMemories";

export function AuthenticatedAppInitializer() {
  useClaimLegacyMemories();

  return null;
}
