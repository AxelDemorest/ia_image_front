import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const ImageUploader = ({ onUpload }) => {
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false); // Ajout d'un état pour le contrôle du chargement

    const beforeUpload = (file) => {
        return false; // Pour ne pas uploader automatiquement
    };

    const handlePreview = async file => {
        // S'il y a un fichier et FileReader est disponible
        if (file && FileReader) {
            const reader = new FileReader();
            reader.onload = e => {
                file.preview = e.target.result; // Ajouter une propriété de preview à l'objet fichier
                setFileList([...fileList]); // Mettre à jour le fileList pour forcer le re-render
            };
            reader.readAsDataURL(file.originFileObj);
        }
    };

    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        fileList.forEach(file => {
            formData.append('files', file.originFileObj);
        });

        setUploading(true); // Commencer le chargement

        try {
            const response = await axios.post('http://127.0.0.1:5000/predict-multiple', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response);
            onUpload(response.data);
            message.success('Images uploaded successfully!');
        } catch (error) {
            console.error('Upload failed:', error);
            message.error('Upload failed. Please try again.');
        }

        setUploading(false); // Terminer le chargement
        setFileList([]); // Vider la liste après le chargement
    };

    return (
        <div>
            <Upload
                beforeUpload={beforeUpload}
                onPreview={handlePreview}
                onChange={handleChange}
                fileList={fileList}
                listType="picture-card"
                multiple={true} // Permettre la sélection de fichiers multiples
            >
                {fileList.length >= 8 ? null : (
                    <div>
                        <UploadOutlined /> Importer
                    </div>
                )}
            </Upload>
            <Button
                type="primary"
                onClick={handleUpload}
                disabled={fileList.length === 0}
                loading={uploading}
                style={{ marginTop: 16, width: '100%' }}
            >
                Upload
            </Button>
        </div>
    );
};

export default ImageUploader;
