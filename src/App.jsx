import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { storage } from "./firebase.js";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const App = () => {
  const [Imageupload, setImageupload] = useState(null);
  const [imagelist, setImagelist] = useState(new Set());

  const showfilesofsystem = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.click();
    input.addEventListener("change", handleFileSelect);
  };

  const handleFileSelect = (e) => {
    setImageupload(e.target.files[0]);
  };

  const uploadFile = () => {
    if (Imageupload == null) return;
    const imageref = ref(storage, `images/${Imageupload.name + v4()}`);
    uploadBytes(imageref, Imageupload).then(() => {
      getDownloadURL(imageref).then((url) => {
        setImagelist((prev) => new Set([...prev, url]));
        alert("Image uploaded");
      });
    });
  };

  const Imagelistref = ref(storage, "images/");

  useEffect(() => {
    listAll(Imagelistref).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImagelist((prev) => new Set([...prev, url]));
        });
      });
    });
  }, []);

  return (
    <Main>
      <div className="top">
        <a>Welcome to Himanshu Cloud storage</a>
        <div className="images">
          <img
            className="box"
            src="public/illustration-of-a-box-in-black-and-white-color-vector.jpg"
            alt=""
          />
        </div>
        <button className="selectbutton" onClick={showfilesofsystem}>
          Select file
        </button>

        <button className="uploadbutton" onClick={uploadFile}>
          Upload
          <img src="public/upload.svg" alt="" />
        </button>
      </div>

      <div className="personimages">
        {[...imagelist].map((url) => (
          <img key={url} src={url} alt="Uploaded" />
        ))}
      </div>
    </Main>
  );
};

export default App;

const Main = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: "Poppins", sans-serif;
  gap: 20px;

  .top {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 200px 0px 0px 0px;
    gap: 20px;

    a {
      font-weight: 800;
      font-size: 30px;
    }

    .images {
      .box {
        width: 100px;
        height: 100px;
      }
    }

    button {
      width: 200px;
      height: 60px;
      background-color: #2945fd;
      color: #fff;
      outline: none;
      border: none;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      font-size: 18px;
      font-weight: 700;
      cursor: pointer;

      img {
        width: 30px;
        height: 30px;
      }
    }

    .selectbutton {
      width: 200px;
      height: 40px;
      background-color: black;
    }
  }

  .personimages {
    width: 1100px;
    height: auto;

    margin: 30px 0px 0px 150px;

    display: flex;
    flex-wrap: wrap;

    img {
      margin: 10px;
      width: 250px;
      height: 250px;
      border : 1px solid black;
      border-radius: 10px;
    }
  }
`;
