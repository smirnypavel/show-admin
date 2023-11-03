// in src/Dashboard.js
import React, { useMemo, CSSProperties } from "react";

// import Card from "@mui/material/Card";
import { CardContent, useMediaQuery, Theme } from "@mui/material";
// import { Title } from "react-admin";
import Welcome from "./Welcome";

const styles = {
  flex: { display: "flex" },
  flexColumn: { display: "flex", flexDirection: "column" },
  leftCol: { flex: 1, marginRight: "0.5em" },
  rightCol: { flex: 1, marginLeft: "0.5em" },
  singleCol: { marginTop: "1em", marginBottom: "1em" },
};

const Spacer = () => <span style={{ width: "1em" }} />;
const VerticalSpacer = () => <span style={{ height: "1em" }} />;
const Dashboard = () => {
  const isXSmall = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));
  return isXSmall ? (
    <div>
      <div style={styles.flexColumn as CSSProperties}>
        <Welcome />
      </div>
    </div>
  ) : isSmall ? (
    <div style={styles.flexColumn as CSSProperties}>
      <div style={styles.singleCol}>
        <Welcome />
      </div>
    </div>
  ) : (
    <>
      <Welcome />
    </>
  );

  // <Card>
  //   <Title title="Welcome to the administration" />
  //   <CardContent>Lorem ipsum sic dolor amet...</CardContent>
  // </Card>
};

Dashboard.displayName = "Dashboard";

export default Dashboard;
