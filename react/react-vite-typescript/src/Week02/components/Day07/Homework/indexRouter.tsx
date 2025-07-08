import React from "react";
import { Routes, Route } from "react-router";
import DefautLayout from "./src/layouts/DefautLayout";
import Patients from "./src/pages/Patients";
import OverviewPage from "./src/pages/OverviewPage";
import MapPage from "./src/pages/MapPage";
import DepartmentsPage from "./src/pages/DepartmentsPage";
import DoctorsPage from "./src/pages/DoctorsPage";
import HistoryPage from "./src/pages/HistoryPage";
import SettingsPage from "./src/pages/SettingsPage";

type Props = {};

export default function Homework({}: Props) {
  return (
    <Routes>
      <Route path="/" element={<DefautLayout />}>
        <Route index element={<Patients/>} />
        <Route path="overview" element={<OverviewPage />} />
        <Route path="map" element={<MapPage />} />
        <Route path="departments" element={<DepartmentsPage />} />
        <Route path="doctors" element={<DoctorsPage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}
