import { createSlice } from '@reduxjs/toolkit'

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    avatar: { value: '', isValid: true, validation: { isMandatory: true } },
    name: { value: '', isValid: true, validation: { isMandatory: true } },
    exp: { value: '', isValid: true, validation: { isMandatory: true, min: 0, max: 100 } },
    role: { value: '', isValid: true, validation: { isMandatory: true } },
    mail: { value: '', isValid: true, validation: { isMandatory: true } },
    desc: { value: '', isValid: true, validation: { isMandatory: true } },
  },
  reducers: {
    updateAvatar: (state, { payload }) => {
      state.avatar.value = payload.value;
      state.avatar.isValid = payload.isValid;
    },
    updateName: (state, { payload }) => {
      state.name.value = payload.value;
      state.name.isValid = payload.isValid;
    },
    updateExp: (state, { payload }) => {
      state.exp.value = payload.value;
      state.exp.isValid = payload.isValid;
    },
    updateRole: (state, { payload }) => {
      state.role.value = payload.value;
      state.role.isValid = payload.isValid;
    },
    updateMail: (state, { payload }) => {
      state.mail.value = payload.value;
      state.mail.isValid = payload.isValid;
    },
    updateDesc: (state, { payload }) => {
      state.desc.value = payload.value;
      state.desc.isValid = payload.isValid;
    }
  }
})

export const { updateAvatar, updateDesc, updateExp, updateMail, updateName, updateRole } = profileSlice.actions
