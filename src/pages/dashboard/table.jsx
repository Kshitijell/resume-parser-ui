import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import Rating from '@mui/material/Rating';
import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import CustomDataTable from './customDataTable';

function TableComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showExport, setShowExport] = useState(false);
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
  const columnData = useMemo(() => {
    if (!dataRows.length) {
      setShowExport(false);
      return [];
    }
    setShowExport(true);
    const col = dataRows[0];
    const colsArray = ['id', 'Id', 'ID', 'Overall', 'overall', 'Name', 'Comments'];
    const colsData = Object.keys(col)
      .filter((c) => !colsArray.includes(c))
      .map((coll) => ({
        accessorKey: coll,
        header: coll,
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
        accessorKey: 'Overall',
        header: 'Overall Rating',
        muiTableHeadCellProps: { align: 'center' },
        size: 200,
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
      {
        accessorKey: 'Comments',
        header: 'Comments',
        muiTableHeadCellProps: { align: 'center' },
        size: 200,
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
    ];
  }, [dataRows]);
  const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
    filename: 'Resume-Parser-Results',
  });

  // const handleExportData = () => {
  //   const data = dataRows.map((ele) => {
  //     const { id, ...other } = ele;
  //     return other;
  //   });
  //   const csv = generateCsv(csvConfig)(data);
  //   download(csvConfig)(csv);
  // };

  const handleExportData = () => {
    const commentsArray = dataRows.map(({ Comments, ...other }) => Comments);
    const data = dataRows.map(({ id, Comments, ...other }) => other);
    data.forEach((item, index) => {
      item.Comments = commentsArray[index];
    });

    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  return (
    <Box sx={{ height: '100%', position: 'relative', width: 1 }}>
      <Box
        sx={{
          height: 'calc(100% - 100px)',
          padding: '50px',
          backgroundSize: '100%',
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
                <Typography variant="h5">List of Recommended Best Candidates</Typography>
                <Grid
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 1,
                  }}
                >
                  {showExport && (
                    <Button
                      sx={{ textTransform: 'none' }}
                      onClick={handleExportData}
                      startIcon={<FileDownloadIcon />}
                    >
                      Export To CSV
                    </Button>
                  )}
                  <Button
                    sx={{ textTransform: 'none' }}
                    variant="contained"
                    onClick={() => {
                      navigate('/parser');
                    }}
                  >
                    Back
                  </Button>
                </Grid>
              </Box>
              <CustomDataTable
                columns={columnData}
                rowData={dataRows}
                hideFooter={dataRows?.length > 4}
                showExport={showExport}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default TableComponent;
