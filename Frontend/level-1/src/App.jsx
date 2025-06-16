import React from "react";
import "./style/index.css";
import MainLayout from "./components/MainLayout";
import TaskMain from "./components/TaskMain";

export default function App() {
  return (
    <div>
      <MainLayout>
        <TaskMain />
      </MainLayout>
    </div>
  );
}
