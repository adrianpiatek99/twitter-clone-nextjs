import axios from "axios";

interface Response {
  data: string;
}

const getErrorMessage = (error: any): string => {
  if (error?.response?.status === 500) {
    return "Internal Server Error";
  }

  if (typeof error?.response?.data === "string") {
    return error.response.data;
  }

  return error?.message;
};

const handleError = (error: any) => {
  error.message = getErrorMessage(error);

  throw error;
};

const readValue = <TResponse>(response: Response): TResponse => {
  return response.data as TResponse;
};

export async function getPromise<TPayload, TResponse>(
  url: string,
  payload: TPayload
): Promise<TResponse> {
  return axios
    .get(url, { params: { ...payload } })
    .then(res => readValue<TResponse>(res))
    .catch(handleError);
}

export async function getEmptyPromise<TResponse>(url: string): Promise<TResponse> {
  return axios
    .get(url)
    .then(res => readValue<TResponse>(res))
    .catch(handleError);
}

export async function postPromise<TPayload, TResponse>(
  url: string,
  payload: TPayload
): Promise<TResponse> {
  return axios
    .post(url, payload)
    .then(res => readValue<TResponse>(res))
    .catch(handleError);
}

export async function emptyPostPromise<TPayload>(url: string, payload: TPayload) {
  return axios.post(url, payload).catch(handleError).catch(handleError);
}

export async function patchPromise<TPayload, TResponse>(url: string, payload: TPayload) {
  return axios
    .patch(url, payload)
    .then(res => readValue<TResponse>(res))
    .catch(handleError);
}

export async function deletePromise<TPayload>(url: string, payload: TPayload) {
  return axios.delete(url, { params: { ...payload } }).catch(handleError);
}
