import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./pages/layout";
import ListProduct from "./pages/List";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PrivateRouter from "./pages/PrivateRouter";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          path="products"
          element={
            <PrivateRouter>
              <ListProduct />
            </PrivateRouter>
          }
        />
        <Route
          path="products/add"
          element={
            <PrivateRouter>
              <Add />
            </PrivateRouter>
          }
        />
        <Route
          path="products/:id/edit"
          element={
            <PrivateRouter>
              <Edit />
            </PrivateRouter>
          }
        />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default App;
