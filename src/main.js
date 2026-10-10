import "./styles/global.css";
import { renderHeader, initNavigation } from "./components/header.js";
import { renderFooter } from "./components/footer.js";
document.querySelector("#app-header").innerHTML = renderHeader();
document.querySelector("#app-footer").innerHTML = renderFooter();
initNavigation();
