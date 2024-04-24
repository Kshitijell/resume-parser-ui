import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { Autocomplete, Box } from '@mui/material';
import { agencyImage } from 'src/assets/images';

const initialFormValues = {
    orgId: '',
    agencyName: '',
    agencyEmail: '',
};

const Agencyform = () => {
    const [formValues, setFormValues] = useState(initialFormValues);
    const [orgOptions, setOrgOptions] = useState([]);
    const [selectedOrg, setSelectedOrg] = useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    useEffect(() => {
        fetch('http://52.1.28.231:5000/get_all_organizations')
            .then(response => response.json())
            .then(data => {
                const transformedOptions = data.organizations?.map(org => ({
                    label: org.Org_name,
                    id: org.Org_id,
                }));
                setOrgOptions(transformedOptions);
            })
            .catch(error => {
                console.error('Error fetching organizations:', error);
            });
    }, []);

    const handleOrgChange = (event, newValue) => {
        setSelectedOrg(newValue);
        setFormValues({
            ...formValues,
            orgId: newValue ? newValue.id : ''
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('org_id', formValues?.orgId);
        formData.append('Agency_name', formValues?.agencyName);
        formData.append('Agency_email', formValues?.agencyEmail);

        fetch('http://52.1.28.231:5000/insert_agency', {
            method: 'POST',
            body: formData
        }).then(response => {
            if (!response.ok) {
                throw new Error('Something went wrong, error is logged');
            }
            return response.json();
        }).then(data => {
            if (data?.message?.includes('Inserted into agency_table')) {
                setSelectedOrg(null)
                setFormValues(initialFormValues)
                toast.success('Creation of Agency successful')
            } else if (data?.error?.includes('UNIQUE')) {
                setSelectedOrg(null)
                setFormValues(initialFormValues)
                toast.error('Agency already exists, for the selected orgnization')
            }
        })
    };
    const isButtonDisabled = !(formValues.orgId && formValues.agencyName && formValues.agencyEmail);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '5%' }}>
            <div>
                <img src={agencyImage} alt="admin" width="500px" height="300px" />
            </div>
            <div style={{ marginTop: '10px', paddingLeft: '10px' }}>
                <form onSubmit={handleSubmit}>
                    <Autocomplete
                        options={orgOptions}
                        getOptionLabel={option => option?.label}
                        value={selectedOrg}
                        onChange={handleOrgChange}
                        renderInput={params => (
                            <TextField
                                {...params}
                                name='orgId'
                                label="Organization ID*"
                                sx={{
                                    label: {
                                        fontSize: '20px',
                                    },
                                    input: {
                                        fontSize: '20px',
                                    },
                                }}
                            />
                        )}
                    />
                    <TextField
                        fullWidth
                        id="agencyName"
                        name="agencyName"
                        label="Agency name*"
                        disabled={formValues.orgId.length <= 0}
                        value={formValues.agencyName}
                        onChange={handleChange}
                        margin="normal"
                        inputProps={{ style: { fontSize: 20, cursor: formValues?.orgId?.length <= 0 ? 'not-allowed' : 'auto' } }}
                        InputLabelProps={{ style: { fontSize: 20 } }}
                    />
                    <TextField
                        fullWidth
                        id="agencyEmail"
                        name="agencyEmail"
                        label="Agency identifier*"
                        value={formValues.agencyEmail}
                        onChange={handleChange}
                        disabled={formValues.agencyName.length <= 0}
                        margin="normal"
                        inputProps={{ style: { fontSize: 20, cursor: formValues?.agencyName?.length <= 0 ? 'not-allowed' : 'auto' } }}
                        InputLabelProps={{ style: { fontSize: 20 } }}
                    />

                    <Box display="flex" justifyContent="center" marginTop={2}>
                        <Button color="primary" variant="contained" type="submit" disabled={isButtonDisabled} sx={{ fontSize: '1.2rem' }}>
                            Create Agency
                        </Button>
                    </Box>
                </form>
            </div>
        </div>
    );
};

export default Agencyform;
