import axios from "axios";

var instance = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json"
  }
});

const getBase64 = (file: any) => {
	console.log("this is the file", file);
	return new Promise((resolve, reject) => {
	  var reader = new FileReader();
	  reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result ? reader.result : {});
		reader.onerror = error => reject(error);
	});
}

const uploadFile = (files: FileList) => {
  getBase64(files[0]).then(data => {
    instance
      .post("/", {
			  load_data: data
      })
      .then(response => console.log(response))
	}
	)
};

export default uploadFile;
