import axios from "axios";

var instance = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json"
  }
});

const getBase64 = (file: any) => {
	var reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = () => {
		return reader.result;
	};
	reader.onerror = error => {
		return error;
	};
}

const uploadFile = (files: FileList) => {
  instance
    .post("/", {
      load_data: getBase64(files[0])
    })
    .then(response => console.log(response));
};

export default uploadFile;
