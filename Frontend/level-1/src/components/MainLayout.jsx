import React from "react";
import CopyRightNotice from "./CopyRightNotice";
import Header from "./Header";

export default function MainLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <CopyRightNotice />
    </div>
  );
}
