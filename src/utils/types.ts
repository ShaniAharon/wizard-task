export interface ValidationRule {
  type: "NON_EMPTY" | "MIN_LENGTH" | "EMAIL";
  minLength?: number;
}
