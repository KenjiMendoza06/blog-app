import { Box, useTheme } from "@mui/material";
import { useGetAdminsQuery } from "../../state/api";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header"

export default function Admin() {
    const theme = useTheme();
    const { data, isLoading } = useGetAdminsQuery();
    console.log("🚀 ~ Admin ~ data:", data)

    return (
        <Box m="1.5rem 2.5rem">
            <Header />
        </Box>
    )
}