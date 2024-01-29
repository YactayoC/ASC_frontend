import { Grid, TextField, InputAdornment, Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const SearchJob = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          variant="outlined"
          label="Palabra clave, empresa, ubicación, etc."
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          variant="outlined"
          label="Ubicación"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOnIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} md={2}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            height: "100%",
          }}
        >
          Buscar
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchJob;
