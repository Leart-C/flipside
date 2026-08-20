import type { HandwritingId } from "@/domain/handwriting";
import { fontFamilies } from "@/theme/fonts";

export type HandwritingOption = {
  id: HandwritingId;
  label: string;
  fontFamily: string;
  requiresKeepsake: boolean;
};

export const handwritingOptions: HandwritingOption[] = [
  {
    id: "note",
    label: "Note",
    fontFamily: fontFamilies.note,
    requiresKeepsake: false,
  },
  {
    id: "letter",
    label: "Letter",
    fontFamily: fontFamilies.letter,
    requiresKeepsake: false,
  },
  {
    id: "sketch",
    label: "Sketch",
    fontFamily: fontFamilies.sketch,
    requiresKeepsake: false,
  },
  {
    id: "longhand",
    label: "Longhand",
    fontFamily: fontFamilies.longhand,
    requiresKeepsake: true,
  },
  {
    id: "ledger",
    label: "Ledger",
    fontFamily: fontFamilies.ledger,
    requiresKeepsake: true,
  },
];
