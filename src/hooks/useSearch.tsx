import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setSearchFilter } from "../redux/slices/filterSlice";
import { selectSearchFilter } from "../redux/selectors/filter-selectors";

export const useSearch = () => {
  const dispatch = useDispatch();
  const search = useSelector(selectSearchFilter);

  const setSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setSearchFilter(e.target.value));
  };

  return [search, setSearch];
};
