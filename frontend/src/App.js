import { useState } from "react";

function App() {
  const [image, setImage] = useState([]);
  const uploadHandler = async (e) => {
    const imagesData = [];
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      imagesData.push(prev(files[i]));
    }
  };

  const prev = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage((curr) => [...curr, reader.result]);
      return reader.result;
    };
  };

  const upload = async () => {
    const formData = new FormData();
    for (let i = 0; i < image.length; i++) {
      let file = image[i];
      formData.append("file", file);
    }
    await fetch("http://localhost:8000/upload", {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      // body: JSON.stringify({
      //   file: image,
      // }),
      body: formData,
    });
  };
  return (
    <>
      <input type="file" onChange={uploadHandler} multiple="multiple" />;
      <button onClick={() => upload(image)}>upload</button>
    </>
  );
}

export default App;

// const reader = new FormData();
// reader.append("file", file);
// setImage(reader);
// console.log(image);
