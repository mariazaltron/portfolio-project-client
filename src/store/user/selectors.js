export const selectToken = (state) => state.user.token;
export const selectUser = (state) => state.user.profile;
export const selectMyList = (state) => state.user.sharedWatchList;
export const selectMyFilteredList = (state) => state.user.filteredWatchList;
export const selectActiveFilter = (state) => state.user.activeFilter;