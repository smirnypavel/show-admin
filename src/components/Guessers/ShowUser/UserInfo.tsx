import React from "react";
import { Grid } from "@mui/material"; // Імпорт Grid з @mui/material
import { TextField, EmailField } from "react-admin";

export const UserInfo = () => (
  <Grid
    container
    spacing={2}>
    <Grid
      item
      xs={12}
      sm={6}>
      <EmailField
        source="email"
        label="Електронна пошта"
      />
    </Grid>
    <Grid
      item
      xs={12}
      sm={6}>
      <TextField
        source="phone"
        label="Телефон"
      />
    </Grid>
    <Grid
      item
      xs={12}
      sm={6}>
      <TextField
        source="location"
        label="Місце знаходження"
      />
    </Grid>
    {/* Додайте інші поля для інформації про користувача */}
  </Grid>
);

// Створіть інші компоненти для інших блоків полів, наприклад, UserStatus, UserCategories, і т. д.
