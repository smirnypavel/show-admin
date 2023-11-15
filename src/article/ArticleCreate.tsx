import React, { FC } from "react";
import { Create, CreateProps, SimpleForm, TextInput } from "react-admin";
import { RichTextInput, RichTextInputToolbar } from "ra-input-rich-text";

const ArticleCreate: FC<CreateProps> = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput
        source="title"
        label="Title"
      />
      <RichTextInput
        toolbar={<RichTextInputToolbar size="large" />}
        source="description"
        label="Description"
      />
    </SimpleForm>
  </Create>
);

export default ArticleCreate;
