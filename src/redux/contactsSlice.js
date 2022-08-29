import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://6306fe44c0d0f2b801249ab9.mockapi.io/contacts',
  }),
  tagTypes: ['contact'],
  endpoints: build => ({
    getContactsByName: build.query({
      query: name => `contacts/?name=${name}`,
    }),
    getAllContacts: build.query({
      query: () => 'contacts',
      providesTags: ['contact'],
    }),
    deleteContact: build.mutation({
      query: contactId => ({
        url: `contacts/${contactId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['contact'],
    }),
    createContact: build.mutation({
      query: newContact => ({
        url: 'contacts',
        method: 'POST',
        body: newContact,
      }),
      invalidatesTags: ['contact'],
    }),
    updateContact: build.mutation({
      query: data => {
        const { id, ...body } = data;
        return {
          url: `contacts/${id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['contact'],
    }),
  }),
});

export const {
  useGetContactsByNameQuery,
  useGetAllContactsQuery,
  useDeleteContactMutation,
  useCreateContactMutation,
  useUpdateContactMutation,
} = contactsApi;
