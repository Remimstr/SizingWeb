import axios from "axios";

var instance = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json"
  }
});

const uploadFile = (files: FileList) => {
  for (let i = 0; i < files.length; i++) {
    console.log(files[i]);
    instance
      .post("/", {
        file_data: "010101\\n2500"
      })
      .then(response => console.log(response));
  }
};

export default uploadFile;
