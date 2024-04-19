// @mui
import { alpha } from "@mui/material/styles";
// theme
import { palette as themePalette } from "src/theme/palette";

export function presets(presetsColor) {
  const primary = primaryPresets.find((i) => i.name === presetsColor);

  const theme = {
    palette: {
      primary,
    },
    customShadows: {
      primary: `0 8px 16px 0 ${alpha(primary?.main, 0.24)}`,
    },
  };

  return theme;
}

const palette = themePalette("light");

export const primaryPresets = [
  // DEFAULT
  {
    name: "default",
    ...palette.primary,
  },
  // PURPLE
  {
    name: "purple",
    lighter: "#EBD6FD",
    light: "#B985F4",
    main: "#7635dc",
    dark: "#431A9E",
    darker: "#200A69",
    contrastText: "#FFFFFF",
  },
  {
    name: "customBlue",
    lighter: "#86B5CC",
    light: "#297AA6",
    main: "#004987", // Your desired color
    dark: "#003466",
    darker: "#002244",
    contrastText: "#FFFFFF",
  },
];
