import React from "react";
import { useState } from "react";
import { Publish } from "@material-ui/icons";
import styled, { css } from "styled-components";
import app from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { addProduct } from "../redux/apiCalls";
import { useDispatch } from "react-redux";
const Container = styled.div`
  flex: 4;
  display: flex;
`;
const Right = styled.div`
  flex: 2;
  padding-top: 40px;
`;
const AddProductForm = styled.form`
  margin-top: 10px;
  flex: 1;
`;
const AddProductItem = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  & > label {
    color: gray;
    font-weight: 600;
    margin-bottom: 10px;
  }
  & > input {
    padding: 10px;
  }
  & > select {
    padding: 10px;
  }
`;
const AddProductButton = styled.button`
  margin-top: 10px;
  padding: 7px 10px;
  border: none;
  border-radius: 10px;
  background-color: darkblue;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;
const AddProductUpload = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;

`;
const AddProductImg = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 20px;
`;
const AddProductTitle = styled.h1``;
const NewProduct = () => {
  const [inputs, setInputs] = useState({});
  const [file, setFiles] = useState(null);
  const [cat, setCat] = useState([]);
  const [url, setUrl] = useState(
    "https://thumbs.dreamstime.com/z/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg"
  );
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };
  const handleURL = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setUrl(downloadURL);
        });
      }
    );
  };
  const handleClick = (e) => {
    e.preventDefault();
    const product = { ...inputs, img: url, categories: cat };
    addProduct(product, dispatch);
  };

  return (
    <Container>
      <AddProductForm>
        <AddProductTitle>New Product</AddProductTitle>
        <AddProductItem>
          <AddProductUpload>
            {/* <label>Image</label> */}
            <input
              type="file"
              id="file"
              onChange={(e) => setFiles(e.target.files[0])}
            />
            <Publish onClick={handleURL} />
          </AddProductUpload>
        </AddProductItem>
        <AddProductItem>
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="Apple Airpods"
            onChange={handleChange}
          />
        </AddProductItem>
        <AddProductItem>
          <label>Price</label>
          <input
            type="text"
            name="price"
            placeholder="Apple Airpods"
            onChange={handleChange}
          />
        </AddProductItem>
        <AddProductItem>
          <label>Discription</label>
          <input
            name="desc"
            type="text"
            placeholder="Apple Airpods"
            onChange={handleChange}
          />
        </AddProductItem>
        <AddProductItem>
          <label>Categories</label>
          <input type="text" placeholder="Apple Airpods" onChange={handleCat} />
        </AddProductItem>
        <AddProductItem>
          <label>Stock</label>
          <select name="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </AddProductItem>
        <AddProductButton onClick={handleClick}>Create</AddProductButton>
      </AddProductForm>
      <Right>
        <AddProductImg src={url} />
      </Right>
    </Container>
  );
};

export default NewProduct;
