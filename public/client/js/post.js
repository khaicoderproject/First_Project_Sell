const reactPost = document.querySelectorAll("#react-post");
if (reactPost.length > 0) {
  reactPost.forEach((item) => {
    item.addEventListener("click", () => {
      const formChange = document.getElementById("change-post-react");
      const path = formChange.getAttribute("dataPath");
      const id = formChange.getAttribute("userId");
      const dataPostId = item.getAttribute("data-post-id");
      // console.log(formChange);
      const newPath = `${path}/sendReact/${id}-${dataPostId}`;
      formChange.action = newPath;
      formChange.submit();
    });
  });
}
