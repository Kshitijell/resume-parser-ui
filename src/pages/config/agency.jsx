import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { Box } from '@mui/material';
import { agencyImage } from 'src/assets/images';
import CustomAutoFetchComplete from 'src/components/custom-autocomplete/custom-auto-fetch-complete';

const validationSchema = Yup.object({
    orgId: Yup.string().required('Organization ID is required'),
    agencyName: Yup.string().required('Agency name is required'),
    agencyEmail: Yup.string()
        .required('Agency email is required')
        .email('Invalid email address')
        .matches(/\.com$|\.org$/, 'Email must end with .com or .org'),
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


    fetch('http://52.1.28.231:5000/insert_agency', {
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
    const [orgId, setOrgId] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleInputChange = (event, newInputValue) => {
        event?.preventDefault();
        setOrgId(newInputValue);
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
    });

    return (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '4%' }}>
            <div >
                <img src={agencyImage} alt="admin"  width="500px" height="300px" />
            </div>
            <div style={{ marginTop: '40px', paddingLeft: '10px' }}>
                <form onSubmit={formik.handleSubmit}>
                    {/* <TextField
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
                        fullWidth
                        id="agencyName"
                        name="agencyName"
                        label="Agency name"
                        disabled={orgId.length <= 0}
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
                        disabled={orgId.length <= 0}
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
            </div>
        </div>
    );
};

export default Agencyform;
