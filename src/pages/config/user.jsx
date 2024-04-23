import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Autocomplete, Box, Grid } from '@mui/material';
import { createUserImage } from 'src/assets/images';
import { toast } from 'react-toastify';

const Userform = () => {
    const [formValues, setFormValues] = useState({
        orgId: '',
        accessLevel: '',
        username: '',
        password: '',
        Admin: false,
        Ranker: false,
        Parser: false,
        applicationAccess: ''
    });

    const [orgOptions, setOrgOptions] = useState([]);
    const [selectedOrg, setSelectedOrg] = useState(null);
    const [selectedAccess, setSelectedAccess] = useState(null)

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

    const handleChange = (e) => {
        const { name, type, checked } = e.target;
        let newApplicationAccess = [...formValues.applicationAccess];
        setFormValues((prevFormValues) => ({
            ...prevFormValues,
            [name]: type === 'checkbox' ? checked : e.target.value
        }));
        if (type === 'checkbox') {
            if (checked) {

                newApplicationAccess.push(name);
            } else {
                newApplicationAccess = newApplicationAccess.filter((accessType) => accessType !== name);
            }
            setFormValues((prevFormValues) => ({
                ...prevFormValues,
                applicationAccess: newApplicationAccess
            }));
        }
    };

    useEffect(() => { console.log(formValues.applicationAccess) }, [formValues.applicationAccess])

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('Org_id', formValues.orgId);
        formData.append('Access_level', formValues.accessLevel);
        formData.append('User_name', formValues.username);
        formData.append('Password', formValues.password);
        formData.append('IsAdmin', formValues.Admin.toString());
        formData.append('IsRanker', formValues.Ranker.toString());
        formData.append('IsParser', formValues.Parser.toString());
        formData.append('Application', formValues.applicationAccess);

        fetch('http://52.1.28.231:5000/insert_user', {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Something went wrong.');
                }
                return response.json();
            })
            .then(data => {
                if (data?.message?.includes('Inserted into user_table')) {
                    setSelectedOrg(null)
                    setFormValues({
                        orgId: '',
                        accessLevel: '',
                        username: '',
                        password: '',
                        Admin: false,
                        Ranker: false,
                        Parser: false,
                        applicationAccess: ''
                    })
                    toast.success('Creation of user successful')
                }
            })
            .catch(error => {
                toast.error('Something went wrong');
                console.error('Error:', error);
            });
    };

    const handleOrgChange = (event, newValue) => {
        setSelectedOrg(newValue);
        setFormValues({
            ...formValues,
            orgId: newValue ? newValue.id : ''
        });
    };

    const handleAccessChange = (event, newValue) => {
        setSelectedAccess(newValue);
        setFormValues({
            ...formValues,
            accessLevel: newValue ? newValue.id : ''
        });
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '4%' }}>
            <div>
                <img src={createUserImage} alt="admin" width="500px" height="300px" />
            </div>
            <div style={{ paddingLeft: '30px' }}>
                <form onSubmit={handleSubmit}>
                    <Autocomplete
                        options={orgOptions}
                        getOptionLabel={(option) => option?.label}
                        value={selectedOrg}
                        onChange={handleOrgChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                name='orgId'
                                label='Organization ID'
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
                    <br />
                    <Autocomplete
                        options={[{ id: 'superuser', label: 'Super User' }, { id: 'user', label: 'User' }]}
                        getOptionLabel={option => option?.label}
                        value={selectedAccess}
                        disabled={formValues?.orgId.length <= 0}
                        onChange={handleAccessChange}
                        renderInput={params => (
                            <TextField
                                {...params}
                                name='accessLevel'
                                label="Access Level*"
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
                        sx={{ width: '50%', padding: '5px' }}
                        id="username"
                        name="username"
                        label="Username*"
                        value={formValues?.username}
                        onChange={handleChange}
                        margin="normal"
                        disabled={formValues.orgId === ''}
                        inputProps={{ style: { fontSize: 20, cursor: formValues?.orgId.length <= 0 ? 'not-allowed' : 'auto' } }}
                        InputLabelProps={{ style: { fontSize: 20 } }}
                    />
                    <TextField
                        sx={{ width: '50%', padding: '5px' }}
                        id="password"
                        name="password"
                        label="Password*"
                        type="password"
                        disabled={formValues?.username.length <= 0}
                        value={formValues?.password}
                        onChange={handleChange}
                        margin="normal"
                        inputProps={{ style: { fontSize: 20, cursor: formValues?.username.length <= 0 ? 'not-allowed' : 'auto' } }}
                        InputLabelProps={{ style: { fontSize: 20 } }}
                    />
                    <Grid container spacing={1}>

                        <Grid item xs={12}>
                            <FormControlLabel
                                sx={{
                                    padding: '5px',
                                    '& .MuiTypography-root': {
                                        fontSize: '20px',
                                    }
                                }}
                                control={
                                    <Checkbox
                                        id="admin"
                                        name="Admin"
                                        checked={formValues?.Admin}
                                        onChange={handleChange}
                                    />
                                }
                                label="Admin"
                            />

                            <FormControlLabel
                                sx={{
                                    padding: '5px',
                                    '& .MuiTypography-root': {
                                        fontSize: '20px',
                                    }
                                }}
                                control={
                                    <Checkbox
                                        id="ranker"
                                        name="Ranker"
                                        checked={formValues?.Ranker}
                                        onChange={handleChange}
                                    />
                                }
                                label="Ranker"
                            />
                            <FormControlLabel
                                sx={{
                                    padding: '5px',
                                    '& .MuiTypography-root': {
                                        fontSize: '20px',
                                    }
                                }}
                                control={
                                    <Checkbox
                                        id="parser"
                                        name="Parser"
                                        checked={formValues?.Parser}
                                        onChange={handleChange}
                                    />
                                }
                                label="Parser"
                            />
                        </Grid>
                    </Grid>
                    <Box display="flex" justifyContent="center" marginTop={2}>
                        <Button color="primary" variant="contained" type="submit" sx={{ fontSize: '1.2rem' }}>
                            Create User
                        </Button>
                    </Box>
                </form>
            </div>
        </div>
    );
};

export default Userform;
