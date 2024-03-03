export default function toggleEditorTheme(theme: string) {
  // editor
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

  // viewer
  const viewerEl = document.getElementsByClassName(
    "toastui-editor-contents"
  )[0];
  if (viewerEl) {
    if (theme === "light") {
      const parentDiv = document.createElement("div");
      parentDiv.classList.add("toastui-editor-dark");
      viewerEl?.parentNode?.insertBefore(parentDiv, viewerEl);
      parentDiv.appendChild(viewerEl);
    } else {
      const parentElement = viewerEl.parentNode;
      parentElement?.parentNode?.insertBefore(viewerEl, parentElement);
      parentElement?.parentNode?.removeChild(parentElement);
    }
  }
}
