import Image from "next/image";
import React from "react";
import {
  FunctionField,
  Datagrid,
  List,
  TextField,
  RaRecord,
  BooleanField,
  ArrayField,
  SingleFieldList,
  ChipField,
  Identifier,
  Filter, // Import the Filter component
  TextInput, // Import TextInput for text input field
} from "react-admin";

interface AvatarFieldProps {
  record?: RaRecord;
  source?: string;
}
const UserFilter: React.FC = (props) => (
  <Filter {...props}>
    <TextInput
      label="Search by First Name"
      source="firstName"
      alwaysOn
    />
    <TextInput
      label="Search by Last Name"
      source="lastName"
      alwaysOn
    />
    <TextInput
      label="Search by ID"
      source="_id"
      alwaysOn
    />
  </Filter>
);

const AvatarField: React.FC<AvatarFieldProps> = ({ record, source }) => {
  const hasValidSource = record && source && record[source];

  return (
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        overflow: "hidden",
      }}>
      {hasValidSource ? (
        <Image
          src={record![source!]} // Використовуйте non-null assertion operator, якщо ви впевнені, що значення не буде null або undefined
          alt="Avatar"
          layout="responsive"
          width={40}
          height={40}
        />
      ) : (
        <div>Немає зображення</div>
      )}
    </div>
  );
};

export const CustomUserList: React.FC = () => (
  <List
    title="All Users"
    filters={<UserFilter />}>
    <Datagrid rowClick="show">
      <FunctionField
        label="Avatar"
        render={(record: RaRecord<Identifier> | undefined) => (
          <AvatarField
            record={record}
            source="master_photo"
          />
        )}
      />
      <TextField source="firstName" />
      <TextField source="lastName" />
      <TextField source="" />
      <BooleanField source="paid" />
      <BooleanField source="trial" />
      <BooleanField source="verify" />
      <BooleanField source="ban" />
      <ArrayField source="category">
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ArrayField>
    </Datagrid>
  </List>
);
