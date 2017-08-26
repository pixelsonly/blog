import { rem, transparentize } from "polished";

const theme = {
  colors: {
    lightGray: "#E7E7E7",
    gray: "#9195AD",
    mediumGray: "#656C7A",
    darkGray: "#494E58",
    midnight: "#26292E",
    black: "#0A0A0A",
    white: "#FEFEFE",
    pink: "#FF358B",
    blue: "#01B0F0",
    green: "#AEEE00",
  },
  fonts: {
    body:
      '"Open Sans", -apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif',
    serif: '"Vollkorn", Georgia, "Times New Roman", serif',
  },
};

export const menuTheme = {
  bmBurgerButton: {
    position: "relative",
    width: rem("32px"),
    height: rem("27px"),
    left: rem("16px"),
    top: rem("16px"),
  },
  bmBurgerBars: {
    background: theme.colors.mediumGray,
  },
  bmCrossButton: {
    height: rem("32px"),
    width: rem("32px"),
  },
  bmCross: {
    background: theme.colors.gray,
  },
  bmMenu: {
    background: theme.colors.darkGray,
  },
  bmMorphShape: {
    fill: theme.colors.darkGray,
  },
  bmItemList: {},
  bmOverlay: {
    background: transparentize(0.7, theme.colors.darkGray),
  },
};

export default theme;
