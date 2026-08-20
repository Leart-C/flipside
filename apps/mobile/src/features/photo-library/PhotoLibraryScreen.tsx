import { Text, View } from "react-native";

import { Screen } from "@/components/layout/Screen";

import { photoLibraryScreenStyles } from "./PhotoLibraryScreen.styles";

export function PhotoLibraryScreen() {
  return (
    <Screen>
      <View style={photoLibraryScreenStyles.content}>
        <Text style={photoLibraryScreenStyles.title}>Choose a photo</Text>
        <Text style={photoLibraryScreenStyles.message}>
          From your library — pick one to write on.
        </Text>
      </View>
    </Screen>
  );
}
