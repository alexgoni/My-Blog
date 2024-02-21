export default function toggleEditorTheme() {
  const editorEl = document.getElementsByClassName(
    "toastui-editor-defaultUI"
  )[0];

  if (editorEl) {
    if (editorEl.classList.contains("toastui-editor-dark")) {
      editorEl.classList.remove("toastui-editor-dark");
    } else {
      editorEl.classList.add("toastui-editor-dark");
    }
  }
}
