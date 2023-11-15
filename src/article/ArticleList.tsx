import {
  ArrayField,
  ChipField,
  Datagrid,
  DateField,
  List,
  ReferenceField,
  SingleFieldList,
  TextField,
} from "react-admin";

export const ArticleList = () => (
  <List>
    <Datagrid rowClick="show">
      <ReferenceField
        source="_id"
        reference="s"
      />
      <TextField source="title" />
      <ArrayField source="img">
        <SingleFieldList>
          <ChipField source="publicId" />
        </SingleFieldList>
      </ArrayField>
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
      <TextField source="id" />
    </Datagrid>
  </List>
);
