import {
  ArrayInput,
  BooleanInput,
  DateInput,
  Edit,
  NumberInput,
  ReferenceInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
} from "react-admin";

export const PostEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="tg_chat" />
      <TextInput source="location" />
      <ReferenceInput
        source="_id"
        reference="s"
      />
      <TextInput source="phone" />
      <TextInput source="name" />
      <TextInput source="description" />
      <ArrayInput source="category">
        <SimpleFormIterator>
          <ReferenceInput
            source="_id"
            reference="s"
          />
          <TextInput source="name" />
          <ArrayInput source="subcategories">
            <SimpleFormIterator>
              <TextInput source="name" />
              <TextInput source="id" />
            </SimpleFormIterator>
          </ArrayInput>
        </SimpleFormIterator>
      </ArrayInput>
      <BooleanInput source="active" />
      <BooleanInput source="verify" />
      <DateInput source="createdAt" />
      <DateInput source="updatedAt" />
      <NumberInput source="sms" />
      <TextInput source="id" />
    </SimpleForm>
  </Edit>
);
