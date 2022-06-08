import { Grid, Typography, Button, Box, Snackbar, Stack } from '@mui/material';
import LinearProgress, {
  LinearProgressProps,
} from '@mui/material/LinearProgress';
import React, { Component } from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Dropzone from 'react-dropzone';

const uploadBoxStyle = {
  border: '2px solid #bebebe',
  p: 4,
  borderRadius: 2,
  cursor: 'pointer',
};
const uploadBoxHeadingStyle = {
  color: '#7e7e7e',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  mb: 3,
};
const uploadBoxFileTextStyle = {
  color: '#585858',
  lineHeight: '1.5rem',
  whiteSpace: 'pre',
  opacity: 0.9,
};
const uploadButtonBoxStyle = { textAlign: 'center', my: 2 };

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant='determinate' {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant='body2' color='text.secondary'>{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return (
    <MuiAlert
      elevation={6}
      ref={ref}
      variant='filled'
      {...props}
      sx={{ alignItems: 'center' }}
    />
  );
});

interface props {
  selectFile: (event: any) => void;
  onDrop: (files: any) => void;
  selectedFiles: any[];
  progressInfos: any[];
  message: any[];
  uploadFiles: () => void;
  handleClose: (
    event?: Event | React.SyntheticEvent<Element, Event> | undefined,
    reason?: string | undefined
  ) => void;
  open: boolean;
}

export default class FileUpload extends Component<props> {
  inputRef: React.RefObject<HTMLInputElement> = React.createRef();
  handleClick = () => {
    this.inputRef.current?.click();
  };
  render() {
    const {
      progressInfos,
      message,
      selectFile,
      selectedFiles,
      uploadFiles,
      open,
      onDrop,
      handleClose,
    } = this.props;
    return (
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
        minHeight='90vh'
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item lg={4} sm={4} md={4} xs={4}>
          <Dropzone onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
              <Box
                sx={uploadBoxStyle}
                onClick={this.handleClick}
                {...getRootProps({ className: 'dropzone' })}
              >
                <Box sx={uploadBoxHeadingStyle}>
                  <CloudUploadIcon sx={{ mr: 1 }} />
                  {selectedFiles.length !== 0 ? (
                    <Typography variant='h5'>Selected Files are</Typography>
                  ) : (
                    <Typography variant='h5'>
                      Drag & Drop / Click to Upload files
                    </Typography>
                  )}
                </Box>
                <input
                  type='file'
                  multiple
                  onChange={selectFile}
                  ref={this.inputRef}
                  style={{ display: 'none' }}
                  {...getInputProps()}
                />
                {selectedFiles.length !== 0 && (
                  <Stack
                    direction='column'
                    justifyContent='center'
                    alignItems='center'
                    spacing={1}
                  >
                    {selectedFiles.length !== 0 &&
                      Object.keys(selectedFiles).map(
                        (key: any, index: number) => (
                          <Typography
                            variant='subtitle1'
                            sx={uploadBoxFileTextStyle}
                            key={index}
                          >
                            {selectedFiles[key].name}
                          </Typography>
                        )
                      )}
                  </Stack>
                )}
                {progressInfos &&
                  progressInfos.map((progressInfo, index) => (
                    <React.Fragment key={index}>
                      <Typography
                        variant='subtitle1'
                        sx={uploadBoxFileTextStyle}
                      >
                        {progressInfo.fileName}
                      </Typography>
                      <LinearProgressWithLabel
                        value={progressInfo.percentage}
                      />
                    </React.Fragment>
                  ))}
              </Box>
            )}
          </Dropzone>
          <Box sx={uploadButtonBoxStyle}>
            <Button
              variant='contained'
              disabled={selectedFiles.length === 0}
              onClick={uploadFiles}
            >
              Upload
            </Button>
          </Box>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity='success'
              sx={{ width: '100%' }}
            >
              {message.map((msg: any, index: number) => (
                <Box key={index}>{msg}</Box>
              ))}
            </Alert>
          </Snackbar>
        </Grid>
      </Grid>
    );
  }
}
