import { createTheme } from "@mui/material/styles";

export const createAppTheme = (isDark: boolean) =>
  createTheme({
    palette: {
      mode: isDark ? "dark" : "light",
      primary: {
        main: "#40386c",
      },
      secondary: {
        main: "#dda15e",
      },
      background: {
        default: isDark ? "#283618" : "#fffce8",
        paper: isDark ? "#3a4a2b" : "#f5eecb",
      },
      success: {
        main: "#6ba547",
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? "#283618" : "#283618",
          },
        },
      },
    },
  });
