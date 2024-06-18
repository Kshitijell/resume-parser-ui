import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { Box } from '@mui/material';
import { organizationImage } from 'src/assets/images';
import './OrganizationForm.css';
import axios from 'axios';

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
    const url = `${import.meta.env.VITE_API_KEY}insert_organization`;
    const formData = new FormData();
    formData.append('Org_id', formValues.orgId);
    formData.append('API_KEY', formValues.apiKey);
    formData.append('Org_name', formValues.orgName);

    axios
      .post(url, formData)
      .then((response) => {
        setFormValues(initialFormValues);
        toast.success(response?.data?.message);
      })
      .catch((error) => {
        setFormValues(initialFormValues);
        toast.error(error?.response?.data?.message);
      });
  };

  const isButtonDisabled = !(formValues.orgName && formValues.apiKey);

  return (
    <div className="formContainer">
      <div className="imageContainer">
        <img src={organizationImage} alt="admin" style={{ maxWidth: '100%' }} />
      </div>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="orgName"
            name="orgName"
            label="Organization Name*"
            value={formValues?.orgName}
            onChange={handleChange}
            margin="normal"
            className="textFieldOrg"
            inputProps={{ style: { fontSize: 19 } }}
            InputLabelProps={{ style: { fontSize: 19 } }}
          />
          <TextField
            fullWidth
            id="apiKey"
            name="apiKey"
            label="API Key*"
            value={formValues?.apiKey}
            onChange={handleChange}
            margin="normal"
            disabled={formValues?.orgName.length <= 0}
            className="textFieldOrg"
            inputProps={{
              style: {
                fontSize: 19,
                cursor: formValues?.orgName.length <= 0 ? 'not-allowed' : 'auto',
              },
            }}
            InputLabelProps={{ style: { fontSize: 19 } }}
          />
          <Box className="submitButtonContainer">
            <Button
              variant="outlined"
              type="submit"
              disabled={isButtonDisabled}
              className="submitButton"
            >
              Create Organization
            </Button>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default Organizationform;
