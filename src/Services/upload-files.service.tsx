import http from '../http-common';
class UploadFilesService {
  upload = async (file: any, onUploadProgress: any) => {
    const temp: any = [];
    temp.push(file);
    let formData = new FormData();
    formData.append('filesList', file);
    const response = await http.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });
    return response;
  };
}
export default new UploadFilesService();
