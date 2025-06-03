import axios from "./axios.customize";

const createUserAPI = (fullName, email, password, phone) => {
  const URL_BACKEND = "/api/v1/user/register";
  const data = {
    fullName: fullName,
    email: email,
    password: password,
    phone: phone,
  };
  const res = axios.post(URL_BACKEND, data);
  return res;
};

const registerUserAPI = (fullName, email, password, phone) => {
  const URL_BACKEND = "/api/v1/user/register";
  const data = {
    fullName: fullName,
    email: email,
    password: password,
    phone: phone,
  };
  const res = axios.post(URL_BACKEND, data);
  return res;
};
const loginAPI = (email, password) => {
  const URL_BACKEND = "/api/v1/auth/login";
  const data = {
    username: email,
    password: password,
    delay: 2000,
  };
  const res = axios.post(URL_BACKEND, data);
  return res;
};
const getAccountAPI = () => {
  const URL_BACKEND = "/api/v1/auth/account";

  const res = axios.get(URL_BACKEND);
  return res;
};

const logoutAPI = () => {
  const URL_BACKEND = "/api/v1/auth/logout";

  const res = axios.post(URL_BACKEND);
  return res;
};
const getALLBookAPI = (current, pageSize) => {
  const URL_BACKEND = `/api/v1/book?current=${current}&pageSize=${pageSize}`;
  const res = axios.get(URL_BACKEND);
  return res;
};
const handleUploadFile = (file, folder) => {
  const URL_BACKEND = "/api/v1/file/upload";
  let config = {
    headers: {
      "upload-type": folder,
      "Context-Type": "multipart/form-data",
    },
  };
  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", file);

  const res = axios.post(URL_BACKEND, bodyFormData, config);
  return res;
};
const createBookAPI = (
  mainText,
  author,
  price,
  quantity,
  category,
  selectedFile
) => {
  const URL_BACKEND = "/api/v1/book";
  const data = {
    mainText: mainText,
    author: author,
    price: price,
    quantity: quantity,
    category: category,
    thumbnail: selectedFile,
    slider: [],
    sold: 0,
  };
  const res = axios.post(URL_BACKEND, data);
  return res;
};

const updateBookAPI = (
  _id,
  mainText,
  author,
  price,
  quantity,
  category,
  selectedFile,
  slider,
  sold
) => {
  const URL_BACKEND = `/api/v1/book/${_id}`;
  const data = {
    mainText: mainText,
    author: author,
    price: price,
    quantity: quantity,
    category: category,
    thumbnail: selectedFile,
    slider: slider,
    sold: sold,
  };
  const res = axios.put(URL_BACKEND, data);
  return res;
};
const deleteBookAPI = (_id) => {
  const URL_BACKEND = `/api/v1/book/${_id}`;
  const res = axios.delete(URL_BACKEND);
  return res;
};
export {
  createUserAPI,
  registerUserAPI,
  loginAPI,
  getAccountAPI,
  logoutAPI,
  getALLBookAPI,
  handleUploadFile,
  createBookAPI,
  updateBookAPI,
  deleteBookAPI,
};
