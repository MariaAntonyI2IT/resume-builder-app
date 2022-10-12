import { createSlice } from '@reduxjs/toolkit'

export const projectData = {
  name: { value: '', isValid: true },
  startDate: { value: '', isValid: true },
  endDate: { value: '', isValid: true },
  desc: { value: '', isValid: true },
  expanded: true
};

export const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    data: [projectData]
  },
  reducers: {
    updateProject: (state, { payload }) => {
      state.data = payload;
    }
  }
})


export const { updateProject } = projectsSlice.actions
