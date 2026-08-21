const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!clerkPublishableKey) {
  throw new Error("EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY is missing.");
}

if (!clerkPublishableKey.startsWith("pk_")) {
  throw new Error("EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY is invalid.");
}

export const clerkConfig = {
  publishableKey: clerkPublishableKey,
};
