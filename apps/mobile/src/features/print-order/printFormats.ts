export type PrintFormatId = "classic-4x5" | "postcard-4x6" | "square-5x5";

export type PrintFormat = {
  id: PrintFormatId;
  label: string;
  dimensions: string;
};

export type PrintOrderSelection = {
  formatId: PrintFormatId;
  quantity: number;
};

export const printFormats: readonly PrintFormat[] = [
  {
    id: "classic-4x5",
    label: "Classic",
    dimensions: "4 × 5",
  },
  {
    id: "postcard-4x6",
    label: "Postcard",
    dimensions: "4 × 6",
  },
  {
    id: "square-5x5",
    label: "Square",
    dimensions: "5 × 5",
  },
];

export const defaultPrintSelection: PrintOrderSelection = {
  formatId: "classic-4x5",
  quantity: 1,
};

export const minimumPrintQuantity = 1;
export const maximumPrintQuantity = 20;
