//delete-button
const buttonDelete = document.querySelectorAll("[data-delete-button]");
if (buttonDelete.length > 0) {
  buttonDelete.forEach((item) => {
    item.addEventListener("click", (e) => {
      const isConfirm = confirm("Bạn có chắc muốn xóa sản phẩm này?");
      if (isConfirm) {
        const dataId = item.getAttribute("data-id");
        const formDelete = document.getElementById("form-delete");
        const dataPath = formDelete.getAttribute("data-path");
        const path = `${dataPath}/${dataId}`;
        formDelete.action = path;
        formDelete.submit();
      }
    });
  });
}
// end delete button
