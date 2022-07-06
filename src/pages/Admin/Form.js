import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productService } from "../../services/productService";

const AdminForm = () => {
  const { post, update } = productService;
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [image, setImage] = useState();

  useEffect(() => {
    async function fetchProduct() {
      const product = await productService.getById(id);
        setTitle(product.title);
        setDescription(product.description);
        setPrice(product.price);
        setImage(product.image);
    }

    if (id !== "new") {
      fetchProduct();
    }
  }, []);

  const handleChangeTitle = async (event) => {
    setTitle(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleChangeImage = (event) => {
    setImage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (id === "new") {
      await productService.create({
        title,
        description,
        price,
        image,
      });
    } else {
      await productService.update(
        {
          title,
          description,
          price,
          image,
        },
        id
      );
    }
    navigate('/admin', { replace: true })
  };

  return (
    <>
      <h1>{id === "new" ? "Add new" : "Edit " + title}</h1>
      <form className="container" onSubmit={handleSubmit}>
        <label className="element-container">
          Title:
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChangeTitle}
          />
        </label>
        <label className="element-container">
          Description:
          <input
            type="text"
            name="description"
            value={description}
            onChange={handleChangeDescription}
          />
        </label>
        <label className="element-container">
          Price:
          <input
            type="text"
            name="price"
            value={price}
            onChange={handleChangePrice}
          />
        </label>
        <label className="element-container">
          Image URL:
          <input
            type="text"
            name="image"
            value={image}
            onChange={handleChangeImage}
          />
        </label>
        <input className="element-container" type="submit" value="Submit" />
      </form>
    </>
  );
};

export default AdminForm;
