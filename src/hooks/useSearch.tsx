import { ChangeEventHandler } from "react";

import { useAppDispatch, useAppSelector } from "../redux/store";
import { setSearchFilter } from "../redux/slices/filterSlice";
import { selectSearchFilter } from "../redux/selectors/filter-selectors";

type OnSearchHandler = ChangeEventHandler<HTMLInputElement>;

export const useSearch = (): [string, OnSearchHandler] => {
  const dispatch = useAppDispatch();
  const search = useAppSelector(selectSearchFilter);

  const setSearch: OnSearchHandler = (e): void => {
    dispatch(setSearchFilter(e.target.value));
  };

  return [search, setSearch];
};
