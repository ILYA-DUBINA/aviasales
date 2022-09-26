import { configureStore } from '@reduxjs/toolkit';

import aviasalesSlice from './aviasalesSlice';

export default configureStore({
  reducer: {
    aviasales: aviasalesSlice,
  },
});
