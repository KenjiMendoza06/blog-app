import { Box, useTheme } from "@mui/material"
import { useState } from "react"
import { DataGrid } from "@mui/x-data-grid"
import { useGetTransactionsQuery } from "../../state/api"
import Header from "../../components/Header"
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar";

const columns = [
    {
        field: "_id",
        headerName: "ID",
        flex: 1,
    },
    {
        field: "userId",
        headerName: "User ID",
        flex: 1,
    },
    {
        field: "createdAt",
        headerName: "CreatedAt",
        flex: 1,
    },
    {
        field: "products",
        headerName: "# of Products",
        flex: 0.5,
        sortable: false,
        renderCell: (params) => {
            params.value.length
        }
    },
    {
        field: "cost",
        headerName: "Cost",
        flex: 0.5,
        renderCell: (params) => `$${Number(params.value).toFixed(2)}`
    },
]

export default function Transactions() {
    const theme = useTheme();

    // values to be sent to the backend
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [sort, setSort] = useState({});
    const [search, setSearch] = useState("");

    const { data, isLoading } = useGetTransactionsQuery({ page, pageSize, sort: JSON.stringify(sort), search });

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="TRANSACTIONS" subtitle="Entire List of Transactions" />
            <Box height="80vh"
                sx={{
                    "& .MuiDataGrid-root": { border: "none" },
                    "& .MuiDataGrid-cell": { borderBottom: "none" },
                    "& .MuiDataGrid-columnHeaders": { backgroundColor: theme.palette.background.alt, color: theme.palette.secondary[100], borterBottom: "none" },
                    "& .MuiDataGrid-virtualScroller": { backgroundColor: theme.palette.primary.light, },
                    "& .MuiDataGrid-footerContainer": { backgroundColor: theme.palette.primary.light, color: theme.palette.secondary[100], borterTop: "none" },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": { color: `${theme.palette.secondary[200]} !important` }
                }}
            ><DataGrid
                loading={isLoading}
                getRowId={(row) => row._id}
                rows={(data && data.transactions || [])}
                columns={columns}
                page={page}
                pageSize={pageSize}
                rowCount={(data && data.total) || 0}
                pagination
                paginationMode="server"
                sortingMode="server"
                onPageChange={(newPage) => setPage(newPage)}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                onSortModelChange={(newSortModel) => setSort(...newSortModel)}
                components={{ Toolbar: DataGridCustomToolbar }}

            ></DataGrid></Box>
        </Box>
    )
}