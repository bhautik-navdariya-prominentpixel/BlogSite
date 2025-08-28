import * as Yup from 'yup';
import { GetId } from "../utils/utils";

export class BlogModel{
  blogId: string = GetId();
  title: string = "";
  image: string = "";
  author: string = "";
  description: string = "";
  createdDate: Date = new Date();
  userId: string = "";
}

export const BlogModelValidator = Yup.object({
  title: Yup.string().required(),
  image: Yup.string().required(),
  author: Yup.string().required(),
  description: Yup.string().required()
}) 