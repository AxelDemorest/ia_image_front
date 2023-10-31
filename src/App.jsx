import React, { useState } from 'react';
import styled from 'styled-components';
import ImageUploader from './ImageUploader';

const App = () => {
    const [uploadResult, setUploadResult] = useState(null);

    const handleUpload = (data) => {
        setUploadResult(data);
    };

    return (
        <Container className="layout">
            <ImportArea>
                <Title>
                    Importer une image
                </Title>
                <div style={{ padding: '0 50px', display: 'flex', justifyContent: 'flex-start' }}>
                    <div>
                        <ImageUploader onUpload={handleUpload} />
                        {uploadResult &&
                            uploadResult.map((result, index) => (
                                <Result key={index}>
                                    <p>Image {index + 1} - Prédiction : {result.prediction === 'street_art' ? 'Street Art' : 'Pas du Street Art'} | Fiabilité {(result.probability * 100).toFixed(2)}%</p>
                                </Result>
                            ))
                        }
                    </div>
                </div>
            </ImportArea>
        </Container>
    );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImportArea = styled.div`
  width: 40%;
  border: 3px dashed #58aed3;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0;
`;

const Title = styled.h1`
  color: #242424;
  margin-top: 0;
  font-size: 2.5rem;
`;

const Result = styled.div`
  p {
    color: #242424;
  }
`;

export default App;
