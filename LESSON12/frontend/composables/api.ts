import { UseFetchOptions } from "#app";
import { NitroFetchRequest } from "nitropack";
import { KeyOfRes } from "nuxt/dist/app/composables/asyncData";

const useMyFetch = <T>(
  request: NitroFetchRequest,
  opts?:
    | UseFetchOptions<T extends void ? unknown : T, (res: T extends void ? unknown : T) => T extends void ? unknown : T, KeyOfRes<(res: T extends void ? unknown : T) => T extends void ? unknown : T>>
    | undefined
) => {
  const config = useRuntimeConfig();

  const onResponse = ({ request, response, options }) => {
    console.log("onResponse", response._data);
  };

  const onResponseError = ({ request, options, response }) => {
    console.error("onResponseError", response.status, response.statusText, response._data);
    throw new Error(response._data.message);
  };

  const onRequest = ({ request, options }) => {
    console.log("onRequest", request);
  };

  const onRequestError = ({ request, options, error }) => {
    console.error("onRequestError", request);
    throw new Error(request);
  };

  return useFetch<T>(request, {
    baseURL: config.public.baseUrl,
    initialCache: false,
    onResponse,
    onResponseError,
    onRequest,
    onRequestError,
    ...opts,
  });
};

type SubscriberEntity = {
  _id: string;
  name: string;
  email: string;
  zipCode: string;
  courses: string[];
};

type AddSubscriberOptions = {
  name: string;
  email: string;
  zipCode: string;
};
export const fetchSubscribers = () => {
  return useMyFetch<SubscriberEntity[]>("/subscribers");
};

export const addSubscriber = (options: AddSubscriberOptions) => {
  const { name, email, zipCode } = options;

  return useMyFetch<SubscriberEntity>("/subscribers", {
    method: "POST",
    body: {
      name,
      email,
      zipCode,
    },
  });
};
