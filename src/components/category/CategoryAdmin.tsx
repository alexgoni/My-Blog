import { useEffect, useRef, useState } from "react";
import styles from "styles/category.module.scss";

const LIST = ["Free", "Frontend", "Backend", "Free", "Free", "Free", "Free"];

export default function CategoryAdmin() {
  const [previewImage, setPreviewImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [LIST]);

  return (
    <div className={styles.adminContainer}>
      <div className={styles.list}>
        <h1>Category List</h1>
        <div className={styles.categories} ref={containerRef}>
          {LIST.map((each, index) => (
            <div className={styles.category} key={index}>
              {each}
              <span className={styles.delete}>삭제</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.createForm}>
        <div className={styles.previewImg}>
          {previewImage ? (
            <img src={previewImage} alt="Preview" />
          ) : (
            <img src={process.env.PUBLIC_URL + "/noimage.jpg"} alt="Preview" />
          )}
        </div>

        <form className={styles.form}>
          <div className={styles.fileBlock}>
            <input
              className={styles.fileName}
              value={fileName}
              placeholder="첨부파일"
            />
            <label htmlFor="category-img" className={styles.fileUpload}>
              파일찾기
            </label>
            <input
              type="file"
              accept="image/*"
              name="category-img"
              id="category-img"
              style={{ display: "none" }}
              required
            />
          </div>

          <div className={styles.categoryNameBlock}>
            <label htmlFor="text">카테고리</label>
            <input
              type="text"
              name="category-title"
              id="category-title"
              required
            />
          </div>

          <div className={styles.submitBlock}>
            <input type="submit" value="생성" />
          </div>
        </form>
      </div>
    </div>
  );
}
