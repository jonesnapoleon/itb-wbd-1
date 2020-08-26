// constant
const THEME_STYLE = {
  dark: {
    "--primary-color": "#89d9d7",
    "--secondary-color": "#1A202C",
    "--tertiary-color": "#2D3748",
    "--common-color": "#EDF2F7",
  },
  light: {
    "--primary-color": "#319795",
    "--secondary-color": "#F7FAFC",
    "--tertiary-color": "#D9dddc",
    "--common-color": "#1A202C",
  },
};

const DEFAULT_THEME = "dark";
const DARK_THEME = "dark";
const LIGHT_THEME = "light";
const THEME_KEY = "theme";
const ANIMATE_TEXT_SECOND = 100;

// utils
const getThemeLS = () => localStorage.getItem(THEME_KEY) ?? DEFAULT_THEME;

const getAltTheme = () =>
  getThemeLS() === DARK_THEME ? LIGHT_THEME : DARK_THEME;

const toggleThemeLS = () => localStorage.setItem(THEME_KEY, getAltTheme());

class TxtType {
  constructor(el, messages) {
    this.messages = messages;
    this.loopNum = 0;
    this.el = el;
    this.period = ANIMATE_TEXT_SECOND;
    this.txt = "";
    this.isDeleting = false;
  }
  tick() {
    let i = this.loopNum % this.messages.length;
    let fullTxt = this.messages[i];
    const cutText = this.isDeleting ? this.txt.length - 1 : this.txt.length + 1;

    this.txt = fullTxt.substring(0, cutText);
    this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

    let that = this;
    var delta = ANIMATE_TEXT_SECOND - Math.random() * 100;

    if (this.isDeleting) delta /= 2;

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.loopNum++;
      delta = ANIMATE_TEXT_SECOND;
    }
    i === this.messages.length - 1 && this.txt === fullTxt
      ? setTimeout(() => that.tick(), delta * 20)
      : setTimeout(() => that.tick(), delta);
  }
}

// index
const rootCss = document.querySelector(":root");
const write = document.getElementById("typewriter");

window.onload = () => {
  for (let key in THEME_STYLE[getThemeLS()])
    rootCss.style.setProperty(key, THEME_STYLE[getThemeLS()][key]);

  const messages = write.getAttribute("data-messages");
  const typer = new TxtType(write, JSON.parse(messages));
  typer.tick();
};

const themeInput = document.getElementById("theme-toggler");
themeInput.addEventListener("change", () => {
  const theme = getAltTheme();
  const usedStyles = THEME_STYLE[theme];
  for (let key in usedStyles) rootCss.style.setProperty(key, usedStyles[key]);
  toggleThemeLS();
});

const form = document.querySelector("form");
const handleSubmit = (e) => {
  e.preventDefault();
  const fields = form.querySelectorAll("input[name]");
  const name = fields[0].value;
  const email = fields[1].value;
  const ans = confirm(`Hi ${name}, are you sure to subscribe with ${email}?`);
  if (ans) alert(`Thankyou, ${name}. Your email ${email} is accepted!`);
};

form.addEventListener("submit", handleSubmit);
