import { Button, Input, InputNumber, Modal, notification, Select } from "antd";
import { useState } from "react";
import "./CreateBookControl.scss";
import { createBookAPI, handleUploadFile } from "../../services/api.service";
const CreateBookControl = (props) => {
  const { loadBook, isCreateOpen, setIsCreateOpen } = props;

  const [mainText, setMainText] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("");

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  const resetAll = () => {
    setMainText("");
    setAuthor("");
    setPrice(0);
    setQuantity(0);
    setCategory("");
    setSelectedFile(null);
    setPreview(null);
    setIsCreateOpen(false);
  };

  const createBook = async (thumbnail) => {
    const resBook = await createBookAPI(
      mainText,
      author,
      price,
      quantity,
      category,
      thumbnail
    );

    if (resBook.data) {
      // success
      resetAll();
      await loadBook();
      notification.success({
        message: "Create book",
        description: "Tạo mới book thành công!",
      });
    } else {
      // fail
      notification.error({
        message: "Error create book",
        description: JSON.stringify(resBook.message),
      });
    }
  };
  const handleSubmitBtn = async () => {
    if (!selectedFile) {
      notification.error({
        message: "Error create book",
        description: "Vui lòng upload ảnh Thumbnail!",
      });
      return;
    }

    const resUpload = await handleUploadFile(selectedFile, "book");
    if (!resUpload.data) {
      notification.error({
        message: "Error upload file",
        description: JSON.stringify(resUpload.message),
      });
      return;
    }
    const thumbnail = resUpload.data.fileUploaded;

    await createBook(thumbnail);
  };

  const handleOnChangFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null);
      setPreview(null);
      return;
    }
    setSelectedFile(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <>
      <Modal
        title="Create Book"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isCreateOpen}
        onOk={handleSubmitBtn}
        onCancel={() => resetAll()}
        okText="Create"
      >
        <div className="book-form">
          <div className="book-form__list">
            <div className="book-form__item">
              <span>Tiêu đề</span>
              <Input
                value={mainText}
                onChange={(e) => setMainText(e.target.value)}
              />
            </div>
            <div className="book-form__item">
              <span>Tác giả</span>
              <Input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div className="book-form__item">
              <span>Giá tiền</span>
              <InputNumber
                addonAfter="đ"
                value={price}
                onChange={(e) => setPrice(e)}
              />
            </div>
            <div className="book-form__item">
              <span>Số lượng</span>
              <InputNumber value={quantity} onChange={(e) => setQuantity(e)} />
            </div>
            <div className="book-form__item">
              <span>Thể loại</span>
              <Select
                style={{ width: "100%" }}
                onChange={(e) => setCategory(e)}
                value={category}
                options={[
                  { value: "Arts", label: "Arts" },
                  { value: "Business", label: "Business" },
                  { value: "Comics", label: "Comics" },
                  { value: "Cooking", label: "Cooking" },
                  { value: "Entertainment", label: "Entertainment" },
                  { value: "History", label: "History" },
                  { value: "Music", label: "Music" },
                  { value: "Sports", label: "Sports" },
                  { value: "Teen", label: "Teen" },
                  { value: "Travel", label: "Travel" },
                ]}
              />
            </div>
            <div className="book-form__thumbnail">
              <span>Ảnh thumbnail</span>
              <label htmlFor="btn-upload-thumbnail">
                <span>Upload</span>
              </label>
              <input
                type="file"
                id="btn-upload-thumbnail"
                hidden
                onChange={handleOnChangFile}
                onClick={(e) => {
                  e.target.value = null;
                }}
              />
            </div>
            {preview && (
              <div className="book-form__preview">
                <img src={preview} />
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};
export default CreateBookControl;
