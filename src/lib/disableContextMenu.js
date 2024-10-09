export const disableContextMenu = () => {
  document.addEventListener("contextmenu", (e) => e.preventDefault());
  document.addEventListener(
    "selectstart",
    (e) => {
      e.preventDefault();
      return false;
    },
    { capture: true }
  );
};
