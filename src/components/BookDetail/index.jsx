import { Drawer } from "antd";
import "./BookDetail.scss";

const BookDetail = (props) => {
  const { dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen } = props;

  return (
    <>
      <Drawer
        title="Chi tiết Book"
        closable={{ "aria-label": "Close Button" }}
        onClose={() => {
          setDataDetail(null);
          setIsDetailOpen(false);
        }}
        open={isDetailOpen}
        width={650}
      >
        {dataDetail && (
          <div className="book-detail">
            <div>Id: {dataDetail._id}</div>
            <div>Tiêu đề: {dataDetail.mainText}</div>
            <div>Tác giả: {dataDetail.author}</div>
            <div>Thể loại: {dataDetail.category}</div>
            <div>
              Giá tiền:
              {new Intl.NumberFormat("vi-Vn", {
                style: "currency",
                currency: "VND",
              }).format(dataDetail.price)}
            </div>
            <div>Số lượng: {dataDetail.quantity}</div>
            <div>Đã bán: {dataDetail.sold}</div>
            <div className="book-detail__item">
              <p>Thumbnail:</p>
              <div className="book-detail__image">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
                    dataDetail.thumbnail
                  }`}
                ></img>
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </>
  );
};
export default BookDetail;
