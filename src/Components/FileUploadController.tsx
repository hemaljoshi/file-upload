import React, { Component } from 'react';
import FileUpload from './FileUpload';
import UploadService from '../Services/upload-files.service';

interface MyState {
  selectedFiles: any[];
  progressInfos: any[];
  message: any[];
  open: boolean;
}

export default class FileUploadController extends Component<{}, MyState> {
  constructor(props: any) {
    super(props);

    this.state = {
      selectedFiles: [],
      progressInfos: [],
      message: [],
      open: false,
    };
  }

  handleClick = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({
      open: false,
    });
  };
  selectFile = (event: any) => {
    this.setState({
      progressInfos: [],
      selectedFiles: event.target.files,
    });
  };
  upload = (idx: number, file: any) => {
    let _progressInfos = [...this.state.progressInfos];
    UploadService.upload(file, (event: any) => {
      _progressInfos[idx].percentage = Math.round(
        (100 * event.loaded) / event.total
      );
      this.setState({
        progressInfos: _progressInfos,
      });
    })
      .then((response) => {
        this.setState((prev) => {
          let nextMessage = [
            ...prev.message,
            'Uploaded the file successfully: ' + response.data.msg[0].filename,
          ];
          return {
            message: nextMessage,
            selectedFiles: [],
            // progressInfos: [],
          };
        });
      })
      .catch(() => {
        _progressInfos[idx].percentage = 0;
        this.setState((prev) => {
          let nextMessage = [
            ...prev.message,
            'Could not upload the file: ' + file.name,
          ];
          return {
            progressInfos: _progressInfos,
            message: nextMessage,
          };
        });
      });
  };
  openAlert = () => {
    return true;
  };
  uploadFiles = () => {
    const selectedFiles = this.state.selectedFiles;
    let _progressInfos = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      _progressInfos.push({ percentage: 0, fileName: selectedFiles[i].name });
    }
    this.setState(
      {
        progressInfos: _progressInfos,
        message: [],
      },
      () => {
        for (let i = 0; i < selectedFiles.length; i++) {
          this.upload(i, selectedFiles[i]);
          this.handleClick();
        }
      }
    );
  };

  onDrop = (files: any) => {
    if (files.length > 0) {
      this.setState({
        progressInfos: [],
        selectedFiles: files,
      });
    }
  };
  render() {
    const { selectedFiles, progressInfos, message, open } = this.state;
    const selectFile = this.selectFile;
    const uploadFiles = this.uploadFiles;
    const handleClose = this.handleClose;
    const onDrop = this.onDrop;
    const fileUploadProps = {
      selectFile,
      uploadFiles,
      selectedFiles,
      progressInfos,
      message,
      handleClose,
      open,
      onDrop,
    };
    return <FileUpload {...fileUploadProps} />;
  }
}
