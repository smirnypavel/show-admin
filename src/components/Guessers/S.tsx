import {
  ArrayField,
  BooleanField,
  ChipField,
  Datagrid,
  DateField,
  EmailField,
  List,
  NumberField,
  ReferenceField,
  SingleFieldList,
  TextField,
} from "react-admin";

export const ListS = () => (
  <List>
    <Datagrid rowClick="edit">
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
        <SingleFieldList>
          <ChipField source="_id" />
        </SingleFieldList>
      </ArrayField>
      <ArrayField source="photo">
        <SingleFieldList>
          <ChipField source="url" />
        </SingleFieldList>
      </ArrayField>
      <TextField source="video" />
      <TextField source="id" />
    </Datagrid>
  </List>
);
