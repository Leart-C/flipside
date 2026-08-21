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
import { useMemoryDraft } from "./hooks/useMemoryDraft";
import { useSelectedPhoto } from "./hooks/useSelectedPhoto";
import { getMemoryInkColor } from "./memoryInkOptions";
import { getMemoryTextSize } from "./memoryTextSizeOptions";
import { writeMemoryScreenStyles } from "./WriteMemoryScreen.styles";
import { useMemoryRepository } from "@/features/memories/hooks/useMemoryRepository";
import { MemoryActionBar } from "./components/MemoryActionBar";

type WriteMemoryScreenProps = {
  photoId: string;
};

export function WriteMemoryScreen({ photoId }: WriteMemoryScreenProps) {
  const router = useRouter();
  const { selectedHandwriting } = useOnboardingPreferences();
  const memoryRepository = useMemoryRepository();

  const {
    chooseHandwriting,
    chooseInkColor,
    chooseTextSize,
    draft,
    updateMessage,
  } = useMemoryDraft(photoId, selectedHandwriting);

  const { error, isLoading, uri } = useSelectedPhoto(photoId);

  const [isShowingPhoto, setIsShowingPhoto] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);

  const inkColor = getMemoryInkColor(draft.inkColor);
  const textSize = getMemoryTextSize(draft.textSize);

  const isPhotoReady = !isLoading && !error && uri !== null;

  const canSave = draft.message.trim().length > 0 && !isSaving;

  function handleSideToggle() {
    Keyboard.dismiss();

    setIsShowingPhoto((currentlyShowingPhoto) => !currentlyShowingPhoto);
  }

  async function handleSaveToShoebox() {
    if (!canSave) {
      return;
    }

    Keyboard.dismiss();
    setSaveFailed(false);
    setIsSaving(true);

    try {
      await memoryRepository.save(draft);
      router.back();
    } catch {
      setSaveFailed(true);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={writeMemoryScreenStyles.content}
      >
        <Pressable
          accessibilityLabel="Return to photo library"
          accessibilityRole="button"
          onPress={() => router.back()}
          style={writeMemoryScreenStyles.backButton}
        >
          <Text style={writeMemoryScreenStyles.backLabel}>Photos</Text>
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
              onSaveToShoebox={() => {
                void handleSaveToShoebox();
              }}
            />
          </MemoryControlsFade>
        )}

        <View style={writeMemoryScreenStyles.keyboardSpace} />
      </KeyboardAvoidingView>
    </Screen>
  );
}
