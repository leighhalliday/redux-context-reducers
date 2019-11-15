import React from "react";
import VersionRedux from "./VersionRedux";
import VersionContext from "./VersionContext";

export default function App() {
  return (
    <main>
      <VersionContext />
      <VersionRedux />
    </main>
  );
}
