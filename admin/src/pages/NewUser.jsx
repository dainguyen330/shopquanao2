import React from "react";
import styled, { css } from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/apiCalls";
const Container = styled.div`
  flex: 4;
`;
const NewUserTitle = styled.h1``;
const NewUserForm = styled.form`
  display: flex;
  flex-wrap: wrap;
`;
const NewUserItem = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-right: 20px;
  & > lable {
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 600;
    color: #9c9a9a;
  }
  & > input {
    height: 20px;
    padding: 10px;
    border: 1px solid gray;
    border-radius: 5px;
  }
`;
const NewUserGender = styled.div`
  & > input {
    margin-top: 15px;
  }
  & > label {
    margin: 10px;
    font-size: 18px;
    color: #555;
  }
`;
const NewUserSelect = styled.select`
  height: 40px;
  border-radius: 5px;
`;
const NewUserButton = styled.button`
  width: 200px;
  border: none;
  background-color: darkblue;
  color: white;
  padding: 7px 10px;
  font-weight: 600;
  border-radius: 10px;
  margin-top: 30px;
  cursor: pointer;
`;

const NewUser = () => {
  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleClick = (e) =>{
    e.preventDefault();
    const user = {...inputs};
    addUser(user, dispatch)
  }
  console.log(inputs);
  return (
    <Container>
      <NewUserTitle>New User</NewUserTitle>
      <NewUserForm>
        <NewUserItem>
          <lable>Tên tài khoản</lable>
          <input
            type="text"
            name="username"
            placeholder="VanA"
            onChange={handleChange}
          />
        </NewUserItem>
        <NewUserItem>
          <lable>Tên người dùng</lable>
          <input
            type="text"
            name="fullname"
            placeholder="Nguyễn Văn A"
            onChange={handleChange}
          />
        </NewUserItem>
        <NewUserItem>
          <lable>Email</lable>
          <input
            type="email"
            name="email"
            placeholder="admin@email.com"
            onChange={handleChange}
          />
        </NewUserItem>
        <NewUserItem>
          <lable>Mật khẩu</lable>
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            onChange={handleChange}
          />
        </NewUserItem>
        <NewUserItem>
          <lable>Số điện thoại</lable>
          <input
            type="number"
            name="phonenumber"
            placeholder="0123456789"
            onChange={handleChange}
          />
        </NewUserItem>
        <NewUserItem>
          <lable>Địa chỉ</lable>
          <input
            type="text"
            name="address"
            placeholder="Long Biên - Hà Nội"
            onChange={handleChange}
          />
        </NewUserItem>
        <NewUserItem>
          <lable>Giới tính</lable>
          <NewUserGender>
            <input type="radio" name="gender" id="male" value="male" />
            <label for="male">Nam</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label for="female">Nữ</label>
            <input type="radio" name="gender" id="other" value="other" />
            <label for="other">Khác</label>
          </NewUserGender>
        </NewUserItem>
        <NewUserItem>
          <label>Hoạt động</label>
          <NewUserSelect name="active" id="active">
            <option value="yes">Có</option>
            <option value="no">Không</option>
          </NewUserSelect>
        </NewUserItem>
        <NewUserItem>
          <NewUserButton onClick={handleClick}>Create</NewUserButton>
        </NewUserItem>
      </NewUserForm>
    </Container>
  );
};

export default NewUser;
