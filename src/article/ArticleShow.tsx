import {
  ArrayField,
  Datagrid,
  DateField,
  ReferenceField,
  Show,
  SimpleShowLayout,
  TextField,
  UrlField,
} from "react-admin";

export const ArticleShow = () => (
  <Show>
    <SimpleShowLayout>
      <ReferenceField
        source="_id"
        reference="s"
      />
      <TextField source="title" />
      <TextField source="description" />
      <ArrayField source="img">
        <Datagrid>
          <ReferenceField
            source="publicId"
            reference="publics"
          />
          <UrlField source="url" />
        </Datagrid>
      </ArrayField>
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
      <TextField source="id" />
    </SimpleShowLayout>
  </Show>
);
