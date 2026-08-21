import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";

import { Screen } from "@/components/layout/Screen";
import { useOnboardingPreferences } from "@/features/onboarding/OnboardingPreferencesProvider";
import { colors } from "@/theme/colors";
import { fontFamilies } from "@/theme/fonts";
import { MemoryFlipCard } from "./components/MemoryFlipCard";
import { MemoryControlsFade } from "./components/MemoryControlsFade";
import { MemoryHandwritingPicker } from "./components/MemoryHandwritingPicker";
import { MemoryInkPicker } from "./components/MemoryInkPicker";
import { MemoryPhotoCard } from "./components/MemoryPhotoCard";
import { MemorySideToggle } from "./components/MemorySideToggle";
import { MemoryTextSizeControl } from "./components/MemoryTextSizeControl";
import { MemoryWritingCard } from "./components/MemoryWritingCard";
import { createNewMemoryDraft, useMemoryDraft } from "./hooks/useMemoryDraft";
import { usePhotoAssetUri } from "@/features/photo-library/hooks/usePhotoAssetUri";
import { getMemoryInkColor } from "@/theme/memoryInkColors";
import { getMemoryTextSize } from "./memoryTextSizeOptions";
import { writeMemoryScreenStyles } from "./WriteMemoryScreen.styles";
import { useMemoryRepository } from "@/features/memories/hooks/useMemoryRepository";
import { MemoryActionBar } from "./components/MemoryActionBar";
import type { SavedMemory } from "@/domain/memory";
import { PrintOrderSheet } from "@/features/print-order/components/PrintOrderSheet";
import { useQueryClient } from "@tanstack/react-query";
import { memoryQueryKeys } from "@/features/memories/memoryQueryKeys";

type WriteMemoryScreenProps = {
  backLabel?: string;
  initialMemory?: SavedMemory;
  photoId: string;
};

export function WriteMemoryScreen({
  backLabel = "Photos",
  initialMemory,
  photoId,
}: WriteMemoryScreenProps) {
  const router = useRouter();
  const { selectedHandwriting } = useOnboardingPreferences();
  const memoryRepository = useMemoryRepository();
  const queryClient = useQueryClient();

  const {
    chooseHandwriting,
    chooseInkColor,
    chooseTextSize,
    draft,
    updateMessage,
  } = useMemoryDraft(
    initialMemory ?? createNewMemoryDraft(photoId, selectedHandwriting),
  );

  const { error, isLoading, uri } = usePhotoAssetUri(photoId);

  const [isShowingPhoto, setIsShowingPhoto] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);
  const [memoryForPrint, setMemoryForPrint] = useState<SavedMemory | null>(
    null,
  );

  const inkColor = getMemoryInkColor(draft.inkColor);
  const textSize = getMemoryTextSize(draft.textSize);

  const isPhotoReady = !isLoading && !error && uri !== null;

  const canSave = draft.message.trim().length > 0 && !isSaving;

  function handleSideToggle() {
    Keyboard.dismiss();

    setIsShowingPhoto((currentlyShowingPhoto) => !currentlyShowingPhoto);
  }

  async function saveCurrentDraft() {
    if (!canSave) {
      return null;
    }

    Keyboard.dismiss();
    setSaveFailed(false);
    setIsSaving(true);

    try {
      const savedMemory = await memoryRepository.save(draft);

      await queryClient.invalidateQueries({
        queryKey: memoryQueryKeys.all(memoryRepository.ownerId),
      });

      return savedMemory;
    } catch {
      setSaveFailed(true);
      return null;
    } finally {
      setIsSaving(false);
    }
  }

  async function handleSaveToShoebox() {
    const savedMemory = await saveCurrentDraft();

    if (!savedMemory) {
      return;
    }

    if (initialMemory) {
      router.back();
      return;
    }

    router.replace("/shoebox");
  }

  async function handlePrint() {
    const savedMemory = await saveCurrentDraft();

    if (savedMemory) {
      setMemoryForPrint(savedMemory);
    }
  }

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={writeMemoryScreenStyles.content}
      >
        <Pressable
          accessibilityLabel={`Return to ${backLabel}`}
          accessibilityRole="button"
          onPress={() => router.back()}
          style={writeMemoryScreenStyles.backButton}
        >
          <Text style={writeMemoryScreenStyles.backLabel}>{backLabel}</Text>
        </Pressable>

        <Text style={writeMemoryScreenStyles.title}>
          {isShowingPhoto ? "Your photo" : "Your memory"}
        </Text>

        {isLoading && <ActivityIndicator color={colors.action} />}

        {error && (
          <Text style={writeMemoryScreenStyles.errorMessage}>
            This photo could not be opened.
          </Text>
        )}

        {isPhotoReady && (
          <MemoryFlipCard
            isShowingPhoto={isShowingPhoto}
            photoSide={<MemoryPhotoCard uri={uri} />}
            writingSide={
              <MemoryWritingCard
                fontFamily={fontFamilies[draft.handwriting]}
                fontSize={textSize.fontSize}
                inkColor={inkColor}
                lineHeight={textSize.lineHeight}
                message={draft.message}
                onMessageChange={updateMessage}
              />
            }
          />
        )}

        {isPhotoReady && (
          <MemorySideToggle
            isShowingPhoto={isShowingPhoto}
            onPress={handleSideToggle}
          />
        )}

        {isPhotoReady && (
          <MemoryControlsFade
            isVisible={!isShowingPhoto}
            style={writeMemoryScreenStyles.controls}
          >
            <MemoryHandwritingPicker
              onSelect={chooseHandwriting}
              selectedHandwriting={draft.handwriting}
            />

            <View style={writeMemoryScreenStyles.secondaryControls}>
              <MemoryInkPicker
                onSelect={chooseInkColor}
                selectedInkColor={draft.inkColor}
              />

              <MemoryTextSizeControl
                onSelect={chooseTextSize}
                selectedTextSize={draft.textSize}
              />
            </View>

            {saveFailed && (
              <Text style={writeMemoryScreenStyles.saveError}>
                Your memory couldn&apos;t be saved. Please try again.
              </Text>
            )}

            <MemoryActionBar
              disabled={!canSave}
              isSaving={isSaving}
              onPrint={() => {
                void handlePrint();
              }}
              onSaveToShoebox={() => {
                void handleSaveToShoebox();
              }}
            />
          </MemoryControlsFade>
        )}

        <View style={writeMemoryScreenStyles.keyboardSpace} />
      </KeyboardAvoidingView>

      <PrintOrderSheet
        fontFamily={fontFamilies[draft.handwriting]}
        inkColor={inkColor}
        memory={memoryForPrint}
        onClose={() => setMemoryForPrint(null)}
        visible={memoryForPrint !== null}
      />
    </Screen>
  );
}
