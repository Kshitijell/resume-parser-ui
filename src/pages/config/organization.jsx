import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { toast } from 'react-toastify';
import { Box } from '@mui/material';

const validationSchema = Yup.object({
    orgId: Yup.string().required('Organization ID is required'),
    orgName: Yup.string().required('Organization name is required'),
    apiKey: Yup.string().required('Api key is required'),

});

const initialValues = {
    orgId: '',
    orgName: '',
    apiKey: '',

};

const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append('Org_id', values.orgId);
    formData.append('API_KEY', values.apiKey);
    formData.append('Org_name', values.orgName);

    fetch('http://192.168.1.105:5000/insert_organization', {
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
            toast.success('Creation of organization successful')
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

const Organizationform = () => {
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
                            id="orgName"
                            name="orgName"
                            label="Organization name"
                            value={formik.values.orgName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.orgName && Boolean(formik.errors.orgName)}
                            helperText={formik.touched.orgName && formik.errors.orgName}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            id="apiKey"
                            name="apiKey"
                            label="Api key"
                            value={formik.values.apiKey}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.apiKey && Boolean(formik.errors.apiKey)}
                            helperText={formik.touched.apiKey && formik.errors.apiKey}
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

export default Organizationform;
