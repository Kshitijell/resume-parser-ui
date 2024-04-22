import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { Box } from '@mui/material';
import { orgnizationImage } from 'src/assets/images';

const initialFormValues = {
    orgId: '',
    orgName: '',
    apiKey: '',
};

const Organizationform = () => {
    const [formValues, setFormValues] = useState(initialFormValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('Org_id', formValues.orgId);
        formData.append('API_KEY', formValues.apiKey);
        formData.append('Org_name', formValues.orgName);

        fetch('http://52.1.28.231:5000/insert_organization', {
            method: 'POST',
            body: formData,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Something went wrong. Error is consoled.');
                }
                return response.json();
            })
            .then((data) => {
                if (data?.message.includes('Inserted into organization_table')) {
                    setFormValues(initialFormValues)
                    toast.success('Creation of user successful')
                }
            })
            .catch((error) => {
                toast.error('Something went wrong');
                console.error('Error:', error);
            });
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '4%' }}>
            <div>
                <img src={orgnizationImage} alt="admin" width="500px" height="300px" />
            </div>
            <div style={{ marginTop: '60px' }}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        id="orgName"
                        name="orgName"
                        label="Organization Name*"
                        value={formValues.orgName}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        id="apiKey"
                        name="apiKey"
                        label="API Key*"
                        value={formValues.apiKey}
                        onChange={handleChange}
                        margin="normal"
                        disabled={formValues.orgName.length <= 0}
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
