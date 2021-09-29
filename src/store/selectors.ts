import {RootState} from "./store";

export const selectPortfolio = (state: RootState) => state.portfolio
export const selectApp = (state: RootState) => state.app