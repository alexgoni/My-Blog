import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "firebaseApp";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import styles from "styles/category.module.scss";

const LIST = ["Free", "Frontend", "Backend", "Free", "Free", "Free", "Free"];

function CategoryList() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [LIST]);

  return (
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
  );
}

function CategoryForm() {
  const [previewImage, setPreviewImage] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryImg, setCategoryImg] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<string>("");

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

    const downloadURL = await getDownloadURL(storageRef);
    setImgUrl(downloadURL);
  };

  const createCategory = async () => {
    await addDoc(collection(db, "category"), {
      category: categoryName,
      postNum: 0,
      createdAt: new Date()?.toLocaleDateString("ko", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      imgUrl,
    });

    toast.success("게시글을 생성했습니다.");
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await uploadImage();
      await createCategory();
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
