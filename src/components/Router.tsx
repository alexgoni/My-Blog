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

interface RouterProps {
  isAuthenticated: boolean;
}

export default function Router({ isAuthenticated }: RouterProps) {
  return (
    <>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/category-list" element={<CategoryList />} />
            <Route path="/category/:id" element={<Category />} />
            <Route path="/search" element={<Search />} />
            <Route path="/write" element={<Write />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Login />} />
          </>
        )}
      </Routes>
    </>
  );
}
