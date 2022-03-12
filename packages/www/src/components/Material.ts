import React from "react";

import dynamic from "next/dynamic";

import type { CardProps } from "@mui/material/Card";
import type { CardActionAreaProps } from "@mui/material/CardActionArea";
import type { CardContentProps } from "@mui/material/CardContent";
import type { ContainerProps } from "@mui/material/Container";
import type { PaperProps } from "@mui/material/Paper";
import type { TypographyProps } from "@mui/material/Typography";

const AppBar = dynamic(() => import("@mui/material/AppBar"));
const Box = dynamic(() => import("@mui/material/Box"));
const Breadcrumbs = dynamic(() => import("@mui/material/Breadcrumbs"));
const Card = dynamic<CardProps<React.ElementType>>(
  () => import("@mui/material/Card")
);
const CardActionArea = dynamic<CardActionAreaProps<React.ElementType>>(
  () => import("@mui/material/CardActionArea")
);
const CardContent = dynamic<CardContentProps<React.ElementType>>(
  () => import("@mui/material/CardContent")
);
const CssBaseline = dynamic(() => import("@mui/material/CssBaseline"));
const Container = dynamic<ContainerProps<React.ElementType>>(
  () => import("@mui/material/Container")
);
const Grid = dynamic(() => import("@mui/material/Grid"));
const Stack = dynamic(() => import("@mui/material/Stack"));
const Paper = dynamic<PaperProps<React.ElementType>>(
  () => import("@mui/material/Paper")
);
const Toolbar = dynamic(() => import("@mui/material/Toolbar"));
const Typography = dynamic<TypographyProps<React.ElementType>>(
  () => import("@mui/material/Typography")
);

export {
  AppBar,
  Box,
  Breadcrumbs,
  Card,
  CardActionArea,
  CardContent,
  CssBaseline,
  Container,
  Grid,
  Stack,
  Paper,
  Toolbar,
  Typography,
};
