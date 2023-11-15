import {
  ArrayField,
  BooleanField,
  Datagrid,
  DateField,
  NumberField,
  ReferenceField,
  Show,
  SimpleShowLayout,
  TextField,
} from "react-admin";

export const PostShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="tg_chat" />
      <TextField source="location" />
      <ReferenceField
        source="_id"
        reference="s"
      />
      <TextField source="phone" />
      <TextField source="name" />
      <TextField source="description" />
      <ArrayField source="category">
        <Datagrid>
          <ReferenceField
            source="_id"
            reference="s"
          />
          <TextField source="name" />
          <ArrayField source="subcategories">
            <Datagrid>
              <TextField source="name" />
              <TextField source="id" />
            </Datagrid>
          </ArrayField>
        </Datagrid>
      </ArrayField>
      <BooleanField source="active" />
      <BooleanField source="verify" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
      <NumberField source="sms" />
      <TextField source="id" />
    </SimpleShowLayout>
  </Show>
);
