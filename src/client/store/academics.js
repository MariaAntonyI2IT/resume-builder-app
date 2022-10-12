import { createSlice } from '@reduxjs/toolkit'

export const academicsSlice = createSlice({
  name: 'academics',
  initialState: {
    course: { value: '', isValid: true, validation: { isMandatory: true } },
    stream: { value: '', isValid: true, validation: { isMandatory: true } },
    college: { value: '', isValid: true, validation: { isMandatory: true } },
    location: { value: '', isValid: true, validation: { isMandatory: true } }
  },
  reducers: {
    updateCourse: (state, { payload }) => {
      state.course.value = payload.value;
      state.course.isValid = payload.isValid;
    },
    updateStream: (state, { payload }) => {
      state.stream.value = payload.value;
      state.stream.isValid = payload.isValid;
    },
    updateCollege: (state, { payload }) => {
      state.college.value = payload.value;
      state.college.isValid = payload.isValid;
    },
    updateLocation: (state, { payload }) => {
      state.location.value = payload.value;
      state.location.isValid = payload.isValid;
    }
  }
})

export const { updateCourse, updateCollege, updateStream, updateLocation } = academicsSlice.actions;
