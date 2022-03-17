import { createTheme } from "@mui/material/styles";
import { alpha } from "@mui/system/colorManipulator";

const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: ({ ownerState, theme }) => {
          const alphaValue = 0.5;

          let backgroundColor;
          if (
            ownerState.color === "default" ||
            ownerState.color === "primary"
          ) {
            backgroundColor = alpha(theme.palette.primary.main, alphaValue);
          } else if (ownerState.color === "secondary") {
            backgroundColor = alpha(theme.palette.secondary.main, alphaValue);
          } else if (ownerState.color === "transparent") {
            backgroundColor = "transparent";
          }

          return {
            backgroundColor,
            backdropFilter: "blur(20px)",
          };
        },
      },
    },
  },
  typography: {
    h1: {
      fontFamily: "'Merriweather', serif",
    },
    h2: {
      fontFamily: "'Merriweather', serif;",
    },
    h3: {
      fontFamily: "'Merriweather', serif;",
    },
    h4: {
      fontFamily: "'Merriweather', serif;",
    },
    h5: {
      fontFamily: "'Merriweather', serif;",
    },
    h6: {
      fontFamily: "'Merriweather', serif;",
    },
    subtitle1: {
      fontFamily: "'Lato', sans-serif",
    },
    subtitle2: {
      fontFamily: "'Lato', sans-serif",
    },
    body1: {
      fontFamily: "'Lato', sans-serif",
    },
    body2: {
      fontFamily: "'Lato', sans-serif",
    },
    button: {
      fontFamily: "'Lato', sans-serif",
    },
    caption: {
      fontFamily: "'Lato', sans-serif",
    },
    overline: {
      fontFamily: "'Lato', sans-serif",
    },
  },
});

export default theme;
