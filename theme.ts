import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    smm: true;
    sm: true;
    mddd: true;
    mdd: true;
    md: true;
    lgg: true;
    lg: true;
    xll: true;
    xl: true;
    xxl: true;
    xxxl: true;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#0d3878",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      smm: 460,
      sm: 600, // Tomar en cuenta x siaca, para asegurar el responsive en movil
      mddd: 710,
      mdd: 860,
      md: 900, // Estandar para móvil / tablet
      lgg: 980,
      lg: 1200,
      xll: 1250,
      xl: 1536,
      xxl: 1600,
      xxxl: 1920,
    },
  },
});
export default theme;
