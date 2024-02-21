import { Route, Routes, Navigate } from "react-router-dom";
import Home from "pages/home";
import Write from "pages/post/write";
import Edit from "pages/post/edit";
import Post from "pages/post/post";
import CategoryList from "pages/category/category_list";
import Search from "pages/search";
import Category from "pages/category/category";
import Login from "pages/user/login";
import Register from "pages/user/register";
import { useRecoilValue } from "recoil";
import { isUserAdminState, currentUserObj } from "recoil/user";
import CategoryAdminPage from "pages/category/category_admin";
import Editor from "pages/editor";

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
        <Route path="/editor" element={<Editor />} />
        <Route path="*" element={<Navigate replace to="/" />} />
        {!user && <Route path="/login" element={<Login />} />}
        {isUserAdmin && (
          <>
            <Route path="/write" element={<Write />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/category/admin" element={<CategoryAdminPage />} />
          </>
        )}
      </Routes>
    </>
  );
}
