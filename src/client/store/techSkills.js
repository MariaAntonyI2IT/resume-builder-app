import { createSlice } from '@reduxjs/toolkit'

export const techSkillsSlice = createSlice({
  name: 'techSkills',
  initialState: {
    frontEndSkills: { value: '', isValid: true, validation: { isMandatory: true } },
    backEndSkills: { value: '', isValid: true, validation: { isMandatory: false } },
    tools: { value: '', isValid: true, validation: { isMandatory: true } },
    infra: { value: '', isValid: true, validation: { isMandatory: true } }
  },
  reducers: {
    updateFrontEndSkills: (state, { payload }) => {
      state.frontEndSkills.value = payload.value;
      state.frontEndSkills.isValid = payload.isValid;
    },
    updateBackEndSkills: (state, { payload }) => {
      state.backEndSkills.value = payload.value;
      state.backEndSkills.isValid = payload.isValid;
    },
    updateTools: (state, { payload }) => {
      state.tools.value = payload.value;
      state.tools.isValid = payload.isValid;
    },
    updateInfra: (state, { payload }) => {
      state.infra.value = payload.value;
      state.infra.isValid = payload.isValid;
    }
  }
})

export const { updateFrontEndSkills, updateBackEndSkills, updateTools, updateInfra } = techSkillsSlice.actions
