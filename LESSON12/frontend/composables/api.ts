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
    console.error("onResponseError \n", response.status, response.statusText, response._data.message);
    throw new Error(response._data.message);
  };

  const onRequest = ({ request, options }) => {
    console.log("onRequest", request, options);
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

export type SubscriberEntity = {
  _id: string;
  name: string;
  email: string;
  zipCode: string;
  courses: string[];
};

export type SubscriberOptions = {
  name: string;
  email: string;
  zipCode: string;
};

export type UserEntity = {
  _id: string;
  name: {
    first: string;
    last: string;
  };
  email: string;
  zipCode: string;
  password?: string;
  subscribedAccount?: string;
};

export type UserOptions = {
  firstName: string;
  lastName: string;
  email: string;
  zipCode: string;
  password: string;
};

export const fetchSubscriber = (paramsId: string) => {
  return useMyFetch<SubscriberEntity>(`/subscribers/${paramsId}`);
};

export const fetchSubscribers = () => {
  return useMyFetch<SubscriberEntity[]>("/subscribers");
};

export const createSubscriber = (options: SubscriberOptions) => {
  const { name, email, zipCode } = options;

  return useMyFetch<SubscriberEntity>("/subscribers/create", {
    method: "POST",
    body: {
      name,
      email,
      zipCode,
    },
  });
};

export const updateSubscriber = (paramsId: string, options: SubscriberOptions) => {
  const { name, email, zipCode } = options;

  return useMyFetch<UserEntity>(`/subscribers/${paramsId}/update`, {
    method: "PUT",
    body: {
      name,
      email,
      zipCode,
    },
  });
};

export const deleteSubscriber = (paramsId: string) => {
  return useMyFetch<SubscriberEntity>(`/subscribers/${paramsId}/delete`, {
    method: "DELETE",
  });
};

export const fetchUser = (paramsId: string) => {
  return useMyFetch<UserEntity>(`/users/${paramsId}`);
};

export const fetchUsers = () => {
  return useMyFetch<UserEntity[]>("/users");
};

export const createUser = (options: UserOptions) => {
  const { firstName, lastName, password, email, zipCode } = options;

  return useMyFetch<UserEntity>("/users/create", {
    method: "POST",
    body: {
      name: { first: firstName, last: lastName },
      password,
      email,
      zipCode,
    },
  });
};

export const updateUser = (paramsId: string, options: UserOptions) => {
  const { firstName, lastName, password, email, zipCode } = options;

  return useMyFetch<UserEntity>(`/users/${paramsId}/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      name: { first: firstName, last: lastName },
      password,
      email,
      zipCode,
    },
  });
};

export const deleteUser = (userId: string) => {
  return useMyFetch<UserEntity>(`/users/${userId}/delete`, {
    method: "DELETE",
  });
};
