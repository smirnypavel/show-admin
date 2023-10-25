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

export const UserEdit = () => (
  <Edit>
    <SimpleForm>
      <ReferenceInput
        source="_id"
        reference="s"
      />
      <TextInput source="email" />
      <TextInput source="phone" />
      <TextInput source="location" />
      <TextInput source="master_photo" />
      <BooleanInput source="isOnline" />
      <BooleanInput source="paid" />
      <BooleanInput source="trial" />
      <BooleanInput source="verify" />
      <BooleanInput source="ban" />
      <TextInput source="firstName" />
      <TextInput source="lastName" />
      <TextInput source="telegram" />
      <DateInput source="price" />
      <TextInput source="description" />
      <TextInput source="title" />
      <TextInput source="viber" />
      <NumberInput source="tg_chat" />
    </SimpleForm>
  </Edit>
);
