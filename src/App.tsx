import { BrowserRouter, Routes, Route } from "react-router-dom";

import GlobalStyles from "styles/GlobalStyles";


function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Weather />
    </BrowserRouter>
  );
}

export default App;
