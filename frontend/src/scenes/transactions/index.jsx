import { Box, useTheme } from "@mui/material";
import { useState, useMemo, useRef } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionsQuery } from "../../state/api";
import Header from "../../components/Header";
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
            return params.value.length;
        },
    },
    {
        field: "cost",
        headerName: "Cost",
        flex: 0.5,
        renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
];

export default function Transactions() {
    const theme = useTheme();

    // values to be sent to the backend
    const [searchInput, setSearchInput] = useState("");
    const [search, setSearch] = useState("");
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 20,
    });
    const [sort, setSort] = useState({});
    const { data, isLoading } = useGetTransactionsQuery({
        page: paginationModel.page,
        pageSize: paginationModel.pageSize,
        sort: JSON.stringify(sort),
        search,
    });

    const rowCountRef = useRef(data?.total || 0);

    const rowCount = useMemo(() => {
        if (data?.total !== undefined) {
            rowCountRef.current = data.total;
        }
        return rowCountRef.current;
    }, [data?.total]);

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="TRANSACTIONS" subtitle="Entire List of Transactions" />
            <Box
                height="80vh"
                sx={{
                    "& .MuiDataGrid-root": { border: "none" },
                    "& .MuiDataGrid-cell": { borderBottom: "none" },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: theme.palette.primary.light,
                    },
                    "& .MuiDataGrid-footerContainer": {
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.secondary[100],
                        borderTop: "none",
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${theme.palette.secondary[200]} !important`,
                    },
                }}
            >
                <DataGrid
                    loading={isLoading}
                    getRowId={(row) => row._id}
                    rows={data?.transactions || []}
                    columns={columns}
                    rowCount={rowCount}
                    pageSizeOptions={[20, 50, 100,]}
                    paginationModel={paginationModel}
                    paginationMode="server"
                    sortingMode="server"
                    onPaginationModelChange={setPaginationModel}
                    onSortModelChange={(newSortModel) => setSort(...newSortModel)}
                    slots={{ toolbar: DataGridCustomToolbar }}
                    slotProps={{
                        toolbar: { searchInput, setSearch, setSearchInput },
                    }}
                />
            </Box>
        </Box>
    );
}
