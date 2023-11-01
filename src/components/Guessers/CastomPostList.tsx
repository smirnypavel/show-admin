import {
  ArrayField,
  BooleanField,
  ChipField,
  Datagrid,
  List,
  NumberField,
  ReferenceField,
  SingleFieldList,
  TextField,
} from "react-admin";

export const PostList = () => (
  <List title="All posts">
    <Datagrid rowClick="show">
      <TextField source="_id" />
      <TextField source="location" />
      <TextField source="phone" />
      <TextField source="name" />
      <TextField source="description" />
      <ArrayField source="category">
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ArrayField>
      <BooleanField source="active" />
      <BooleanField source="verify" />
      <NumberField source="sms" />
      <TextField source="price" />
      <TextField source="date" />
    </Datagrid>
  </List>
);
