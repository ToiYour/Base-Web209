import type { MenuProps } from "antd";
import { Menu } from "antd";
import { Link, Outlet } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "sub1",
    label: "Sản phẩm",
    children: [
      {
        key: "g1",
        label: <Link to={"/products"}>Danh sách</Link>,
      },
      {
        key: "g2",
        label: <Link to={"/products/add"}>Thêm mới</Link>,
      },
    ],
  },
  {
    key: "register",
    label: <Link to={"register"}>Đăng ký</Link>,
  },
  {
    key: "login",
    label: <Link to={"login"}>Đăng nhập</Link>,
  },
];
const Layout = () => {
  return (
    <div className="flex items-center h-screen gap-5">
      <Menu
        className="h-full"
        style={{ width: 256 }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
      />
      <div className="h-full w-full px-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
