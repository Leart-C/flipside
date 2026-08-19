import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/theme/colors";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flipside</Text>
      <Text style={styles.message}>Every photo has a back.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.canvas,
  },
  title: {
    color: colors.text,
    fontSize: 36,
    fontWeight: "600",
  },
  message: {
    marginTop: 12,
    color: colors.mutedText,
    fontSize: 18,
  },
});
