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
    agencyName: Yup.string().required('Agency name is required'),
    agencyEmail: Yup.string().required('Agency email is required'),
});

const initialValues = {
    orgId: '',
    agencyName: '',
    agencyEmail: '',
};

const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append('org_id', values.orgId);
    formData.append('Agency_name', values.agencyName);
    formData.append('Agency_email', values.agencyEmail);

    fetch('http://192.168.1.105:5000/insert_agency', {
        method: 'POST',
        body: formData
    }).then(response => {
        if (!response.ok) {
            throw new Error('Something went wrong, error is logged');
        }
        return response.json();
    }).then(data => {
        toast.success('Agency creation successful');
    })
        .catch(error => {
            console.error('Error:', error);
        });
};

const Agencyform = () => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
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
            <Card
            >
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
                            id="agencyName"
                            name="agencyName"
                            label="Agency name"
                            value={formik.values.agencyName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.agencyName && Boolean(formik.errors.agencyName)}
                            helperText={formik.touched.agencyName && formik.errors.agencyName}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            id="agencyEmail"
                            name="agencyEmail"
                            label="Agency email"
                            value={formik.values.agencyEmail}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.agencyEmail && Boolean(formik.errors.agencyEmail)}
                            helperText={formik.touched.agencyEmail && formik.errors.agencyEmail}
                            margin="normal"
                        />

                        <Box display="flex" justifyContent="center" marginTop={2}>
                            <Button color="primary" variant="contained" type="submit">
                                Create Agency
                            </Button>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Agencyform;
