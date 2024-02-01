import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "pages/home";
import Write from "pages/write";
import Edit from "pages/edit";
import Post from "pages/post";
import CategoryList from "pages/category_list";
import Search from "pages/search";
import Category from "pages/category";
import Login from "pages/login";
import Register from "pages/register";
import { useRecoilValue } from "recoil";
import { isUserAdminState, currentUserObj } from "recoil/user";

export default function Router() {
  const user = useRecoilValue(currentUserObj);
  const isUserAdmin = useRecoilValue(isUserAdminState);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category-list" element={<CategoryList />} />
        <Route path="/category/:category/:id" element={<Category />} />
        <Route path="/search" element={<Search />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate replace to="/" />} />
        {!user && <Route path="/login" element={<Login />} />}
        {isUserAdmin && (
          <>
            <Route path="/write" element={<Write />} />
            <Route path="/edit/:id" element={<Edit />} />
          </>
        )}
      </Routes>
    </>
  );
}
