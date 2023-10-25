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

export const CustomUserList = () => (
  <List>
    <Datagrid rowClick="show">
      <EmailField source="email" />
      <TextField source="phone" />
      <TextField source="location" />
      <TextField source="master_photo" />
      <BooleanField source="paid" />
      <BooleanField source="trial" />
      <BooleanField source="verify" />
      <BooleanField source="ban" />
      <TextField source="firstName" />
      <TextField source="lastName" />
      <TextField source="telegram" />
      <DateField source="price" />
      <TextField source="description" />
      <TextField source="title" />
      <TextField source="viber" />
      <NumberField source="tg_chat" />
      <ArrayField source="category">
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ArrayField>
      <ArrayField source="photo">
        <SingleFieldList>
          <ChipField source="url" />
        </SingleFieldList>
      </ArrayField>
      <ReferenceField
        source="_id"
        reference="users"
      />
    </Datagrid>
  </List>
);
