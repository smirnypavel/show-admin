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
      <TextField source="location" />
      <TextField source="phone" />
      <TextField source="name" />
      <ArrayField source="category">
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ArrayField>
      <BooleanField source="active" />
      <BooleanField source="verify" />
      <TextField source="price" />
    </Datagrid>
  </List>
);
