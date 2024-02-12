import { useState, useEffect } from 'react';
import { Box, useTheme, Button, IconButton, Tooltip } from "@mui/material";
import { Add } from '@mui/icons-material';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useNavigate } from 'react-router-dom'
import { useStoryContext } from "../../contexts";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { socket } from '../../socket';

export const Stories = () => {
    const [stories, setStories] = useState([]);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const { getStories, deleteStory } = useStoryContext();

    useEffect(() => {

        initStories();

        socket.on('refresh-stories', initStories);

        return () => {
            socket.off('refresh-stories', initStories);
        }

    }, [])

    const initStories = async () => {
        const storiesRes = await getStories();
        setStories(storiesRes.map(story => ({ ...story, id: story._id })))
    }

    const confirmDeletion = async (id) => {
        const res = await deleteStory(id);
        if (res) {
            initStories();
        }
    }

    const columns = [
        {
            field: "title",
            headerName: "Title",
            flex: 1,
            cellClassName: "title-column--cell",
        },
        {
            field: "amountOfSentences",
            headerName: "Amount of sentences",
            flex: 1,
            cellClassName: "amountOfSentences-column--cell",
        },
        {
            field: "topic",
            headerName: "Topic",
            flex: 1,
        },
        {
            field: "createdFrom",
            headerName: "Created from",
            flex: 1,
            cellClassName: "createdfrom-column--cell",
            renderCell: ({ row: { createdFrom } }) => {
                return (
                    `${createdFrom.firstname} ${createdFrom.lastname}`
                );
            },
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            renderCell: ({ row: { _id, status } }) => {
                return (
                    <ActionsCell rowItemId={_id} confirm={confirmDeletion} completed={status === 'completed'} />
                );
            },
        },
    ];

    return (
        <>
            <Box m="20px">
                <Header title="STORIES" subtitle="Managing the stories" />
                <Box display={"flex"} justifyContent={"flex-end"}>
                    <Button onClick={() => navigate('/stories/new')} color="primary" variant="contained" startIcon={<Add />}>
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
                    <DataGrid checkboxSelection rows={stories} columns={columns} components={{ Toolbar: GridToolbar }} />
                </Box>
            </Box>
        </>
    );
};


const ActionsCell = ({ rowItemId, confirm, completed }) => {
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <Box
                display="flex"
                gap="10px"
            >
                <Tooltip title="View">
                    <IconButton onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/stories/view/${rowItemId}`);
                    }} aria-label="view">
                        <VisibilityIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Add Sentence">
                    <span>
                        <IconButton disabled={completed} onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/stories/add-sentence/${rowItemId}`);
                        }} aria-label="view">
                            <EditNoteIcon />
                        </IconButton>
                    </span>
                </Tooltip>
                <Tooltip title="Edit">
                    <span>
                        <IconButton disabled={completed} onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/stories/${rowItemId}`);
                        }} aria-label="edit">
                            <EditIcon />
                        </IconButton>
                    </span>
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
