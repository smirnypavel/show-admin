import BookIcon from "@mui/icons-material/Book";
import { PostList } from "@/post/PostList";
import { PostShow } from "@/post/PostShow";
import { PostEdit } from "@/post/PostEdit";

const resource = {
  list: PostList,
  show: PostShow,
  icon: BookIcon,
  edit: PostEdit,
};

export default resource;
