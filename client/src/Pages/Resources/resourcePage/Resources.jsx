import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Typography, Grid, Box, TextField } from '@mui/material';
import Header from '../../../Components/Header/Header';
import Footer from '../../../Components/Footer/Footer';
import { useDispatch, useSelector } from "react-redux";
const Resources = () => {
    const { isAuthenticated, user, message, error, loading } = useSelector(
        (state) => state.user
      );
    const [resources, setResources] = useState([]);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/v1/resource/Resources", {
                    withCredentials: true,
                });
                setResources(response?.data?.resources );
                console.log(response);
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
            <Header />
            <Container>
               {
                user?.isAdmin &&  <Box display="flex" justifyContent="space-between" alignItems="center" mt={3} mb={2}>
                    <Typography variant="h4" style={{ fontWeight: 'bold', color: '#3f51b5' }}>
                        Available Resources
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        href="/admin-resource-post"
                        style={{
                            backgroundColor: '#3f51b5',
                            color: '#ffffff',
                            fontWeight: 'bold',
                            borderRadius: '8px',
                            padding: '10px 20px',
                            textTransform: 'none',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        }}
                    >
                        Post Resources
                    </Button>
                </Box>
               }
                <Box p={3} bgcolor="#f0f0f0" borderRadius={8}>
                    {pdfResources.length === 0 && videoResources.length === 0 && (
                        <Grid item xs={12}>
                            <Typography variant="body1" style={{ textAlign: 'center' }}>No resources available.</Typography>
                        </Grid>
                    )}

                    <Grid container spacing={4}>
                        {/* PDF Resources */}
                        {pdfResources.length > 0 && (
                            <Grid item xs={12} md={6}>
                                <Box bgcolor="#ffffff" p={3} borderRadius={8} boxShadow={2}>
                                    <Typography variant="h5" style={{ textAlign: 'center', color: '#3f51b5', marginBottom: '15px' }}>PDF Resources</Typography>
                                    {pdfResources.map((element, index) => (
                                        <Box key={element._id} bgcolor="#e0f2f1" p={2} mb={2} borderRadius={6} boxShadow={1}>
                                            <Typography variant="subtitle1" style={{ color: '#3f51b5' }}>{`Resource ${index + 1}`}</Typography>
                                            <Typography variant="h6" style={{ color: '#3f51b5', borderBottom: '1px solid #ccc', marginBottom: '10px' }}>{element.pdfTitle}</Typography>
                                            <Typography variant="body2" style={{ backgroundColor: '#dbdbdb', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>{element.pdfDescription}</Typography>
                                            <Box display="flex" justifyContent="space-between">
                                                <Button variant="contained" color="primary" href={element.pdfUrl} target="_blank">
                                                    View PDF
                                                </Button>
                                                <Button variant="contained" color="secondary" onClick={() => handleDownload(element.pdfFileName, element.pdfUrl)}>
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
                                <Box bgcolor="#ffffff" p={3} borderRadius={8} boxShadow={2}>
                                    <Typography variant="h5" style={{ textAlign: 'center', color: '#3f51b5', marginBottom: '15px' }}>Video Resources</Typography>
                                    {videoResources.map((element, index) => (
                                        <Box key={element._id} bgcolor="#e0f2f1" p={2} mb={2} borderRadius={6} boxShadow={1}>
                                            <Typography variant="subtitle1" style={{ color: '#3f51b5' }}>{`Resource ${index + 1}`}</Typography>
                                            <Typography variant="h6" style={{ color: '#3f51b5', borderBottom: '1px solid #ccc', marginBottom: '10px' }}>{element.videoTitle}</Typography>
                                            <Typography variant="body2" style={{ backgroundColor: '#dbdbdb', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>{element.videoDescription}</Typography>
                                            <Box display="flex" justifyContent="space-between">
                                                <Button variant="contained" color="primary" href={element.videoUrl} target="_blank">
                                                    View Video
                                                </Button>
                                                <Button variant="contained" color="secondary" onClick={() => handleDownload(element.videoFileName, element.videoUrl)}>
                                                    Download Video
                                                </Button>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                            </Grid>
                        )}

                        {/* Display messages if no resources are available */}
                        {pdfResources.length === 0 && (
                            <Grid item xs={12}>
                                <Typography variant="body1" style={{ textAlign: 'center', color: '#999' }}>No PDF resources available.</Typography>
                            </Grid>
                        )}
                        {videoResources.length === 0 && (
                            <Grid item xs={12}>
                                <Typography variant="body1" style={{ textAlign: 'center', color: '#999' }}>No video resources available.</Typography>
                            </Grid>
                        )}
                    </Grid>
                </Box>
            </Container>
            <Footer />
        </>
    );

};

export default Resources;