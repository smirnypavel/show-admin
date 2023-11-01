// in src/Dashboard.js
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Title } from "react-admin";
const Dashboard = () => (
  <Card>
    <Title title="Welcome to the administration" />
    <CardContent>Lorem ipsum sic dolor amet...</CardContent>
  </Card>
);

Dashboard.displayName = "Dashboard";

export default Dashboard;
