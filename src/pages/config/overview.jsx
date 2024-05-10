import React, { useEffect } from "react";
import { IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Edit, Delete } from '@mui/icons-material';
import { dataGrid } from "src/theme/overrides/components/data-grid";
import CustomDataTable from "../dashboard/customDataTable";


const groupedData = [{
    organization: "Ellicium",
    users: [
        { id: 1, name: "John Doe", email: "john.doe@example.com", agency: "Kiara Tech Pvt. Ltd." },
        { id: 2, name: "Jane Smith", email: "jane.smith@example.com", agency: "TechHire Staffing" },
        { id: 5, name: "Michael Carter", email: "michael.carter@example.com", agency: "Prime Talent Solutions" },
    ],
    agencies: [
        { id: 1, name: "Kiara Tech Pvt. Ltd." },
        { id: 2, name: "TechHire Staffing" },
        { id: 5, name: "Prime Talent Solutions" },
    ],
},

];



function Overview() {
    const url = `${import.meta.env.VITE_API_KEY}`
    function handleAdd(user) {
        // Implement the logic to add the user or perform the desired add action
        console.log("Add action for user:", user);
    }

    function handleDelete(userId) {
        // Implement the logic to delete the user or perform the desired delete action
        console.log("Delete action for user ID:", userId);
    }


    useEffect(() => {
        const urls = {
            organizations: `${url}get_all_organizations`,
            agencies: `${url}get_all_agencies`,
            users: `${url}view_users`
        };

        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        const orgId = userDetails?.orgId;
        const username = userDetails?.username;

        const formBody = new URLSearchParams();
        formBody.append('Org_id', orgId);
        formBody.append('User_name', username);

        const userPostOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formBody.toString(),
        };

        Promise.all([
            fetch(urls.organizations).then(response => response.json()),
            fetch(urls.agencies).then(response => response.json()),
            fetch(urls.users, userPostOptions).then(response => response.json())
        ])
            .then(([organizations, agencies, users]) => {
                console.log("Organizations:", organizations);
                console.log("Agencies:", agencies);
                console.log("Users:", users);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        // <CustomDataTable
        //     rowData={groupedData}
        //     columns={[{
        //         accessorKey: 'organization',
        //         header: 'organization',
        //         muiTableHeadCellProps: { align: 'center' },
        //     },]}
        // />
        <Table >
            <TableHead style={{
                position: 'sticky',
                top: 0,
                backgroundColor: 'white',
                zIndex: 1,
            }}>
                <TableRow>
                    <TableCell>Organization</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>Agency</TableCell>
                    <TableCell style={{ textAlign: 'left' }}>Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody style={{ overflowY: 'scroll' }}>
                {groupedData.map((group) => (
                    <React.Fragment key={group.organization}>
                        <TableRow>
                            <TableCell colSpan={4}>
                                <strong>{group.organization}</strong>
                            </TableCell>
                        </TableRow>
                        {group.users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell></TableCell> {/* Empty cell for alignment */}
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.agency}</TableCell>
                                <TableCell style={{ textAlign: 'left' }}>
                                    <IconButton onClick={() => handleAdd(user)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(user.id)}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </React.Fragment>
                ))}
            </TableBody>
        </Table>
    );
}

export default Overview;
