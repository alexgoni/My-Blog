import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "pages/home";
import About from "pages/about";
import Write from "pages/write";
import Edit from "pages/edit";
import Post from "pages/post";
import CategoryList from "pages/category_list";
import Search from "pages/search";

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category-list" element={<CategoryList />} />
        <Route path="/category/:id" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/write" element={<Write />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
}
