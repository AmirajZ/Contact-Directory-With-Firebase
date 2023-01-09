import React from "react";
import Page from "./Component/Page";

const App = () => (
  <>
    <div className="App">
      <h1>Contact Directory</h1>
    </div>
    <Page as="Name--" at="Email_ID--" no="Phone_No.--"></Page>
  </>
);

export default App;
