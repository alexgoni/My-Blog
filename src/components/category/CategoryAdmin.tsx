import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "firebaseApp";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import styles from "styles/category.module.scss";
import { CategoryProps } from "./CategoryList";

function CategoryList() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  const getCategories = async () => {
    setCategories([]);

    const categoriesRef = collection(db, "category");
    const categoriesQuery = query(categoriesRef, orderBy("createdAt", "asc"));
    const datas = await getDocs(categoriesQuery);

    datas?.forEach((doc) => {
      const dataObj = { id: doc.id, ...doc.data() };
      setCategories((prev) => [...prev, dataObj as CategoryProps]);
    });
  };

  const handleDelete = async (categoryId: string) => {
    const confirm = window.confirm("해당 카테고리를 삭제하시겠습니까?");
    if (confirm && categoryId) {
      await deleteDoc(doc(db, "category", categoryId));

      toast.success("게시글을 삭제했습니다.");
      window.location.reload();
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [categories]);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className={styles.list}>
      <h1>Category List</h1>
      <div className={styles.categories} ref={containerRef}>
        {categories.map((category) => (
          <div className={styles.category} key={category.id}>
            {category.category}
            <span
              className={styles.delete}
              onClick={() => handleDelete(category.id)}
            >
              삭제
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CategoryForm() {
  const [previewImage, setPreviewImage] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryImg, setCategoryImg] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setCategoryImg(selectedFile);
      setFileName(selectedFile.name);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFileName("");
      setPreviewImage("");
    }
  };

  const uploadImage = async () => {
    const categoryImgBlob = categoryImg as Blob;
    const storageRef = ref(storage, `categoryImg/${categoryImg?.name}`);
    await uploadBytes(storageRef, categoryImgBlob);

    const imgUrl = await getDownloadURL(storageRef);
    return imgUrl;
  };

  const createCategory = async (imgUrl: string) => {
    await addDoc(collection(db, "category"), {
      category: categoryName,
      postNum: 0,
      createdAt: new Date(),
      imgUrl,
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const imgUrl = await uploadImage();
      await createCategory(imgUrl);

      toast.success("게시글을 생성했습니다.");
      window.location.reload();
    } catch (error: any) {
      console.log(error);
      toast.error(error.code);
    }
  };

  return (
    <div className={styles.createForm}>
      <div className={styles.previewImg}>
        {previewImage ? (
          <img src={previewImage} alt="Preview" />
        ) : (
          <img src={process.env.PUBLIC_URL + "/noimage.jpg"} alt="Preview" />
        )}
      </div>

      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.fileBlock}>
          <input
            type="text"
            className={styles.fileName}
            value={fileName}
            placeholder="첨부파일"
            disabled
          />
          <label htmlFor="category-img" className={styles.fileUpload}>
            파일찾기
          </label>
          <input
            type="file"
            accept="image/*"
            name="category-img"
            id="category-img"
            onChange={handleFileChange}
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
            value={categoryName}
            onChange={(e) => {
              setCategoryName(e.target.value);
            }}
            required
          />
        </div>
        <div className={styles.submitBlock}>
          <input type="submit" value="생성" />
        </div>
      </form>
    </div>
  );
}

export default function CategoryAdmin() {
  return (
    <div className={styles.adminContainer}>
      <CategoryList />
      <CategoryForm />
    </div>
  );
}
