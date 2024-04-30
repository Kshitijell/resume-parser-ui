import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
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
import { parserBackground } from 'src/assets/images';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
  const [resumeCount, setResumeCount] = useState('')
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
          const res = await axios.post('http://52.207.190.181:5000/upload', formData);
          if (res.data) {
            const resData = res.data.data;
            toast.success('Resume Ranked!');
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
      const res = await axios.post('http://52.207.190.181:5000/recommend');
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
    setTableLoading(true)
    const formData = new FormData();
    setResumeCount(files.length)
    files.forEach((element) => {
      formData.append('file', element);
      formData.append('requisitionId', requisitionId)
    });

    if (files.length > 0) {
      setUploadResume(true);
      try {
        const res = await axios.post('http://52.207.190.181:5000//upload_resume', formData);
        if (res) {
          setTableLoading(false)
          toast.success('Resume Uploaded.');
        }
      } catch (error) {
        setTableLoading(false)
        console.error('Error uploading file:', error);
        toast.error('Something went wrong.');
      } finally {
        setTableLoading(false)
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
        height: '-webkit-fill-available',
        backgroundImage: `url(${parserBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        padding: '3% 20%',
      }}
    >
      <Box
        sx={{
          height: 'auto',
          borderRadius: '11px',
          borderradius: '11px',
          // opacity: '0.11',
          background: 'rgba(246, 248, 253, 0.65)',
          boxShadow: ' 0px 4px 34.3px 2px rgba(30, 45, 87, 0.24)',
          display: 'flex',
          padding: '20px',
          justifyContent: "space-evenly",
        }}
      >
        <Card sx={{ width: '100%' }}>
          <div style={{ marginTop: '10px' }}>
            <IconButton onClick={() => navigate('/home')} aria-label="back" title='Back to selection'>
              <ArrowBackIcon />
            </IconButton>
          </div>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 0.5,
              paddingTop: '0px',
              paddingBottom: '0px'
            }}
          >

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
                  sx={{
                    padding: '5px',
                    '& .MuiTypography-root': {
                      fontSize: '18px',
                    }
                  }}
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
                  sx={{
                    padding: '5px',
                    '& .MuiTypography-root': {
                      fontSize: '18px',
                    }
                  }}
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
            <CustomAutoFetchComplete
              sx={{ width: '30%' }}
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



            {/* <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: 2 }}> */}
            <Grid container sx={selectedOption !== 'new' ? { display: 'flex', justifyContent: 'space-around', gap: 2 } : {}}>
              {selectedOption === 'new' && (
                <Grid item sx={{ width: '50%' }}>
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
                </Grid>
              )}
              <Grid item sx={{ width: '50%' }}>
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
                  resumeCount={resumeCount}
                />
              </Grid>
            </Grid>

            <Button

              sx={{ fontSize: '1.2rem', width: '20%', marginLeft: 'auto' }}
              startIcon={tableLoading ? <CircularProgress size={15} /> : null}
              variant="contained"
              onClick={handleSubmit}
              disabled={tableLoading || uploadResume}
            >
              Rank Resume(s)
            </Button>
            {resumeCount !== '' && resumeCount !== undefined ? <Grid item sx={{ marginLeft: 'auto' }}>< Typography variant='h5' color='#3ec0b5' sx={{ padding: 1, }}> {`${resumeCount} Resume(s) uploaded`}</Typography> </Grid> : null}
            {formError && <div className="error-message">{formError}</div>}
          </CardContent>
        </Card>
      </Box>
    </Box >
  );
}

export default ResumeParser;