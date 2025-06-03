import { Input, InputNumber, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { handleUploadFile, updateBookAPI } from "../../services/api.service";

const BookUpdate = (props) => {
  const {
    loadBook,
    dataUpdate,
    setDataUpdate,
    isDataUpdateOpen,
    setIsDataUpdateOpen,
  } = props;

  const [id, setId] = useState("");
  const [mainText, setMainText] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("");

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  const resetAll = () => {
    setId("");
    setMainText("");
    setAuthor("");
    setPrice(0);
    setQuantity(0);
    setCategory("");
    setSelectedFile(null);
    setPreview(null);
    setIsDataUpdateOpen(false);
    setDataUpdate(null);
  };

  useEffect(() => {
    if (dataUpdate && dataUpdate._id) {
      setId(dataUpdate._id);
      setMainText(dataUpdate.mainText);
      setAuthor(dataUpdate.author);
      setPrice(dataUpdate.price);
      setQuantity(dataUpdate.quantity);
      setCategory(dataUpdate.category);
      setPreview(
        `${import.meta.env.VITE_BACKEND_URL}/images/book/${
          dataUpdate.thumbnail
        }`
      );
    }
  }, [dataUpdate]);
  const handleOnChangFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null);
      setPreview(null);
      return;
    }
    setSelectedFile(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const updateBook = async (newThumbnail) => {
    const resBook = await updateBookAPI(
      id,
      mainText,
      author,
      price,
      quantity,
      category,
      newThumbnail,
      dataUpdate.slider,
      dataUpdate.sold
    );

    if (resBook.data) {
      // success
      resetAll();
      await loadBook();
      notification.success({
        message: "Update book",
        description: "Update book success!",
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
    //
    if (!selectedFile && !preview) {
      notification.error({
        message: "Error update book",
        description: "Pleace upload image thumbnail",
      });
      return;
    }
    let newThumbnail = "";
    // có ảnh preview không có ảnh upload
    if (!selectedFile && preview) {
      newThumbnail = dataUpdate.thumbnail;
    } else {
      // => có ảnh preview và ảnh upload => updloadFile
      const resUpload = await handleUploadFile(selectedFile, "book");
      if (resUpload && resUpload.data) {
        // cap nhat
        newThumbnail = resUpload.data.fileUploaded;
      } else {
        notification.error({
          message: "Error upload file",
          description: JSON.stringify(resUpload.message),
        });
        return;
      }
    }

    // update Book
    await updateBook(newThumbnail);
  };
  return (
    <>
      <Modal
        title="Create Book"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isDataUpdateOpen}
        onOk={handleSubmitBtn}
        onCancel={() => resetAll()}
        okText="Update"
      >
        <div className="book-form">
          <div className="book-form__list">
            <div className="book-form__item">
              <span>Id</span>
              <Input value={id} disabled />
            </div>
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

export default BookUpdate;
