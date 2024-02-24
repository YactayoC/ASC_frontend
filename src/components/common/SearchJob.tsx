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
import { seedLocations } from "../../seed/locations";


const SearchJob = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [valueAtomSearch, setValueAtomSearch] = useAtom(atomSearch);

  console.log(valueAtomSearch)

  const flatOptions = seedLocations.flatMap(departamento =>
    departamento.provincias.map(provincia => ({
      //ubigeo: provincia.nombre_provincia,
      nombre_provincia: provincia.nombre_provincia,
      nombre_departamento: departamento.nombre_departamento,
    }))
  );


  const onSearch = (e: any) => {
    e.preventDefault();

    if (search.length > 0 && location) {
      setValueAtomSearch({
        value: search,
        location: location,
      });

      // Guarda los valores en el localStorage incluyendo el valor actual de 'location'
      localStorage.setItem(
        "searchValue",
        JSON.stringify({ value: search, location: location })
      );

      navigate(`/candidate/search/${search}/${location}`);
    } else {
      toast.error("Ingrese un puesto para buscar", {
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

  useEffect(() => {
    const searchValue = localStorage.getItem("searchValue");
    if (searchValue) {
      const value = JSON.parse(searchValue);
      setSearch(value.value);
      setLocation(value.location);
    }
  }, []);

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
              id="grouped-demo"
              fullWidth
              options={flatOptions}
              groupBy={(option) => option.nombre_departamento}
              getOptionLabel={(option) => `${option.nombre_departamento} - ${option.nombre_provincia}`}
              onChange={(event, newValue) => {
                const locationValue = newValue ? `${newValue.nombre_departamento} - ${newValue.nombre_provincia}` : '';
                setLocation(locationValue);
              }}
              renderInput={(params) =>
                <TextField
                  {...params}
                  label="Ubicación"
                  fullWidth
                  sx={{
                    backgroundColor: "#fff",
                    width: "100%",
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
              }
              renderOption={(props, option) => (
                <li {...props}>
                  {option.nombre_provincia}
                </li>
              )}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              //onClick={onSearch}
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
