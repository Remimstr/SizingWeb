import axios from "axios";

var instance = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json"
  }
});

const uploadFile = (files: FileList) => {
  console.log(files[0]);
  instance
    .post("/", {
      load_data: files[0]
    })
    .then(response => console.log(response));
};

export default uploadFile;
