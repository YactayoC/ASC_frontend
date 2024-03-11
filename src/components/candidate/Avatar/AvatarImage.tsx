import { Box } from '@mui/material'

const handleImageClick = () => {
    const fileInput = document.getElementById('fileInput');
    fileInput?.click();
}

const handlePhotoChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const target = e.target as FileReader;
            const result = target.result;
            if (typeof result === "string") {
                localStorage.setItem("photo", result);
            }
        }
        reader.readAsDataURL(file);
    }
}

const AvatarImage = () => {
    return (
        <Box
            sx={{
                backgroundImage: "url(https://fotosprofesionales.es/wp-content/uploads/2023/08/fotografo-de-retrato-madrid-foto-corporativa-hombre-12.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "19rem",
                height: "20rem",
                cursor: "pointer",
                borderRadius: "0.5rem",
                '&:hover': {
                    opacity: 0.7,
                    transition: "0.5s",
                },
            }}
            onClick={handleImageClick}
        >
            <input
                id="fileInput"
                type="file"
                style={{ display: 'none' }}
                onChange={handlePhotoChange}
            />
        </Box>
    )
}

export default AvatarImage