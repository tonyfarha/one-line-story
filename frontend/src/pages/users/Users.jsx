import { useState, useEffect } from 'react';
import { Box, Typography, useTheme, Button, IconButton, Tooltip } from "@mui/material";
import { Add } from '@mui/icons-material';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useNavigate } from 'react-router-dom'
import { useUserContext } from "../../contexts";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ConfirmDialog } from '../../components/ConfirmDialog';

export const Users = () => {
    const [users, setUsers] = useState([]);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const { getUsers, deleteUser } = useUserContext();

    useEffect(() => {
        initUsers();
    }, [])

    const initUsers = async () => {
        const usersRes = await getUsers();
        setUsers(usersRes.map(user => ({ ...user, id: user._id })))
    }

    const confirmDeletion = async (id) => {
        const res = await deleteUser(id);
        if (res) {
            initUsers();
        }
    }

    const columns = [
        {
            field: "firstname",
            headerName: "Firstname",
            flex: 1,
            cellClassName: "firstname-column--cell",
        },
        {
            field: "lastname",
            headerName: "Lastname",
            flex: 1,
            cellClassName: "lastname-column--cell",
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "role",
            headerName: "Role",
            flex: 1,
            renderCell: ({ row: { role } }) => {
                return (
                    <Box
                        display="flex"
                        gap='10px'
                    >
                        {role === "admin" && <AdminPanelSettingsOutlinedIcon />}
                        {role === "user" && <LockOpenOutlinedIcon />}
                        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                            {role}
                        </Typography>
                    </Box>
                );
            },
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            renderCell: ({ row: { _id } }) => {
                return (
                    <ActionsCell rowItemId={_id} confirm={confirmDeletion} />
                );
            },
        },
    ];

    return (
        <>
            <Box m="20px">
                <Header title="USERS" subtitle="Managing the users" />
                <Box display={"flex"} justifyContent={"flex-end"}>
                    <Button onClick={() => navigate('/users/new')} color="primary" variant="contained" startIcon={<Add />}>
                        Add New
                    </Button>
                </Box>
                <Box
                    m="20px 0 0 0"
                    height="75vh"
                    sx={{
                        "& .MuiDataGrid-root": {
                            border: "none",
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: "none",
                        },
                        "& .name-column--cell": {
                            color: colors.greenAccent[300],
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: colors.blueAccent[700],
                            borderBottom: "none",
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: colors.primary[400],
                        },
                        "& .MuiDataGrid-footerContainer": {
                            borderTop: "none",
                            backgroundColor: colors.blueAccent[700],
                        },
                        "& .MuiCheckbox-root": {
                            color: `${colors.greenAccent[200]} !important`,
                        },
                    }}
                >
                    <DataGrid checkboxSelection rows={users} columns={columns} components={{ Toolbar: GridToolbar }} />
                </Box>
            </Box>
        </>
    );
};


const ActionsCell = ({ rowItemId, confirm }) => {
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <Box
                display="flex"
                gap="10px"
            >
                <Tooltip title="Edit">
                    <IconButton onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/users/${rowItemId}`);
                    }} aria-label="edit">
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton onClick={(e) => {
                        e.stopPropagation();
                        setIsConfirmDialogOpen(true);
                    }} aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Box>
            {
                isConfirmDialogOpen && (
                    <ConfirmDialog
                        open={isConfirmDialogOpen}
                        confirm={() => {
                            confirm(rowItemId)
                            setIsConfirmDialogOpen(false)
                        }
                        }
                        disconfirm={() => {
                            setIsConfirmDialogOpen(false)
                        }
                        }
                    />
                )
            }
        </>
    )
}
