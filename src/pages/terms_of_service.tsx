import type { NextPage } from 'next';
import Head from 'src/components/Head';
import { Box, Container, Divider } from '@mui/material';
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


const TermsOfService: NextPage = () => {
  const [numPages, setNumPages] = useState<number | undefined>(undefined);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <Container maxWidth="xl">
      <Head title="Terms of Service | icari" description="Terms of service" />

      <div id="blue-ellipse" />

      <main>
        <Box width="max-content" mt={12} mb={2} mx="auto">
          <Document file="/Terms-Of-Use-2022_22_12.pdf" onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (el, index) => (
              <>
                <Page key={`page_${index + 1}`} pageNumber={index + 1} scale={1.5}/>
                <Divider />
              </>
            ))}
          </Document>
        </Box>
      </main>

    </Container>
  );
};

export default TermsOfService;
