import { NextComponentType } from "next";

import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";
import Box from "@mui/system/Box";

const theme = createTheme();

const Layout: NextComponentType = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <AppBar position="sticky">
          <Container component="nav">
            <Toolbar></Toolbar>
          </Container>
        </AppBar>

        <Container component="main" maxWidth="md" sx={{ py: 2, flexGrow: 1 }}>
          {children}
        </Container>

        <Container component="footer" maxWidth="md" sx={{ py: 4 }}>
          <Stack>
            <Typography align="center">segoqu</Typography>
          </Stack>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
