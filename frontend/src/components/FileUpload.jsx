import axios from 'axios';

const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post('http://localhost:80/p4runtime/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

export default function FileUpload() {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    uploadFile(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
}
