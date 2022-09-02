import { useState } from "react";

function App() {
  const [image, setImage] = useState([]);
  const [message, setMessage] = useState("");
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
    setMessage("Uploading...");
    const formData = new FormData();
    for (let i = 0; i < image.length; i++) {
      let file = image[i];
      formData.append("file", file);
    }
    try {
      const res = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data) {
        setMessage("Done!");
      }
      console.log(data);
    } catch (e) {
      console.log(e)
      setMessage("Error! Could not upload")
    }
  };
  return (
    <>
      <input
        type="file"
        onChange={uploadHandler}
        accept="image/*"
        multiple="multiple"
      />
      <button onClick={() => upload(image)}>upload</button>
      <p>{message}</p>
    </>
  );
}

export default App;
