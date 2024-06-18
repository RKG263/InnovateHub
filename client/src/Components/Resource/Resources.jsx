import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Typography, Grid, Box, TextField } from '@mui/material';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Resources = () => {
    const [resources, setResources] = useState([]);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/v1/resource/Resources", {
                    withCredentials: true,
                });
                setResources(response.data.resources || []);
            } catch (error) {
                console.error('Error fetching resources:', error);
            }
        };

        fetchResources();
    }, []);

    const handleDownload = async (fileName, fileUrl) => {
        if (fileName && fileUrl) {
            try {
                // Fetch the video file as Blob
                const response = await axios.get(fileUrl, {
                    responseType: 'blob',
                });

                // Create a Blob object
                const blob = new Blob([response.data], { type: response.headers['content-type'] });

                // Create a temporary URL (Blob URL)
                const url = window.URL.createObjectURL(blob);

                // Create a temporary anchor element
                const link = document.createElement('a');
                link.href = url;
                link.download = fileName;

                // Append the anchor element to the body
                document.body.appendChild(link);

                // Trigger the click event on the anchor element
                link.click();

                // Clean up: remove the anchor element and revoke the Blob URL
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            } catch (error) {
                console.error('Error downloading video:', error);
            }
        }
    };

    const pdfResources = resources.filter(element => element.pdfUrl);
    const videoResources = resources.filter(element => element.videoUrl);

   
    let displayPdfResources = pdfResources.length > 0 && (videoResources.length === 0 || (pdfResources.length > 0 && videoResources.length > 0));
    let displayVideoResources = videoResources.length > 0 && (pdfResources.length === 0 || (pdfResources.length > 0 && videoResources.length > 0));

    return (
        <>
        
        <Header/>
        <Container>
        <Box bgcolor="#f0f0f0" p={3} mt={3} borderRadius={8}>
            <Typography variant="h5" gutterBottom style={{ textAlign: 'center', fontWeight: 'bold', color: 'blue' }}>
                AVAILABLE RESOURCES
            </Typography>

            {pdfResources.length === 0 && (
                    <Grid item xs={12}>
                        <Typography variant="body1" style={{ textAlign: 'center' }}>No PDF resources available.</Typography>
                    </Grid>
                )}

            {/* Display resources in a grid */}
            <Grid container spacing={3}>
                {/* PDF Resources */}
                {pdfResources.length > 0 && (
                    <Grid item xs={12} md={6}>
                        <Box bgcolor="#ffffff" p={2} borderRadius={6} boxShadow={3}>
                            <Typography variant="h6" style={{ textAlign: 'center', color: 'blue', marginBottom: '10px' }}>PDF Resources</Typography>
                            {pdfResources.map((element, index) => (
                                <Box key={element._id} bgcolor="#e0f2f1" p={2} mb={2} borderRadius={6}>
                                    <Typography variant="subtitle1" style={{ color: 'blue' }}>{`Resource ${index + 1}`}</Typography>
                                    <Typography variant="h6" style={{ color: 'blue', borderBottom: '1px solid #ccc', marginBottom: '5px' }}>{element.pdfTitle}</Typography>
                                    <Typography variant="body2" style={{ backgroundColor: '#dbdbdb', padding: '5px', marginBottom: '10px' }}>{element.pdfDescription}</Typography>
                                    <Box mb={1}>
                                        <Button variant="contained" href={element.pdfUrl} target="_blank" style={{ marginRight: '10px' }}>
                                            View PDF
                                        </Button>
                                    
                                        <Button variant="contained" onClick={() => handleDownload(element.pdfFileName, element.pdfUrl)}>
                                            Download PDF
                                        </Button>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Grid>
                )}

                {/* Video Resources */}
                {videoResources.length > 0 && (
                    <Grid item xs={12} md={6}>
                        <Box bgcolor="#ffffff" p={2} borderRadius={6} boxShadow={3}>
                            <Typography variant="h6" style={{ textAlign: 'center', color: 'blue', marginBottom: '10px' }}>Video Resources</Typography>
                            {videoResources.map((element, index) => (
                                <Box key={element._id} bgcolor="#e0f2f1" p={2} mb={2} borderRadius={6}>
                                    <Typography variant="subtitle1" style={{ color: 'blue' }}>{`Resource ${index + 1}`}</Typography>
                                    <Typography variant="h6" style={{ color: 'blue', borderBottom: '1px solid #ccc', marginBottom: '5px' }}>{element.videoTitle}</Typography>
                                    <Typography variant="body2" style={{ backgroundColor: '#dbdbdb', padding: '5px', marginBottom: '10px' }}>{element.videoDescription}</Typography>
                                    <Box mt={1}>
                                        <Button variant="contained" href={element.videoUrl} target="_blank" style={{ marginRight: '10px' }}>
                                            View Video
                                        </Button>
                                        <Button variant="contained" onClick={() => handleDownload(element.videoFileName, element.videoUrl)}>
                                            Download Video
                                        </Button>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Grid>
                )}

{videoResources.length === 0 && (
                    <Grid item xs={12}>
                        <Typography variant="body1" style={{ textAlign: 'center' }}>No Video resources available.</Typography>
                    </Grid>
                )}


                {/* Display a message if no resources are available */}
                {resources.length === 0 && (
                    <Grid item xs={12}>
                        <Typography variant="body1" style={{ textAlign: 'center' }}>No resources available.</Typography>
                    </Grid>
                )}
            </Grid>
        </Box>
    </Container>
    <Footer/>
        </>
          
        );
    
};

export default Resources;