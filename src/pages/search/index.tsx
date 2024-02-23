import Layout from "components/layout/Layout";
import { SearchPostList } from "components/post/PostList";
import SearchBox from "components/search/SearchBox";
import React, { useState } from "react";

export default function SearchPage() {
  const [searchWord, setSearchWord] = useState<string>("");

  return (
    <Layout>
      <SearchBox searchWord={searchWord} setSearchWord={setSearchWord} />
      <SearchPostList searchWord={searchWord} />
    </Layout>
  );
}
