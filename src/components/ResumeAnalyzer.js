import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  Paper, 
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Alert
} from '@mui/material';
import { UploadFile } from '@mui/icons-material';

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Please upload a PDF file');
      setFile(null);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('resume', file);

      // Replace with your API endpoint
      const response = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to analyze resume');
      }

      const data = await response.json();
      setQuestions(data.questions);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Resume Analyzer
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom align="center" color="text.secondary">
          Generate behavioral interview questions based on your resume
        </Typography>

        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            mt: 4, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            backgroundColor: 'background.paper' 
          }}
        >
          <input
            accept="application/pdf"
            style={{ display: 'none' }}
            id="resume-file"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="resume-file">
            <Button
              variant="outlined"
              component="span"
              startIcon={<UploadFile />}
              sx={{ mb: 2 }}
            >
              Upload Resume (PDF)
            </Button>
          </label>

          {file && (
            <Typography variant="body2" sx={{ mb: 2 }}>
              Selected file: {file.name}
            </Typography>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
              {error}
            </Alert>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!file || loading}
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Analyze Resume'}
          </Button>

          {questions.length > 0 && (
            <Box sx={{ mt: 4, width: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Generated Questions:
              </Typography>
              <List>
                {questions.map((question, index) => (
                  <ListItem key={index}>
                    <ListItemText 
                      primary={`${index + 1}. ${question}`}
                      sx={{
                        '& .MuiListItemText-primary': {
                          fontWeight: 500,
                          color: 'text.primary'
                        }
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default ResumeAnalyzer;
