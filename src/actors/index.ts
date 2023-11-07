import VisitorIcon from "@mui/icons-material/People";
import { CustomUserList } from "./UserList";
import { UserEdit } from "./UserEdit";
import { UserShow } from "./ShowUser";

const resource = {
  list: CustomUserList,
  show: UserShow,
  edit: UserEdit,
  icon: VisitorIcon,
};

export default resource;
