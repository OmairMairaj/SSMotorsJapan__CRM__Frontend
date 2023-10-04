// import React from 'react';
// import Modal from 'react-modal';

// // Define modal styles (you can customize these styles)
// const modalStyles = {
//   content: {
//     width: '80%',
//     height: '80%',
//     margin: 'auto',
//   },
// };

// const PdfPreviewDialog = ({ invoiceData, onSaveAndFinish, onClose }) => {
//     console.log(invoiceData)
//   return (
//     <Modal
//       isOpen={true} // Set to true to show the dialog
//       style={modalStyles}
//       onRequestClose={onClose}
//     >
//       <div>
//         {/* Display the PDF preview */}
//         <iframe
//           title="PDF Preview"
//           src={`data:application/pdf;base64,${invoiceData}`}
//           width="100%"
//           height="100%"
//         ></iframe>

//         {/* Download button */}
//         <button
//           onClick={() => {
//             // Create a blob URL for downloading the PDF
//             const blob = new Blob([invoiceData], { type: 'application/pdf' });
//             const url = window.URL.createObjectURL(blob);
//             const a = document.createElement('a');
//             a.href = url;
//             a.download = 'invoice.pdf';
//             a.click();

//             // Clean up
//             window.URL.revokeObjectURL(url);
//           }}
//         >
//           Download PDF
//         </button>

//         {/* Save and Finish button */}
//         <button onClick={onSaveAndFinish}>Save and Finish</button>
//       </div>
//     </Modal>
//   );
// };

// export default PdfPreviewDialog;



import React from 'react';
import {Document, Page } from 'react-pdf';

function PDFPreviewDialog({ pdfBlob, handleSaveAndFinish, onClose }) {
    const [numPages, setNumPages] = React.useState(null);
    const [pageNumber, setPageNumber] = React.useState(1);
    return (
        <div className="pdf-preview-dialog">
            <div className="pdf-preview-header">
                <h2>Invoice Preview</h2>
                <button onClick={onClose}>Close</button>
            </div>
            <div className="pdf-preview-content">
                {pdfBlob && (
                    <Document
                        file={{ data: pdfBlob }}
                        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                        loading="Loading PDF..."
                    >
                        <Page pageNumber={pageNumber} />
                    </Document>
                )}
            </div>
            <div className="pdf-preview-footer">
                <button onClick={handleSaveAndFinish}>Save and Finish</button>
            </div>
        </div>
    );
}

export default PDFPreviewDialog;
