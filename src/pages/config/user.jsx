import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box, Grid, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { createUserImage } from 'src/assets/images';
import CustomAutoFetchComplete from 'src/components/custom-autocomplete/custom-auto-fetch-complete';

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


    fetch('http://52.1.28.231:5000/insert_user', {
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
    const [orgId, setOrgId] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleInputChange = (event, newInputValue) => {
        event?.preventDefault();
        setOrgId(newInputValue);
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            handleSubmit(values)
        },
    });

    return (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '4%' }}>
            <div>
                <img src={createUserImage} alt="admin" width="500px" height="300px" />
            </div>
            <div style={{ paddingLeft: '30px' }}>
                <form onSubmit={formik.handleSubmit}>
                    {/* <TextField
                        sx={{ width: '35%', padding: '5px' }}
                        id="accessLevel"
                        name="accessLevel"
                        label="Access Level"
                        value={formik.values.accessLevel}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.accessLevel && Boolean(formik.errors.accessLevel)}
                        helperText={formik.touched.accessLevel && formik.errors.accessLevel}
                        margin="normal"
                    /> */}
                    <CustomAutoFetchComplete
                        options={['ds01', 'ds02', 'ds03']}
                        autoCompleteProps={{
                            open,
                            onOpen: () => {
                                setOpen(true);
                            },
                            onClose: () => {
                                setOpen(false);
                            },
                            value: orgId,
                            onInputChange: handleInputChange,
                            onKeyDown: (e) => handleEnter(),
                            getOptionLabel: (option) => option,
                            isOptionEqualToValue: (option, value) => option === value,
                        }}
                        inputProps={{
                            label: 'Organization ID',
                            name: 'Org_id',
                        }}
                    />
                    <TextField
                        sx={{ width: '50%', padding: '5px', borderColor: 'black' }}
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
                        sx={{ width: '50%', padding: '5px' }}
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

                    <Grid>
                        <FormControlLabel
                            sx={{ width: '20%', padding: '5px' }}
                            control={
                                <Checkbox
                                    id="admin"
                                    name="admin"
                                    checked={formik.values.admin}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            }
                            label="Ranker"
                        />
                    </Grid>
                    <Grid>
                        <FormControlLabel
                            sx={{ width: '20%', padding: '5px' }}
                            control={
                                <Checkbox
                                    id="admin"
                                    name="admin"
                                    checked={formik.values.admin}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            }
                            label="Parser"
                        />
                    </Grid>
                    <Grid>
                        <FormControlLabel
                            sx={{ width: '15%', padding: '5px' }}
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
                    </Grid>
                    <Box display="flex" justifyContent="center" marginTop={2}>
                        <Button color="primary" variant="contained" type="submit">
                            Create User
                        </Button>
                    </Box>
                </form>
            </div>
        </div>

    );
};

export default Userform;
