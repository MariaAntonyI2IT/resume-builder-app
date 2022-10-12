import { configureStore } from '@reduxjs/toolkit';
import { profileSlice } from './profile';
import { techSkillsSlice } from './techSkills';
import { academicsSlice } from './academics';
import { projectsSlice } from './projects';
import { commonSlice } from './common';
import { userProfileSlice } from './userProfile';
import { createWrapper } from "next-redux-wrapper";

export const store = configureStore({
    reducer: {
        userProfile: userProfileSlice.reducer,
        profile: profileSlice.reducer,
        techSkills: techSkillsSlice.reducer,
        common: commonSlice.reducer,
        academics: academicsSlice.reducer,
        projects: projectsSlice.reducer
    }
});

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);