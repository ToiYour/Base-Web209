/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { TableProps } from "antd";
import { Button, message, Popconfirm, Space, Spin, Table } from "antd";
import axios from "axios";

export interface IProduct {
  id?: number;
  name: string;
  price: number;
  desc: string;
  image: string;
}

const ListProduct = () => {
  const columns: TableProps<IProduct>["columns"] = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Actions",
      key: "actions",
      dataIndex: "actions",
      render: (_: any, product: IProduct) => (
        <>
          <Space>
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={() => mutate(product.id || 0)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" danger>
                Xoá
              </Button>
            </Popconfirm>

            <Button type="primary" href={`/products/${product.id}/edit`}>
              Sửa
            </Button>
          </Space>
        </>
      ),
    },
  ];
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (id: number) => {
      return await axios.delete(`http://localhost:3000/products/${id}`);
    },
    onSuccess: () => {
      message.success("Xoá thành công");
      queryClient.invalidateQueries({
        queryKey: ["Get_ALL_PRODUCTS"],
      });
    },
    onError() {
      message.error("Xoá thất bại");
    },
  });
  const { data, isLoading } = useQuery({
    queryKey: ["Get_ALL_PRODUCTS"],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:3000/products`);
      return data?.map((product: IProduct) => ({
        ...product,
        key: product?.id,
      }));
    },
  });
  if (isLoading) {
    return <Spin />;
  }
  return <Table columns={columns} dataSource={data} />;
};

export default ListProduct;
