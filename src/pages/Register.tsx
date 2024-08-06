import type { FormProps } from "antd";
import { Button, Form, Input, message } from "antd";
import axios, { AxiosError } from "axios";

type FieldType = {
  email?: string;
  password?: string;
};

const Register = () => {
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Success:", values);
    try {
      const { data } = await axios.post(
        `http://localhost:3000/register`,
        values
      );
      console.log(data);
      message.success("Tạo tài khoản thành công");
    } catch (error) {
      if (error instanceof AxiosError) {
        message.error(error.response?.data);
      }
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-xl">Đăng ký</h2>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            {
              type: "email",
              message: "Email không đúng định dạng",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu!" },
            {
              min: 6,
              message: "Mật khẩu ít nhất 6 ký tự",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
