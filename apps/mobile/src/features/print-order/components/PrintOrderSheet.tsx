import { useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { PrimaryButton } from "@/components/actions/PrimaryButton";
import type { SavedMemory } from "@/domain/memory";
import { spacing } from "@/theme/spacing";

import {
  defaultPrintSelection,
  type PrintFormatId,
  type PrintOrderSelection,
} from "../printFormats";
import { calculatePreviewPriceInCents, formatPrice } from "../printPrice";
import { PrintFormatPicker } from "./PrintFormatPicker";
import { PrintQuantityControl } from "./PrintQuantityControl";
import { printOrderSheetStyles } from "./PrintOrderSheet.styles";
import { PrintReversePreview } from "./PrintReversePreview";

type PrintOrderSheetProps = {
  fontFamily: string;
  inkColor: string;
  memory: SavedMemory | null;
  onClose: () => void;
  onOrder?: (selection: PrintOrderSelection) => void;
  visible: boolean;
};

export function PrintOrderSheet({
  fontFamily,
  inkColor,
  memory,
  onClose,
  onOrder,
  visible,
}: PrintOrderSheetProps) {
  const safeAreaInsets = useSafeAreaInsets();

  const [selection, setSelection] = useState<PrintOrderSelection>(
    defaultPrintSelection,
  );

  const previewPrice = calculatePreviewPriceInCents(selection.quantity);
  const orderDisabled = memory === null || onOrder === undefined;

  function handleFormatSelect(formatId: PrintFormatId) {
    setSelection((currentSelection) => ({
      ...currentSelection,
      formatId,
    }));
  }

  function handleQuantityChange(quantity: number) {
    setSelection((currentSelection) => ({
      ...currentSelection,
      quantity,
    }));
  }

  function handleClose() {
    setSelection(defaultPrintSelection);
    onClose();
  }

  function handleOrder() {
    if (onOrder) {
      onOrder(selection);
    }
  }

  return (
    <Modal
      animationType="fade"
      onRequestClose={handleClose}
      presentationStyle="overFullScreen"
      statusBarTranslucent
      transparent
      visible={visible}
    >
      <View style={printOrderSheetStyles.modal}>
        <Pressable
          accessibilityLabel="Close print options"
          accessibilityRole="button"
          onPress={handleClose}
          style={printOrderSheetStyles.backdrop}
        />

        <View
          style={[
            printOrderSheetStyles.sheet,
            {
              paddingBottom: Math.max(safeAreaInsets.bottom, spacing.regular),
            },
          ]}
        >
          <View style={printOrderSheetStyles.handle} />

          <View style={printOrderSheetStyles.header}>
            <View>
              <Text style={printOrderSheetStyles.eyebrow}>
                Print &amp; post
              </Text>

              <Text style={printOrderSheetStyles.title}>Make it tangible</Text>
            </View>

            <Pressable
              accessibilityLabel="Close print options"
              accessibilityRole="button"
              onPress={handleClose}
              hitSlop={8}
              style={({ pressed }) => [
                printOrderSheetStyles.closeButton,
                pressed && printOrderSheetStyles.pressedButton,
              ]}
            >
              <Text style={printOrderSheetStyles.closeLabel}>×</Text>
            </Pressable>
          </View>

          <ScrollView
            bounces={false}
            contentContainerStyle={printOrderSheetStyles.content}
            showsVerticalScrollIndicator={false}
          >
            <View>
              <Text style={printOrderSheetStyles.sectionLabel}>
                Choose a format
              </Text>

              <PrintFormatPicker
                onSelect={handleFormatSelect}
                selectedFormatId={selection.formatId}
              />
            </View>

            {memory && (
              <PrintReversePreview
                fontFamily={fontFamily}
                inkColor={inkColor}
                message={memory.message}
              />
            )}

            <PrintQuantityControl
              onChange={handleQuantityChange}
              quantity={selection.quantity}
            />

            <View style={printOrderSheetStyles.divider} />

            <View style={printOrderSheetStyles.priceRow}>
              <View style={printOrderSheetStyles.priceDescription}>
                <Text style={printOrderSheetStyles.priceLabel}>
                  Print estimate
                </Text>

                <Text style={printOrderSheetStyles.priceNote}>
                  Shipping calculated later
                </Text>
              </View>

              <Text style={printOrderSheetStyles.price}>
                {formatPrice(previewPrice)}
              </Text>
            </View>

            <PrimaryButton
              disabled={orderDisabled}
              label={`Order ${formatPrice(previewPrice)}`}
              onPress={handleOrder}
            />

            <Text style={printOrderSheetStyles.checkoutNote}>
              Checkout will be enabled when secure server pricing and payment
              are connected.
            </Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
