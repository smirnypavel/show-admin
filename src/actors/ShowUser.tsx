import {
  ArrayField,
  BooleanField,
  Datagrid,
  DateField,
  ReferenceField,
  Show,
  SimpleShowLayout,
  TextField,
  UrlField,
  NumberField,
  RaRecord,
  FunctionField,
  Identifier,
  ImageField,
} from "react-admin";
import { Typography, Grid, Box } from "@mui/material";
import Image from "next/image";
import { UserInfo } from "./UserInfo";
import MyUrlField from "./MyUrlField";
interface AvatarFieldProps {
  record?: RaRecord;
  source?: string;
}
const PosterField: React.FC<AvatarFieldProps> = ({ record, source }) => {
  const hasValidSource = record && source && record[source];
  return (
    <div
      style={{
        width: 120,
        height: "auto",
        overflow: "hidden",
        borderRadius: 10,
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
export const UserShow = () => {
  return (
    <Show>
      <SimpleShowLayout>
        <ReferenceField
          source="_id"
          reference="s"
        />
        <MyUrlField source="email" />
        <Grid
          container
          alignItems="center">
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}>
            <FunctionField
              label="Avatar"
              render={(record: RaRecord<Identifier> | undefined) => (
                <PosterField
                  record={record}
                  source="master_photo"
                />
              )}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}>
            <UserInfo />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}>
            <TextField source="firstName" />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}>
            <TextField source="lastName" />
          </Grid>
        </Grid>

        <Grid
          container
          alignItems="center">
          <Box
            display="flex"
            alignItems="center">
            <Typography
              variant="body1"
              component="div">
              Is Online:
            </Typography>
            <BooleanField
              source="isOnline"
              label=""
            />
          </Box>
          <Box
            display="flex"
            alignItems="center">
            <Typography
              variant="body1"
              component="div">
              Paid:
            </Typography>
            <BooleanField
              source="paid"
              label=""
            />
          </Box>
          <Box
            display="flex"
            alignItems="center">
            <Typography
              variant="body1"
              component="div">
              Trial:
            </Typography>
            <BooleanField
              source="trial"
              label=""
            />
          </Box>
          <Box
            display="flex"
            alignItems="center">
            <Typography
              variant="body1"
              component="div">
              Verify:
            </Typography>
            <BooleanField
              source="verify"
              label=""
            />
          </Box>
          <Box
            display="flex"
            alignItems="center">
            <Typography
              variant="body1"
              component="div">
              Ban:
            </Typography>
            <BooleanField
              source="ban"
              label=""
            />
          </Box>
        </Grid>
        <DateField source="createdAt" />
        <DateField source="updatedAt" />

        <NumberField source="price" />
        <TextField source="description" />
        <TextField source="title" />
        <ArrayField source="category">
          <Datagrid>
            <ReferenceField
              source="_id"
              reference="s"
            />
            <TextField source="name" />
            <ArrayField source="subcategories">
              <Datagrid>
                <TextField source="name" />
                <TextField source="id" />
              </Datagrid>
            </ArrayField>
          </Datagrid>
        </ArrayField>

        {/* <ArrayField source="photo">
          <Datagrid>
            <UrlField source="url" />
            <ReferenceField
              source="publicId"
              reference="publics"
            />
          </Datagrid>
        </ArrayField> */}
        <ArrayField source="photo">
          <Datagrid>
            <ImageField
              source="url"
              label="Image"
              title="title"
            />
          </Datagrid>
        </ArrayField>

        <TextField source="video" />
        <TextField source="id" />
      </SimpleShowLayout>
    </Show>
  );
};
