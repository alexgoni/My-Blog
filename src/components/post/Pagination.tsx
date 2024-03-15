import { Pagination, ThemeProvider, createTheme } from "@mui/material";
import { db } from "firebaseApp";
import { getDocumentCount } from "modules/utils/getDocumentCount";
import { useMobileDetector } from "modules/utils/useMobileDetector";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { themeState } from "recoil/theme";
import styles from "styles/post.module.scss";

interface PaginationComponentProps {
  currentPage: number;
  setCurrentPage: (newValue: number) => void;
}

export default function PaginationComponent({
  currentPage,
  setCurrentPage,
}: PaginationComponentProps) {
  const [documentCount, setDocumentCount] = useState<number>(0);
  const params = useParams();
  const isMobileWidth = useMobileDetector();
  const currentThemeState = useRecoilValue(themeState);

  const theme = createTheme({
    components: {
      MuiPaginationItem: {
        styleOverrides: {
          root: {
            color: currentThemeState === "light" ? "black" : "white",
          },
        },
      },
    },
  });

  const onChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const updatePostsNum = async () => {
    const count = await getDocumentCount(db, params);
    setDocumentCount(count);
  };

  useEffect(() => {
    updatePostsNum();
  }, [params]);

  return (
    <div className={styles.paginationContainer}>
      <ThemeProvider theme={theme}>
        <Pagination
          count={Math.ceil(documentCount / 10)}
          color="primary"
          size={isMobileWidth ? "small" : "large"}
          page={currentPage}
          onChange={onChange}
        />
      </ThemeProvider>
    </div>
  );
}
