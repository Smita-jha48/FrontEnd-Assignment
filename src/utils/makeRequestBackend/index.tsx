import axios from "axios";
import { BACKEND_URL } from "../../constants/apiEndPoints";

interface ApiEndPoint {
  url: string;
  method: string;
}
const makeRequestBackend = async (
  apiEndPoint: ApiEndPoint,
  dynamicConfig = {},
  navigate?: any
 ) => {
  try {
    const requestDetails = {
      baseURL: BACKEND_URL,
      url: apiEndPoint.url,
      method: apiEndPoint.method,
      ...dynamicConfig,
    };
    const { data } = await axios(requestDetails);
    return data;
  } catch (e: any) {
    if (navigate) {
      const errorStatus = e.response?.status;
      if (errorStatus) {
        navigate(`/error/${errorStatus}`);
      } else {
        navigate("/error");
      }
    }
  }
};

export default makeRequestBackend;
