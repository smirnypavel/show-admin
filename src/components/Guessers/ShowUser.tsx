import {
  ArrayField,
  BooleanField,
  Datagrid,
  DateField,
  EmailField,
  NumberField,
  ReferenceField,
  Show,
  SimpleShowLayout,
  TextField,
  UrlField,
} from "react-admin";

export const UserShow = () => (
  <Show>
    <SimpleShowLayout>
      <ReferenceField
        source="_id"
        reference="s"
      />
      <EmailField source="email" />
      <TextField source="password" />
      <TextField source="phone" />
      <TextField source="location" />
      <TextField source="master_photo" />
      <BooleanField source="isOnline" />
      <BooleanField source="paid" />
      <BooleanField source="trial" />
      <TextField source="token" />
      <BooleanField source="verify" />
      <BooleanField source="ban" />
      <TextField source="genre" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
      <TextField source="firstName" />
      <TextField source="lastName" />
      <TextField source="telegram" />
      <DateField source="price" />
      <TextField source="description" />
      <TextField source="title" />
      <TextField source="viber" />
      <TextField source="whatsapp" />
      <NumberField source="tg_chat" />
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
      <ArrayField source="photo">
        <Datagrid>
          <UrlField source="url" />
          <ReferenceField
            source="publicId"
            reference="publics"
          />
        </Datagrid>
      </ArrayField>
      <TextField source="video" />
      <TextField source="id" />
    </SimpleShowLayout>
  </Show>
);
