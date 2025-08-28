import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
// import SimpleReactValidator from "simple-react-validator";
import { useSelector } from "react-redux";
import type { StoreType } from "../../store";
import { BlogModel, BlogModelValidator } from "../../models/BlogModel";
import { toBase64 } from "../../utils/utils";
import { addBlog, updateBlog } from "../../helpers/BlogHelper";
import { ErrorMessage, Field, Form, Formik } from "formik";

const BlogForm = ({ mode, blogModeldata: blogModeldata = new BlogModel() }: { mode: "ADD" | "EDIT"; blogModeldata?: BlogModel }) => {
  const currentUser = useSelector((store: StoreType) => store.auth.user);
  const [imgSrc, setImageSrc] = useState<string>(blogModeldata.image);
  const editorRef = useRef<any>(null);
  const navigate = useNavigate();

  async function onInputImage(e: ChangeEvent, setFieldValue: Function) {
    const target = e.target as HTMLInputElement;
    if (target.files) {
      const image: File = target.files[0];
      if (!/^image\//.test(image.type)) {
        return;
      }
      const base64Image = await toBase64(image);
      if (typeof base64Image == "string") {
        setImageSrc(base64Image);
        console.log(base64Image);
        setFieldValue("image", base64Image);
      }
    }
  }

  function onFormSubmit(formData: BlogModel) {
    console.log(formData);
    // formData.description = editorRef.current.getContent();
    if (mode == "ADD") {
      addBlog(formData);
    } else if (mode == "EDIT") {
      updateBlog(formData);
    }
    navigate("/profile/blogs");
  }
  return (
    <div className='w-7xl mx-auto bg-black   rounded-lg p-8 space-y-8'>
      {/* Form Heading */}
      <div className='text-center mb-6'>
        <h2 className='text-3xl font-bold'>{mode === "ADD" ? "Publish New" : "Update"} Blog</h2>
        <p className='mt-2 text-sm text-gray-400'>Share your thoughts with the world by creating a new blog post.</p>
      </div>
      <Formik<BlogModel>
        initialValues={{
          ...blogModeldata,
          author: currentUser.firstName + " " + currentUser.lastName,
          userId: currentUser.userId ?? ""
        }}
        validationSchema={BlogModelValidator}
        onSubmit={onFormSubmit}
      >
        {({ setFieldValue }) => (
          <Form className='space-y-8'>
            <div className='grid grid-cols-1 md:grid-cols-12 gap-10 items-stretch'>
              {/* Left Side */}
              <div className='flex flex-col justify-between space-y-6 col-span-5'>
                {/* Title */}
                <div>
                  <label htmlFor='title' className='block text-sm font-medium mb-2'>
                    Blog Title
                  </label>
                  <Field
                    type='text'
                    id='title'
                    name='title'
                    placeholder='Enter blog title'
                    className='w-full rounded-md bg-black border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500'
                  />
                  <ErrorMessage name='title' component='div' className='text-red-600' />
                </div>

                {/* Image Upload */}
                <div className='grid grid-cols-12'>
                  <div className='col-span-6'>
                    <label htmlFor='image' className='block text-sm font-medium mb-2'>
                      Upload Image
                    </label>
                    <Field type='text' name='image' hidden />
                    <input
                      type='file'
                      id='image2'
                      accept='image/*'
                      onChange={(e: ChangeEvent) => onInputImage(e, setFieldValue)}
                      name='image2'
                      className='w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4
                       file:rounded-md file:border-0
                       file:text-sm file:font-semibold
                       file:bg-gray-800 file:text-white
                       hover:file:bg-gray-700'
                    />
                    <ErrorMessage name='image' component='div' className='text-red-600' />
                  </div>
                  <div className='col-span-6'>
                    {imgSrc !== "" && <img src={imgSrc} className='rounded-2xl m-1 mt-2 border h-[200px] w-[100%] object-cover' />}
                  </div>
                </div>

                {/* Author Name */}
                <div>
                  <label htmlFor='author' className='block text-sm font-medium mb-2'>
                    Author
                  </label>
                  <Field
                    type='text'
                    id='author'
                    name='author'
                    disabled
                    className='w-full rounded-md bg-gray-900 border border-gray-700 px-4 py-2 text-gray-400 cursor-not-allowed'
                  />
                  <ErrorMessage name='author' component='div' className='text-red-600' />
                </div>
              </div>

              {/* Right Side */}
              <div className='flex flex-col h-full w-full col-span-7'>
                <label htmlFor='description' className='block text-sm font-medium mb-2'>
                  Description
                </label>
                <input type='text' hidden name='description' />
                <Editor
                  apiKey='z0schxrzbrgcgm6n35rkygxwz97h3yeiwlhn1rd7p13aw9x7'
                  onInit={(_evt, editor) => (editorRef.current = editor)}
                  initialValue={blogModeldata.description}
                  onChange={() => setFieldValue("description", editorRef.current.getContent())}
                  init={{
                    skin: "oxide-dark", // 👈 Dark skin
                    content_css: "dark", // 👈 Dark content area
                    height: 400,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "fontsize" +
                      "undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    // content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px, background-color: black }",
                    content_style: `
                    p { font-size: 16px; line-height: 1.6; }
                    h1, h3 { color: #e03e2d; }
                    a { color: #0099ff; text-decoration: underline; }
                  `,
                  }}
                />
                <ErrorMessage name='description' component='div' className='text-red-600' />
                {/* <span className='text-red-600'>{validator.current.message("description", formData.description, "required")}</span> */}
              </div>
            </div>

            {/* Full-Width Submit Button */}
            <div>
              <button
                type='submit'
                className='w-full py-3 bg-white text-black font-semibold rounded-md border border-gray-700 hover:bg-gray-200 transition'
              >
                {mode == "ADD" ? "Publish" : "Update"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BlogForm;
