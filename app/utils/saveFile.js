export const saveFile = (url) => {
  const a = document.createElement("a");
  a.href = `/api/download/?url=${encodeURIComponent(url)}`;
  a.download = url.split("/").pop();  
  document.body.appendChild(a);
  a.click();
  alert("Download in progress please wait. It might take some time ");
  a.remove();
};
  