import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { Autocomplete, Box, Grid } from '@mui/material';
import { agencyImage } from 'src/assets/images';
import './AgencyForm.css';
import axios from 'axios';

const initialFormValues = {
  orgId: '',
  agencyName: '',
  agencyEmail: '',
};

const Agencyform = () => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [orgOptions, setOrgOptions] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const url = `${import.meta.env.VITE_API_KEY}`;

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
    formData.append('Org_id', formValues.orgId);
    formData.append('Agency_name', formValues.agencyName);
    formData.append('Agency_email', formValues.agencyEmail);

    axios
      .post(`${url}insert_agency`, formData)
      .then((response) => {
        toast.success(response?.data?.message);
        setSelectedOrg(null);
        setFormValues(initialFormValues);
      })
      .catch((error) => {
        setSelectedOrg(null);
        setFormValues(initialFormValues);
        toast.error(error?.response?.data?.message);
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
            className="textFieldAgency"
            renderInput={(params) => (
              <TextField
                {...params}
                name="orgId"
                label="Organization Name"
                required
                sx={{ label: { fontSize: '19px' }, input: { fontSize: '19px' } }}
              />
            )}
          />
          <Grid container>
            <Grid item>
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
                inputProps={{
                  style: {
                    fontSize: '19px',
                    cursor: formValues.orgId.length <= 0 ? 'not-allowed' : 'auto',
                  },
                }}
                InputLabelProps={{ style: { fontSize: '19px' } }}
              />
            </Grid>
            <Grid item>
              <TextField
                id="agencyEmail"
                name="agencyEmail"
                label="Agency Identifier"
                required
                value={formValues.agencyEmail}
                onChange={handleChange}
                disabled={!formValues.agencyName}
                className="textFieldAgency"
                inputProps={{
                  style: {
                    fontSize: '19px',
                    cursor: formValues.orgId.length <= 0 ? 'not-allowed' : 'auto',
                  },
                }}
                InputLabelProps={{ style: { fontSize: '19px' } }}
              />
            </Grid>
          </Grid>
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
