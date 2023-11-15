import React, { FC } from "react";
// import { v4 as uuidv4 } from "uuid";
import {
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  CreateProps,
  NumberInput,
} from "react-admin";

const UserCreate: FC<CreateProps> = (props) => {
  return (
    <Create
      title="Создать пользователя"
      {...props}>
      <SimpleForm
        mode="onBlur"
        reValidateMode="onBlur">
        <TextInput
          source="username"
          // validate={required()}
          label="Имя пользователя"
        />

        <TextInput
          source="email"
          label="Email"
        />
        <TextInput
          source="password"
          label="Пароль"
          type="password"
        />
        <SelectInput
          source="role"
          label="Роль"
          choices={[
            { id: "superAdmin", name: "Супер-администратор" },
            { id: "admin", name: "Администратор" },
            { id: "moderator", name: "Модератор" },
            { id: "contentManager", name: "Kонтент менеджер" },
          ]}
        />
      </SimpleForm>
    </Create>
  );
};

export default UserCreate;
