import axios from "axios";
// import type State from "./steps";

var instance = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json"
  }
});

const mapStateToJSON = (state: any) => {
  return {
    load_trace: {
      file: getBase64(state.loadTrace.files[0]),
      interval: state.loadTrace.interval
    },
    solar_trace: {
      file: getBase64(state.solarTrace.files[0]),
      interval: state.solarTrace.interval
    },
    costs: state.costs,
    performance_target: {
      percent_load: state.performanceTarget.percentLoad
    }
  };
};
const getBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>
      resolve(reader.result ? String(reader.result).split(",")[1] : "");
    reader.onerror = error => reject(error);
  });
};

const uploadData = (data: any) => {
  const processedData = mapStateToJSON(data);
  instance
    .post("/", {
      data: processedData
    })
    .then(response => console.log(response));
};

export default uploadData;
