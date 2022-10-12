import { createSlice } from '@reduxjs/toolkit'

export const commonSlice = createSlice({
  name: 'common',
  initialState: {
    selectedForm: 'profile',
    selectedId: '',
    draft: false,
    title: { value: 'Untitled Resume', isValid: true, validation: { isMandatory: true } }
  },
  reducers: {
    updateSelectedForm: (state, { payload }) => {
      state.selectedForm = payload;
    },
    updateSelectedId: (state, { payload }) => {
      state.selectedId = payload;
    },
    updateDraft: (state, { payload }) => {
      state.draft = payload;
    },
    updateTitle: (state, { payload }) => {
      state.title.value = payload.value;
      state.title.isValid = payload.isValid;
    },
  }
})

export const { updateSelectedForm, updateTitle, updateSelectedId, updateDraft } = commonSlice.actions
