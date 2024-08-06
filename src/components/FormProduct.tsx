import type { FormProps } from "antd";
import { Button, Form, Input, InputNumber, message } from "antd";
import { IProduct } from "../pages/List";
import TextArea from "antd/es/input/TextArea";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const FormProduct = ({ id }: { id?: number }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  useEffect(() => {
    if (id) {
      (async () => {
        const { data } = await axios.get(
          `http://localhost:3000/products/${id}`
        );
        form.setFieldsValue(data);
      })();
    }
  }, [id]);
  const onFinish: FormProps<IProduct>["onFinish"] = async (values) => {
    console.log("Success:", values);
    try {
      if (id) {
        await axios.put(`http://localhost:3000/products/${id}`, values);
        message.success(`${id ? "Cập nhập" : "Thêm"} thành công`);
        queryClient.invalidateQueries({
          queryKey: ["Get_ALL_PRODUCTS"],
        });
      } else {
        await axios.post(`http://localhost:3000/products`, values);
        message.success(`${id ? "Cập nhập" : "Thêm"} thành công`);
        queryClient.invalidateQueries({
          queryKey: ["Get_ALL_PRODUCTS"],
        });
        navigate("/products");
      }
    } catch (error) {
      message.success(`${id ? "Cập nhập" : "Thêm"} Thất bại`);
    }
  };

  return (
    <Form
      form={form}
      name="basic"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item<IProduct>
        label="Tên sản phẩm"
        name="name"
        rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<IProduct>
        label="Giá"
        name="price"
        rules={[
          { required: true, message: "Vui lòng nhập giá sản phẩm!" },
          {
            type: "number",
            min: 0,
            message: "Giá phải là số dương",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item<IProduct>
        label="Ảnh sản phẩm"
        name="image"
        rules={[{ required: true, message: "Vui lòng nhập ảnh sản phẩm!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<IProduct>
        label="Mô tả sản phẩm"
        name="desc"
        rules={[{ required: true, message: "Vui lòng nhập mô tả sản phẩm!" }]}
      >
        <TextArea />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormProduct;
