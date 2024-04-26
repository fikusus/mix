import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

console.log(window.location.href);

export const telegramApi = createApi({
  reducerPath: "telegramApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${window.location.href}api/message`,
  }),
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (messageData) => ({
        url: "send",
        method: "POST",
        body: messageData,
      }),
    }),
    getSubscriptions: builder.query({
      query: () => ({
        url: "subscriptions",
        method: "GET",
      }),
    }),
  }),
});

export const { useSendMessageMutation, useGetSubscriptionsQuery } = telegramApi;
