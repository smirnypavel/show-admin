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
} from "react-admin";

interface AvatarFieldProps {
  record?: RaRecord;
  source?: string;
}

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
  <List>
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
