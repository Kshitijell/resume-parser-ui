import React, { useMemo, useState } from 'react';
import * as XLSX from 'xlsx';
import { Box, Button, Card, CardContent, Grid, Typography, TextField, IconButton } from '@mui/material';
import Rating from '@mui/material/Rating';
import { useLocation, useNavigate } from 'react-router-dom';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import CustomDataTable from './customDataTable';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { tableBackground } from 'src/assets/images';

function TableComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showExport, setShowExport] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const dataRows = useMemo(() => {
    if (location.state) {
      const resultArr = location.state.map((ele) => {
        const { Name, Overall, ...rest } = ele;
        return { Name, Overall, ...rest };
      });
      return resultArr;
    }
    return [];
  }, [location.state]);

  // Filter dataRows based on searchTerm
  const filteredRows = useMemo(() => {
    if (searchTerm === '') {
      return dataRows;
    }
    return dataRows.filter(row =>
      row.Comments.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [dataRows, searchTerm]);

  const columnData = useMemo(() => {
    if (!filteredRows.length) {
      setShowExport(false);
      return [];
    }
    setShowExport(true);
    const col = filteredRows[0];
    const colsArray = ['Comments', 'id', 'Id', 'ID', 'Overall', 'overall', 'Name'];
    const colsData = Object.keys(col)
      .filter((c) => !colsArray.includes(c))
      .map((coll) => ({
        accessorKey: coll,
        header: `${coll}/ 5`,
        muiTableHeadCellProps: { align: 'center' },
        muiTableBodyCellProps: { align: 'center' },
      }));

    return [
      {
        accessorKey: 'Name',
        header: 'Name',
        muiTableHeadCellProps: { align: 'center' },
      },
      {
        accessorKey: 'Comments',
        header: 'Comments',
        muiTableHeadCellProps: { align: 'center' },
        size: 350,
        Cell: (params) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              muiTableHeadCellProps: { align: 'center' },
              muiTableBodyCellProps: { align: 'center' },
            }}
          >
            <Typography sx={{ whiteSpace: 'pre-wrap', maxHeight: '100px', overflowY: 'auto' }}>
              {params?.row?.original.Comments}
            </Typography>
          </Box>
        ),
      },
      {
        accessorKey: 'Overall',
        header: 'Overall Rating',
        muiTableHeadCellProps: { align: 'center' },
        size: 175,
        Cell: (params) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              muiTableHeadCellProps: {
                align: 'center',
              },
              muiTableBodyCellProps: {
                align: 'center',
              },
            }}
          >
            <Rating
              name="overall-rating"
              value={Number(params?.row?.original?.Overall ?? 0)}
              max={5}
              readOnly
            />
            <Typography>
              (
              {params?.row?.original?.Overall === 0 ? 0 : params?.row?.original?.Overall.toFixed(2)}
              )
            </Typography>
          </Box>
        ),
      },
      ...colsData,
    ];
  }, [filteredRows]);

  const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
    filename: 'Resume-Parser-Results',
  });

  // const handleExportData = () => {
  //   const commentsArray = filteredRows.map(({ Comments, ...other }) => Comments);
  //   const data = filteredRows.map(({ id, Comments, ...other }) => other);
  //   data.forEach((item, index) => {
  //     item.Comments = commentsArray[index];
  //   });

  //   const csv = generateCsv(csvConfig)(data);
  //   download(csvConfig)(csv);
  // };

  const handleExportData = () => {

    const data = filteredRows.map(({ Comments, id, ...other }) => ({
      ...other,
      Comments,
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const excelURL = window.URL.createObjectURL(excelBlob);
    const link = document.createElement('a');
    link.href = excelURL;
    link.setAttribute('download', 'Ranked-Resume(s).xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box sx={{ height: '100%', position: 'relative', width: 1, height: '-webkit-fill-available' }}>
      <Box
        sx={{
          height: '100%',
          padding: '50px',
          backgroundSize: '100%',
          backgroundImage: `url(${tableBackground})`
        }}
      >
        <Card>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 2,
                }}
              >
                <IconButton onClick={() => navigate('/ranker')} aria-label="back" title='Back to Ranker'>
                  <ArrowBackIcon />
                </IconButton>
                <Typography variant="h5">List of Recommended Best Candidates</Typography>
                <Grid
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 1,
                  }}
                >
                  <TextField
                    label="Search Comments"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {showExport && (
                    <Button
                      sx={{ textTransform: 'none' }}
                      onClick={handleExportData}
                      startIcon={<FileDownloadIcon />}
                    >
                      Export To Excel
                    </Button>
                  )}
                </Grid>
              </Box>
              <CustomDataTable
                columns={columnData}
                rowData={filteredRows}
                hideFooter={filteredRows?.length > 4}
                showExport={showExport}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box >
  );
}

export default TableComponent;
