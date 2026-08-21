import { Pressable, Text, View } from "react-native";

import { maximumPrintQuantity, minimumPrintQuantity } from "../printFormats";
import { printQuantityControlStyles } from "./PrintQuantityControl.styles";

type PrintQuantityControlProps = {
  onChange: (quantity: number) => void;
  quantity: number;
};

export function PrintQuantityControl({
  onChange,
  quantity,
}: PrintQuantityControlProps) {
  const cannotDecrease = quantity <= minimumPrintQuantity;
  const cannotIncrease = quantity >= maximumPrintQuantity;

  function decreaseQuantity() {
    if (!cannotDecrease) {
      onChange(quantity - 1);
    }
  }

  function increaseQuantity() {
    if (!cannotIncrease) {
      onChange(quantity + 1);
    }
  }

  return (
    <View style={printQuantityControlStyles.container}>
      <Text style={printQuantityControlStyles.label}>Quantity</Text>

      <View style={printQuantityControlStyles.actions}>
        <Pressable
          accessibilityLabel="Decrease print quantity"
          accessibilityRole="button"
          accessibilityState={{ disabled: cannotDecrease }}
          disabled={cannotDecrease}
          onPress={decreaseQuantity}
          style={({ pressed }) => [
            printQuantityControlStyles.button,
            pressed && printQuantityControlStyles.pressedButton,
            cannotDecrease && printQuantityControlStyles.disabledButton,
          ]}
        >
          <Text style={printQuantityControlStyles.buttonLabel}>−</Text>
        </Pressable>

        <Text
          accessibilityLabel={`${quantity} prints`}
          accessibilityLiveRegion="polite"
          style={printQuantityControlStyles.quantity}
        >
          {quantity}
        </Text>

        <Pressable
          accessibilityLabel="Increase print quantity"
          accessibilityRole="button"
          accessibilityState={{ disabled: cannotIncrease }}
          disabled={cannotIncrease}
          onPress={increaseQuantity}
          style={({ pressed }) => [
            printQuantityControlStyles.button,
            pressed && printQuantityControlStyles.pressedButton,
            cannotIncrease && printQuantityControlStyles.disabledButton,
          ]}
        >
          <Text style={printQuantityControlStyles.buttonLabel}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}
