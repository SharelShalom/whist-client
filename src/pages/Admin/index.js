import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productService } from "../../services/productService";

const Admin = () => {
  const columns = [
    { label: "Title", type: "title" },
    { label: "Price", type: "price" },
    { label: "Options", type: "options" },
  ];


  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const products = await productService.get();
      setData(products);
    }

    fetchProducts();
  }, []);

  const edit = (id) => {
    console.log("Edit" + id);
  };

  const deleteItem = async (id) => {
    await productService.remove(id);
    data.splice(data.indexOf(data.find((item) => item._id === id)), 1);
    setData((data) => [...data]);
  };

  return (
    <>
      <Link
        className="btn btn-primary"
        to="/admin/new"
        style={{ marginBottom: 20 }}
      >
        Add
      </Link>
      <table
        className="table"
        style={{
          borderWidth: "1px",
          borderColor: "#aaaaaa",
          borderStyle: "solid",
        }}
      >
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.label || column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td key={item._id}>{item.title}</td>
              <td key={item._id}>{item.price}</td>
              <td>
                <Link
                  to={`/admin/${item._id}`}
                  className="btn btn-primary btn-sm"
                  style={{ marginBottom: 20 }}
                >
                  Edit
                </Link>
              </td>
              <div>
                <button
                  onClick={() => deleteItem(item._id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </div>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <button onClick={handleServer}>Server</button> */}
    </>
  );
};

export default Admin;
