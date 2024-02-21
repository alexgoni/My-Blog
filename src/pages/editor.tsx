import Layout from "components/layout/Layout";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { useMobileDetector } from "module/useMobileDetector";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import Prism from "prismjs";
import { useRecoilValue } from "recoil";
import { themeState } from "recoil/theme";
import { useEffect } from "react";

const MyComponent = () => {
  const isMobileWidth = useMobileDetector();
  const theme = useRecoilValue(themeState);

  return (
    <>
      <Editor
        previewStyle={isMobileWidth ? "tab" : "vertical"}
        height="800px"
        initialEditType="markdown"
        useCommandShortcut={true}
        plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
        theme={theme}
      />
    </>
  );
};

export default function EditorPage() {
  return (
    <Layout>
      <MyComponent />
    </Layout>
  );
}
