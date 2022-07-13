import React from "react";
import styled, { css } from "styled-components";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../redux/apiCalls";
const Container = styled.div`
  flex: 4;
`;
const UserListUser = styled.div`
  display: flex;
  align-items: center;
`;
const UserListImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;
const UserListEdit = styled.button`
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  background-color: #3bb077;
  color: white;
  cursor: pointer;
  margin-right: 20px;
`;
const UserListDelete = styled(DeleteOutline)`
  color: red;
  cursor: pointer;
`;

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.createUser.users);
  useEffect(() => {
    getUser(dispatch);
  }, [dispatch]);
  const handleDelete = (id) => {};
  console.log(users);
  const columns = [
    { field: "_id", headerName: "ID", width: 200},
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <UserListUser>
            <UserListImg src={params.row.avatar} alt="" />
            {params.row.username}
          </UserListUser>
        );
      },
    },
    { field: "fullname", headerName: "Tên đầy đủ", width: 200 },
    {
      field: "email",
      headerName: "Email",
      width: 220,
    },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <div>
            <Link to={"/user/" + params.row._id}>
              <UserListEdit>Edit</UserListEdit>
            </Link>
            <UserListDelete onClick={() => handleDelete(params.row._id)} />
          </div>
        );
      },
    },
  ];

  return (
    <Container>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={users}
          disableSelectionOnClick
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </Container>
  );
};

export default UserList;
