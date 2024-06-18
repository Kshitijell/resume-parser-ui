import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Autocomplete, Box, Grid } from '@mui/material';
import { createUserImage } from 'src/assets/images';
import { toast } from 'react-toastify';
import './Userform.css';
import axios from 'axios';

const Userform = () => {
  const [formValues, setFormValues] = useState({
    orgId: '',
    accessLevel: '',
    username: '',
    password: '',
    Admin: false,
    Ranker: false,
    Parser: false,
    applicationAccess: '',
  });

  const url = `${import.meta.env.VITE_API_KEY}`;
  const [orgOptions, setOrgOptions] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [selectedAccess, setSelectedAccess] = useState(null);

  useEffect(() => {
    axios
      .get(`${url}get_all_organizations`)
      .then((response) => {
        const transformedOptions = response?.data?.data.Organizations?.map((org) => ({
          label: org.Org_name,
          id: org.Org_id,
        }));
        setOrgOptions(transformedOptions);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  }, []);

  const handleChange = (e) => {
    const { name, type, checked } = e.target;
    let newApplicationAccess = [...formValues.applicationAccess];
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: type === 'checkbox' ? checked : e.target.value,
    }));
    if (type === 'checkbox') {
      if (checked) {
        newApplicationAccess.push(name);
      } else {
        newApplicationAccess = newApplicationAccess.filter((accessType) => accessType !== name);
      }
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        applicationAccess: newApplicationAccess,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('Org_id', formValues.orgId);
    formData.append('Access_level', formValues.accessLevel);
    formData.append('User_name', formValues.username.trim());
    formData.append('Password', formValues.password.trim());
    formData.append('IsAdmin', formValues.Admin.toString());
    formData.append('IsRanker', formValues.Ranker.toString());
    formData.append('IsParser', formValues.Parser.toString());
    formData.append('Application', formValues.applicationAccess);

    axios
      .post(`${url}insert_user`, formData)
      .then((response) => {
        toast.success(response?.data?.message);
        setSelectedOrg(null);
        setFormValues({
          orgId: '',
          accessLevel: '',
          username: '',
          password: '',
          Admin: false,
          Ranker: false,
          Parser: false,
          applicationAccess: '',
        });
      })
      .catch((error) => {
        setSelectedOrg(null);
        setFormValues({
          orgId: '',
          accessLevel: '',
          username: '',
          password: '',
          Admin: false,
          Ranker: false,
          Parser: false,
          applicationAccess: '',
        });
        toast.error(error?.response?.data?.message);
      });
  };

  const handleOrgChange = (event, newValue) => {
    setSelectedOrg(newValue);
    setFormValues({
      ...formValues,
      orgId: newValue ? newValue.id : '',
    });
  };

  const handleAccessChange = (event, newValue) => {
    setSelectedAccess(newValue);
    setFormValues({
      ...formValues,
      accessLevel: newValue ? newValue.id : '',
    });
  };

  const isButtonDisabled = !(
    formValues.orgId &&
    formValues.accessLevel &&
    formValues.username &&
    formValues.password
  );

  return (
    <div className="formContainer">
      <div className="imageContainer">
        <img src={createUserImage} alt="admin" />
      </div>
      <div className="form" style={{ marginTop: '-2px' }}>
        <form onSubmit={handleSubmit}>
          <Grid container>
            <Grid item width={'50%'} padding={'5px'}>
              <Autocomplete
                options={orgOptions}
                getOptionLabel={(option) => option?.label}
                value={selectedOrg}
                onChange={handleOrgChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="orgId"
                    label="Organization Name*"
                    sx={{
                      label: {
                        fontSize: '19px',
                      },
                      input: {
                        fontSize: '19px',
                      },
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item width={'50%'} padding={'5px'}>
              <Autocomplete
                options={[
                  { id: 'superuser', label: 'Super User' },
                  { id: 'user', label: 'User' },
                ]}
                getOptionLabel={(option) => option?.label}
                value={selectedAccess}
                disabled={formValues.orgId.length <= 0}
                onChange={handleAccessChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="accessLevel"
                    label="Access Level*"
                    sx={{
                      label: {
                        fontSize: '19px',
                      },
                      input: {
                        fontSize: '19px',
                        cursor: formValues.orgId.length <= 0 ? 'not-allowed' : 'auto',
                      },
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item sx={{ width: '50%' }}>
              <TextField
                className="textFieldUser"
                id="username"
                name="username"
                label="Username*"
                value={formValues.username}
                onChange={handleChange}
                margin="normal"
                disabled={formValues.orgId === ''}
                inputProps={{
                  style: {
                    fontSize: '19px',
                    cursor: formValues.orgId.length <= 0 ? 'not-allowed' : 'auto',
                  },
                }}
                InputLabelProps={{ style: { fontSize: '19px' } }}
              />
            </Grid>
            <Grid item sx={{ width: '50%' }}>
              <TextField
                className="textFieldUser"
                id="password"
                name="password"
                label="Password*"
                type="password"
                disabled={formValues.username.length <= 0}
                value={formValues.password}
                onChange={handleChange}
                margin="normal"
                inputProps={{
                  style: {
                    fontSize: '19px',
                    cursor: formValues.username.length <= 0 ? 'not-allowed' : 'auto',
                  },
                }}
                InputLabelProps={{ style: { fontSize: '19px' } }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs={12}>
              <FormControlLabel
                className="formControlLabel"
                control={
                  <Checkbox
                    id="admin"
                    name="Admin"
                    checked={formValues.Admin}
                    onChange={handleChange}
                  />
                }
                label="Admin"
              />
              <FormControlLabel
                className="formControlLabel"
                control={
                  <Checkbox
                    id="ranker"
                    name="Ranker"
                    checked={formValues.Ranker}
                    onChange={handleChange}
                  />
                }
                label="Ranker"
              />
              <FormControlLabel
                className="formControlLabel"
                control={
                  <Checkbox
                    id="parser"
                    name="Parser"
                    checked={formValues.Parser}
                    onChange={handleChange}
                  />
                }
                label="Parser"
              />
            </Grid>
          </Grid>
          <Grid item className="submitButtonContainer">
            <Button
              className="submitButton"
              height={'40px'}
              variant="outlined"
              type="submit"
              disabled={isButtonDisabled}
            >
              Create User
            </Button>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default Userform;
