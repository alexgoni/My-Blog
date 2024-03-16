import { Link } from "react-router-dom";
import styles from "styles/category.module.scss";
import { FiPlusCircle } from "react-icons/fi";
import { useRecoilValue } from "recoil";
import { isUserAdminState } from "recoil/user";
import { CategoryInterface } from "models/category";
import {
  useGetCategories,
  useUpdatePostNum,
} from "modules/hooks/useGetCategories";

function CategoryBlock({ data }: { data: CategoryInterface }) {
  return (
    <Link
      to={`/category/${encodeURIComponent(data?.category)}/${data?.id}`}
      className={styles.categoryBlock}
    >
      <img src={data?.imgUrl} alt="img" className={styles.categoryImg} />

      <div className={styles.categoryInfo}>
        <h1 className={styles.title}>{data?.category}</h1>
        <span className={styles.postNum}>{data?.postNum}개의 포스트</span>
      </div>
    </Link>
  );
}

export default function CategoryList() {
  const isUserAdmin = useRecoilValue(isUserAdminState);
  const categories = useGetCategories();
  useUpdatePostNum(categories);

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.listTitle}>Category List</h1>
        <Link to="/category/admin">
          {isUserAdmin && <FiPlusCircle size={28} className={styles.plus} />}
        </Link>
      </div>
      <div className={styles.categoryList}>
        {categories?.map((categoryData) => (
          <CategoryBlock key={categoryData?.id} data={categoryData} />
        ))}
      </div>
      <div className={styles.sentinelRef}></div>
    </>
  );
}
