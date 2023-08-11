export const gameTypes = {
  teForm: "て-Form",
  taForm: "た-Form",
  potential: "Potential-Form",
  random: "Random",
} as const;

export type GameKeys = keyof typeof gameTypes;

export type GameTypes = (typeof gameTypes)[GameKeys];
