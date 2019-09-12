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
  const loadTracePromise = getBase64(state.loadTrace.files[0]);
  const solarTracePromise = getBase64(state.solarTrace.files[0]);

  return new Promise((resolve, reject) => {
    Promise.all([loadTracePromise, solarTracePromise]).then(values => {
      const [loadTraceFile, solarTraceFile] = values;

      resolve({
        load_trace: {
          file: loadTraceFile,
          interval: state.loadTrace.interval
        },
        solar_trace: {
          file: solarTraceFile,
          interval: state.solarTrace.interval
        },
        costs: state.costs,
        performance_target: {
          percent_load: state.performanceTarget.percentLoad
        }
      });
    });
  });
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
  mapStateToJSON(data).then(data => {
    console.log(data);
    instance
      .post("/", {
        ...data
      })
      .then(response => console.log(response));
  });
};

export default uploadData;
