import { Box, Typography } from "@mui/material";
import theme from "../../../theme";

export const HeaderMainPage = () => {
    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                borderBlock: "2px solid #2b78e4",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                paddingInline: "5rem",
                paddingBlock: "2rem",
            }}
        >
            <Box
                sx={{
                    flexDirection: "row",
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                    rowGap: "2rem",
                    [theme.breakpoints.down("sm")]: {
                        flexDirection: "column",
                    },
                }}
            >
                <Box>
                    <img
                        src="/alert-1.png"
                        alt="banner"
                        style={{
                            width: "10rem",
                            height: "10rem",
                        }}
                    />
                </Box>

                <Typography
                    variant="h4"
                    gutterBottom
                    align="center"
                    color={"#2b78e4"}
                    fontWeight={700}
                >
                    Únete a nuestro equipo de trabajo
                </Typography>
                <Box>
                    <img
                        src="/alert-2.png"
                        alt="banner"
                        style={{
                            width: "8rem",
                            height: "10rem",
                        }}
                    />
                </Box>
            </Box>
            <Typography variant="h6" gutterBottom align="center" color={"#666666"}>
                ¡Aquí encontraras el empleo que buscabas!
            </Typography>
        </Box>
    )
}