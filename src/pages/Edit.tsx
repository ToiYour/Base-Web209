import { useParams } from "react-router-dom";
import FormProduct from "../components/FormProduct";

const Edit = () => {
  const { id } = useParams();
  return (
    <div className="p-5">
      <h2 className="text-xl">Cập nhập sản phẩm</h2>
      <FormProduct id={Number(id)} />
    </div>
  );
};

export default Edit;
