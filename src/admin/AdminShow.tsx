import { ReferenceField, Show, SimpleShowLayout, TextField } from "react-admin";

export const AdminShow = () => (
  <Show>
    <SimpleShowLayout>
      <ReferenceField
        source="_id"
        reference="s"
      />
      <TextField source="id" />
      <TextField source="avatar" />
      <TextField source="username" />
      <TextField source="password" />
      <TextField source="role" />
    </SimpleShowLayout>
  </Show>
);
