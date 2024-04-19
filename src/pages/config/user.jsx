import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box } from '@mui/material';

const validationSchema = Yup.object({
    orgId: Yup.string().required('Organization ID is required'),
    accessLevel: Yup.string().required('Access Level is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
    admin: Yup.boolean(),
    applicationAccess: Yup.string(),
});

const initialValues = {
    orgId: '',
    accessLevel: '',
    username: '',
    password: '',
    admin: false,
    applicationAccess: '',
};

const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append('Org_id', values.orgId);
    formData.append('Access_level', values.accessLevel);
    formData.append('Username', values.username);
    formData.append('Password', values.password);
    formData.append('Admin', values.admin.toString());
    formData.append('Application_Access', values.applicationAccess);


    fetch('http://172.31.16.232:5000/insert_user', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Something went wrong error is consoled');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


const Userform = () => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            handleSubmit(values)
        },
    });

    return (
        <Box sx={{
            height: '100%',
            width: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#E0FFFF'
        }}>
            <Card>
                <CardContent>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            id="orgId"
                            name="orgId"
                            label="Organisation ID"
                            value={formik.values.orgId}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.orgId && Boolean(formik.errors.orgId)}
                            helperText={formik.touched.orgId && formik.errors.orgId}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            id="accessLevel"
                            name="accessLevel"
                            label="Access Level"
                            value={formik.values.accessLevel}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.accessLevel && Boolean(formik.errors.accessLevel)}
                            helperText={formik.touched.accessLevel && formik.errors.accessLevel}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            id="username"
                            name="username"
                            label="Username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.username && Boolean(formik.errors.username)}
                            helperText={formik.touched.username && formik.errors.username}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            margin="normal"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    id="admin"
                                    name="admin"
                                    checked={formik.values.admin}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            }
                            label="Admin"
                        />
                        <TextField
                            fullWidth
                            id="applicationAccess"
                            name="applicationAccess"
                            label="Application Access"
                            value={formik.values.applicationAccess}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.applicationAccess && Boolean(formik.errors.applicationAccess)}
                            helperText={formik.touched.applicationAccess && formik.errors.applicationAccess}
                            margin="normal"
                        />
                        <Box display="flex" justifyContent="center" marginTop={2}>
                            <Button color="primary" variant="contained" type="submit">
                                Create Organization
                            </Button>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Userform;
