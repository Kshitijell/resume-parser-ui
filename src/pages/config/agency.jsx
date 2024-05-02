import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { Autocomplete, Box } from '@mui/material';
import { agencyImage } from 'src/assets/images';
import './AgencyForm.css';

const initialFormValues = {
    orgId: '',
    agencyName: '',
    agencyEmail: '',
};

const Agencyform = () => {
    const [formValues, setFormValues] = useState(initialFormValues);
    const [orgOptions, setOrgOptions] = useState([]);
    const [selectedOrg, setSelectedOrg] = useState(null);

    useEffect(() => {
        // Fetch organization options from the API
        fetch('http://52.207.190.181:5000/get_all_organizations')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch organizations');
                }
                return response.json();
            })
            .then(data => {
                const transformedOptions = data.organizations?.map(org => ({
                    label: org.Org_name,
                    id: org.Org_id,
                })) || [];
                setOrgOptions(transformedOptions);
            })
            .catch(error => {
                console.error('Error fetching organizations:', error);
                toast.error('Failed to fetch organizations. Please try again later.');
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const handleOrgChange = (event, newValue) => {
        setSelectedOrg(newValue);
        setFormValues((prevValues) => ({
            ...prevValues,
            orgId: newValue ? newValue.id : '',
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('org_id', formValues.orgId);
        formData.append('Agency_name', formValues.agencyName);
        formData.append('Agency_email', formValues.agencyEmail);

        fetch('http://52.207.190.181:5000/insert_agency', {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Something went wrong. Please try again later.');
                }
                return response.json();
            })
            .then(data => {
                if (data?.message?.includes('Inserted into agency_table')) {
                    setSelectedOrg(null);
                    setFormValues(initialFormValues);
                    toast.success('Agency created successfully');
                } else if (data?.error?.includes('UNIQUE')) {
                    toast.error('Agency already exists for the selected organization');
                } else {
                    throw new Error('Unexpected server response');
                }
            })
            .catch(error => {
                console.error('Error submitting form:', error);
                toast.error('An error occurred. Please try again.');
            });
    };

    const isButtonDisabled = !(formValues.orgId && formValues.agencyName && formValues.agencyEmail);

    return (
        <div className="formContainer">
            <div className="imageContainer">
                <img src={agencyImage} alt="agency" />
            </div>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <Autocomplete
                        options={orgOptions}
                        getOptionLabel={(option) => option?.label || ''}
                        value={selectedOrg}
                        onChange={handleOrgChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                name="orgId"
                                label="Organization Name"
                                className='textFieldAgency'
                                required
                                sx={{ label: { fontSize: '20px' }, input: { fontSize: '20px' } }}
                            />
                        )}
                    />
                    <TextField
                        id="agencyName"
                        name="agencyName"
                        label="Agency Name"
                        required
                        disabled={!formValues.orgId}
                        value={formValues.agencyName}
                        onChange={handleChange}
                        autoFocus
                        className="textFieldAgency"
                        inputProps={{ style: { fontSize: 20 } }}
                        InputLabelProps={{ style: { fontSize: 20 } }}
                    />
                    <TextField
                        id="agencyEmail"
                        name="agencyEmail"
                        label="Agency Identifier*"
                        required
                        value={formValues.agencyEmail}
                        onChange={handleChange}
                        disabled={!formValues.agencyName}
                        className="textFieldAgency"
                        inputProps={{ style: { fontSize: 20 } }}
                        InputLabelProps={{ style: { fontSize: 20 } }}
                    />

                    <Box className="submitButtonContainer">
                        <Button
                            variant="outlined"
                            type="submit"
                            disabled={isButtonDisabled}
                            className="submitButton"
                        >
                            Create Agency
                        </Button>
                    </Box>
                </form>
            </div>
        </div>
    );
};

export default Agencyform;
