// constant
const THEME_STYLE = {
  dark: {
    "--primary-color": "#319795",
    "--secondary-color": "#1A202C",
    "--tertiary-color": "#2D3748",
    "--common-color": "#EDF2F7",
  },
  light: {
    "--primary-color": "#38B2AC",
    "--secondary-color": "#F7FAFC",
    "--tertiary-color": "#2D3748",
    "--common-color": "#1A202C",
  },
};

const DEFAULT_THEME = "dark";
const DARK_THEME = "dark";
const LIGHT_THEME = "light";
const THEME_KEY = "theme";

// utils
const getThemeLS = () => localStorage.getItem(THEME_KEY) ?? DEFAULT_THEME;

const getAltTheme = () =>
  getThemeLS() === DARK_THEME ? LIGHT_THEME : DARK_THEME;

const toggleThemeLS = () => localStorage.setItem(THEME_KEY, getAltTheme());

// index
const rootCss = document.querySelector(":root");

window.onload = () => {
  for (let key in THEME_STYLE[getThemeLS()])
    rootCss.style.setProperty(key, THEME_STYLE[getThemeLS()][key]);
};

const themeInput = document.getElementById("theme-toggler");
themeInput.addEventListener("change", () => {
  const theme = getAltTheme();
  const usedStyles = THEME_STYLE[theme];
  for (let key in usedStyles) rootCss.style.setProperty(key, usedStyles[key]);
  toggleThemeLS();
});
