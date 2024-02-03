import {
  Grid,
  TextField,
  InputAdornment,
  Button,
  Autocomplete,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { atomSearch } from "../../store/atomSearch";
import { ToastContainer, toast } from "react-toastify";

interface Option {
  label: string;
}

const top100Films: Option[] = [
  { label: "Chilca" },
  { label: "Lima" },
  { label: "Ica" },
];

const SearchJob = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [valueAtomSearch, setValueAtomSearch] = useAtom(atomSearch);

  const onSearch = (e: any) => {
    e.preventDefault();

    if (search.length > 0) {
      setValueAtomSearch({
        value: search,
        location: location,
      });
      navigate(`/candidate/search/${search}/${location}`);
    } else {
      return toast.error("Ingrese un puesto para buscar", {
        closeOnClick: true,
        autoClose: 2000,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    if (valueAtomSearch.value.length > 0) {
      setSearch(valueAtomSearch.value);
    }
    if (valueAtomSearch.location.length > 0) {
      setLocation(valueAtomSearch.location);
    }
  }, [valueAtomSearch]);

  return (
    <>
      <form onSubmit={onSearch}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Puesto"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                backgroundColor: "#fff",
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Autocomplete
              fullWidth
              disablePortal
              id="combo-box-ubicacion"
              selectOnFocus
              handleHomeEndKeys
              freeSolo
              options={top100Films}
              value={{ label: location }}
              onChange={(_e, value: any) => setLocation(value?.label || "")}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Ubicación"
                  fullWidth
                  value={location}
                  sx={{
                    backgroundColor: "#fff",
                  }}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              // onClick={onSearch}
              fullWidth
              sx={{
                height: "100%",
              }}
            >
              Buscar
            </Button>
          </Grid>
        </Grid>
      </form>
      <ToastContainer />
    </>
  );
};

export default SearchJob;
