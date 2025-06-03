import { Button, notification, Popconfirm, Space, Table } from "antd";
import BookDetail from "../BookDetail";
import { useEffect, useState } from "react";
import { deleteBookAPI, getALLBookAPI } from "../../services/api.service";
import CreateBookControl from "../CreateBookControl";
import BookUpdate from "../BookUpdate";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const BookTable = () => {
  const [bookData, setBookData] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [loadingTable, setLoadingTable] = useState(false);

  const [dataDetail, setDataDetail] = useState({});
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const [dataUpdate, setDataUpdate] = useState({});
  const [isDataUpdateOpen, setIsDataUpdateOpen] = useState(false);

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const loadBook = async () => {
    setLoadingTable(true);
    const res = await getALLBookAPI(current, pageSize);
    if (res.data) {
      setBookData(res.data.result);
      setCurrent(+res.data.meta.current);
      setPageSize(+res.data.meta.pageSize);
      setTotal(res.data.meta.total);
    }
    setLoadingTable(false);
  };
  useEffect(() => {
    loadBook();
  }, [current, pageSize]);
  const columns = [
    {
      title: "STT",
      key: "stt",
      render: (_, __, index) => <>{(current - 1) * pageSize + (index + 1)}</>,
    },
    {
      title: "Id",
      dataIndex: "_id",
      key: "id",
      render: (text, record) => {
        return (
          <a
            href="#"
            onClick={() => {
              setDataDetail(record);
              setIsDetailOpen(true);
            }}
          >
            {record._id}
          </a>
        );
      },
    },
    {
      title: "Tiêu đề",
      dataIndex: "mainText",
      key: "mainText",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (text) => {
        if (text)
          return new Intl.NumberFormat("vi-Vn", {
            style: "currency",
            currency: "VND",
          }).format(text);
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Hành động",
      key: "action",
      render: (record) => (
        <Space>
          <EditOutlined
            onClick={() => {
              setDataUpdate(record);
              setIsDataUpdateOpen(true);
            }}
          />
          <Popconfirm
            title="Delete book"
            description="Are you sure to delete this book?"
            onConfirm={() => handleDeleteBook(record._id)}
            okText="Yes"
            cancelText="No"
            placement="left"
          >
            <DeleteOutlined />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const handleDeleteBook = async (id) => {
    const res = await deleteBookAPI(id);
    if (res.data) {
      notification.success({
        message: "Delete book",
        description: "Delete book success",
      });
      await loadBook();
    } else {
      notification.error({
        message: "Error delete book",
        description: JSON.stringify(res.message),
      });
    }
  };
  const handleOnChangePagi = (pagination) => {
    if (pagination && pagination.current) {
      if (+pagination.current !== +current) {
        setCurrent(+pagination.current);
      }
    }
    if (pagination && pagination.pageSize) {
      if (+pagination.pageSize !== +pageSize) {
        setPageSize(+pagination.pageSize);
      }
    }
  };
  return (
    <>
      <div className="book__top">
        <h2>Table Book</h2>
        <Button type="primary" onClick={() => setIsCreateOpen(true)}>
          Create
        </Button>
      </div>
      <div className="book__table">
        <Table
          columns={columns}
          dataSource={bookData}
          rowKey={"_id"}
          onChange={handleOnChangePagi}
          loading={loadingTable}
          pagination={{
            total: total,
            current: current,
            pageSize: pageSize,
            showSizeChanger: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} trên ${total} rows`,
          }}
        />
      </div>
      <BookDetail
        dataDetail={dataDetail}
        setDataDetail={setDataDetail}
        isDetailOpen={isDetailOpen}
        setIsDetailOpen={setIsDetailOpen}
      />
      <CreateBookControl
        loadBook={loadBook}
        isCreateOpen={isCreateOpen}
        setIsCreateOpen={setIsCreateOpen}
      />

      <BookUpdate
        loadBook={loadBook}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        isDataUpdateOpen={isDataUpdateOpen}
        setIsDataUpdateOpen={setIsDataUpdateOpen}
      />
    </>
  );
};
export default BookTable;
