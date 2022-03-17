import { NextComponentType } from "next";

import { ThemeProvider } from "@mui/material/styles";

import {
  AppBar,
  Box,
  CssBaseline,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "./Material";

import theme from "../theme";

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
