import {
  Datagrid,
  List,
  ReferenceField,
  TextField,
  FunctionField,
  RaRecord,
  Identifier,
} from "react-admin";
interface AvatarFieldProps {
  record?: RaRecord;
  source?: string;
}
import Image from "next/image";

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
const AdminsList = () => (
  <List title="All Admins">
    <Datagrid rowClick="show">
      <ReferenceField
        source="_id"
        reference="s"
      />

      <FunctionField
        label="Avatar"
        render={(record: RaRecord<Identifier> | undefined) => (
          <AvatarField
            record={record}
            source="avatar"
          />
        )}
      />
      <TextField source="username" />
      <TextField source="role" />
    </Datagrid>
  </List>
);
export default AdminsList;
