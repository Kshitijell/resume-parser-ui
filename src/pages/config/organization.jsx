import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { Box } from '@mui/material';
import { orgnizationImage } from 'src/assets/images';

const validationSchema = Yup.object({
    orgId: Yup.string().required('Organization ID is required'),
    orgName: Yup.string()
        .required('Organization name is required')
        .matches(/^[A-Za-z]+$/, 'Organization name must contain\nonly alphabetic characters'), // Error message with newline
    apiKey: Yup.string().required('API key is required'),
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

    fetch('http://52.1.28.231:5000/insert_organization', {
        method: 'POST',
        body: formData,
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Something went wrong error is consoled');
            }
            return response.json();
        })
        .then((data) => {
            toast.success('Creation of organization successful');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};

const Organizationform = () => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
    });

    return (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '4%' }}>
            <div>
                <img src={orgnizationImage} alt="admin"  width="500px" height="300px"  />
            </div>
            <div style={{ marginTop: '60px' }}>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        id="orgName"
                        name="orgName"
                        label="Organization name"
                        value={formik.values.orgName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.orgName && Boolean(formik.errors.orgName)}
                        helperText={formik.touched.orgName && formik.errors.orgName ? (
                            <span style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', display: 'block' }}>
                                {formik.errors.orgName}
                            </span>
                        ) : ''}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        id="apiKey"
                        name="apiKey"
                        label="API key"
                        value={formik.values.apiKey}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.apiKey && Boolean(formik.errors.apiKey)}
                        helperText={formik.touched.apiKey && formik.errors.apiKey ? (
                            <span style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', display: 'block' }}>
                                {formik.errors.apiKey}
                            </span>
                        ) : ''}
                        margin="normal"
                    />
                    <Box display="flex" justifyContent="center" marginTop={2}>
                        <Button color="primary" variant="contained" type="submit">
                            Create Organization
                        </Button>
                    </Box>
                </form>
            </div>
        </div>
    );
};

export default Organizationform;
