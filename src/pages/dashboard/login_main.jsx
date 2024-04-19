import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Iconify from 'src/components/iconify';
import { Upload } from 'src/components/upload';
import './login_main.css';
import CustomAutoFetchComplete from 'src/components/custom-autocomplete/custom-auto-fetch-complete';

const validationSchema = Yup.object({
  inputValue: Yup.string().required('Please enter/select a requisition id.'),
});

function ResumeParser() {
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [open, setOpen] = useState(false);
  const [reqIds, setReqIds] = useState([]);
  const [initialIds, setInitialReqIds] = useState([]);
  const [requisitionId, setRequisitionId] = useState('');
  const [uploadResume, setUploadResume] = useState(false);
  const [formError, setFormError] = useState(null);
  const [tableLoading, setTableLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState('new');
  const loading = open && reqIds.length === 0;

  const handleFileUpload = (files) => {
    setFormError(null)
    setUploadedFiles([files[0]]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate({ inputValue: requisitionId }, { abortEarly: false });
      if (requisitionId.length === 0) {
        setFormError('Please provide a requisition ID.');
      } else if (!uploadedFiles?.length && selectedOption === 'new') {
        setFormError('Please upload a JD.');
      } else {
        setTableLoading(true);
        const formData = new FormData();
        formData.append('rec_id', requisitionId);
        if (selectedOption === 'new') {
          formData.append('file', uploadedFiles[0]);
        }

        try {
          const res = await axios.post('http://52.1.28.231:5000/upload', formData);
          if (res.data) {
            const resData = res.data.data;
            toast.success('JD Uploaded.');
            navigate('/table', { state: resData });
            setFormError(null);
            setUploadedFiles([]);
            setRequisitionId('');
          }
        } catch (error) {
          console.error('Error uploading file:', error);
          toast.error('Something went wrong.');
        } finally {
          setTableLoading(false);

        }
      }
    } catch (validationError) {
      setFormError(validationError.errors[0]);
    }
  };
  const fetchReqIds = async () => {
    try {
      const res = await axios.post('http://52.1.28.231:5000/recommend');
      if (res.data) {
        const resData = res.data.data;
        setInitialReqIds(resData);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  const handleRemoveFile = () => {
    setUploadedFiles([]);
  };

  const isOptionEqualToValue = (option, value) => option === value;

  const handleEnter = async () => {
    try {
      await validationSchema.validate({ inputValue: requisitionId }, { abortEarly: false });

      if (!reqIds.some((option) => isOptionEqualToValue(option, requisitionId))) {
        if (selectedOption !== 'new') {
          setRequisitionId(null);
          return;
        }
        const newOptions = [...initialIds, requisitionId];
        setReqIds(newOptions);
      }
    } catch (validationError) {
      setFormError(validationError.errors[0]);
    }
  };

  const handleFileChange = async (files) => {
    const formData = new FormData();
    files.forEach((element) => {
      formData.append('file', element);
    });

    if (files.length > 0) {
      setUploadResume(true);
      try {
        const res = await axios.post('http://52.1.28.231:5000//upload_resume', formData);
        if (res) {
          toast.success('Resume Uploaded.');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        toast.error('Something went wrong.');
      } finally {
        setUploadResume(false);
      }
    }
  };
  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    if (active) {
      fetchReqIds();
    }

    return () => {
      active = false;
    };
  }, [loading]);

  const handleInputChange = (event, newInputValue) => {
    event?.preventDefault();
    setRequisitionId(newInputValue);
    setFormError('');
  };
  useEffect(() => {
    if (!open) {
      setInitialReqIds([]);
    }
  }, [open]);
  useEffect(() => {
    setReqIds(initialIds);
  }, [initialIds]);
  useEffect(() => {
    setRequisitionId(null);
    setFormError('');
    setReqIds([]);
    setInitialReqIds([]);
  }, [selectedOption]);
  const handleRadioButtonChange = (e) => {
    setRequisitionId(null);
    setSelectedOption(e.target.value);
  };
  return (
    <Box
      sx={{
        height: '100%',
        width: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        sx={{
          width: '90%',
          borderRadius: '30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          height: '90%'
        }}
      >
        <CardContent
          sx={{
            width: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Box display="flex" flexDirection="row" gap={3}>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-form-control-label-placement"
                name="position"
                defaultValue="new"
                sx={{
                  '& .MuiFormControlLabel-label': {
                    fontSize: '16px',
                  },
                }}
                onChange={handleRadioButtonChange}
              >
                <FormControlLabel
                  value="new"
                  control={
                    <Radio
                      icon={<Iconify icon="system-uicons:checkbox-empty" height={25} width={25} />}
                      checkedIcon={<Iconify icon="ci:checkbox-check" height={25} width={25} />}
                    />
                  }
                  label="New Requisition"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="existing"
                  control={
                    <Radio
                      icon={<Iconify icon="system-uicons:checkbox-empty" height={25} width={25} />}
                      checkedIcon={<Iconify icon="ci:checkbox-check" height={25} width={25} />}
                    />
                  }
                  label="Existing Requisition"
                  labelPlacement="end"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box display="flex" flexDirection="column" sx={{ width: '200px' }} gap={1}>
            <CustomAutoFetchComplete
              options={reqIds}
              autoCompleteProps={{
                open,
                onOpen: () => {
                  setOpen(true);
                },
                onClose: () => {
                  setOpen(false);
                },
                value: requisitionId,
                onInputChange: handleInputChange,
                onKeyDown: (e) => handleEnter(),
                getOptionLabel: (option) => option,
                isOptionEqualToValue: (option, value) => option === value,
                loading,
              }}
              inputProps={{
                label: 'Requisition ID*',
                name: 'req_id',
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: 2 }}>
            {selectedOption === 'new' && (
              <Upload
                label="Upload JD"
                multiple
                files={uploadedFiles}
                accept={{
                  'application/pdf': ['.docx'],
                }}
                onDrop={handleFileUpload}
                onRemove={handleRemoveFile}
                isDirectUploadFile
              />
            )}
            <Upload
              multiple
              label="Upload Resume"
              files={[]}
              accept={{
                'application/pdf': ['.docx'],
              }}
              onDrop={handleFileChange}
              disabled={uploadResume}
              isDirectUploadFile
            />
          </Box>
          {formError && <div className="error-message">{formError}</div>}
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button
              startIcon={tableLoading ? <CircularProgress size={15} /> : null}
              variant="contained"
              color="secondary"
              onClick={handleSubmit}
              disabled={tableLoading || uploadResume}
            >
              Recommend Best Candidate
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ResumeParser;
