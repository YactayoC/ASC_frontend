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
  const [_valueAtomSearch, setValueAtomSearch] = useAtom(atomSearch);
  const [locationLabel, setLocationLabel] = useState(""); // Para la etiqueta de visualización

  const onSearch = async (e: any) => {
    e.preventDefault();
    const trimmedSearch = search.trim();

    if (!trimmedSearch && !location) {
      toast.error('Ingrese un puesto y una ubicación para buscar', {
        closeOnClick: true,
        autoClose: 2000,
        theme: 'colored',
      });
      return;
    }

    if (!trimmedSearch) {

      setValueAtomSearch({ value: trimmedSearch, location });
      localStorage.setItem('searchValue', JSON.stringify({ value: trimmedSearch, location }));

      navigate(`/candidate/search/geo/${location}/`);
      return;
    }

    if (!location) {

      setValueAtomSearch({ value: trimmedSearch, location });
      localStorage.setItem('searchValue', JSON.stringify({ value: trimmedSearch, location }));

      navigate(`/candidate/search/${trimmedSearch}/`);
      return;
    }

    setValueAtomSearch({ value: trimmedSearch, location });
    localStorage.setItem('searchValue', JSON.stringify({ value: trimmedSearch, location }));

    navigate(`/candidate/search/${trimmedSearch}/${location}/`);
    return;
  };

  const flatOptions = seedLocations.flatMap(departamento =>
    departamento.provincias.map(provincia => ({
      provincia_id: provincia.provincia_id,
      label: `${departamento.nombre_departamento} - ${provincia.nombre_provincia}`,
      nombre_provincia: provincia.nombre_provincia,
      nombre_departamento: departamento.nombre_departamento,
    }))
  );

  useEffect(() => {
    // Fetch stored search values from localStorage
    const storedSearch = localStorage.getItem('searchValue');
    if (storedSearch) {
      const { value, location } = JSON.parse(storedSearch);
      setSearch(value); // Populate the search field with stored value
      setLocation(location); // Populate the location state with stored ID

      // Update the displayed label for the location
      const matchingOption = flatOptions.find(option => String(option.provincia_id) === location);
      if (matchingOption) {
        setLocationLabel(matchingOption.label);
      }
    }
  }, []);

  useEffect(() => {
    // Update the displayed label for the location
    const matchingOption = flatOptions.find(option => String(option.provincia_id) === location);
    if (matchingOption) {
      setLocationLabel(matchingOption.label);
    }
  }, [location]);


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
              onChange={(e) => {
                ////console.log(e.target.value); // Para depuración
                setSearch(e.target.value);
              }}
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
              value={flatOptions.find(option => option.label === locationLabel) || null}
              groupBy={(option) => option.nombre_departamento}
              getOptionLabel={(option) => option.label}
              onChange={(_event, newValue) => {
                // Obtiene el ID y el label de la nueva ubicación seleccionada
                const newLocationValue = newValue ? String(newValue.provincia_id) : '';
                const newLocationLabel = newValue ? newValue.label : '';

                // Actualiza el estado y localStorage con los nuevos valores
                setLocation(newLocationValue);
                setLocationLabel(newLocationLabel); // Esto garantiza que el label se actualice para mostrar el valor correcto

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
