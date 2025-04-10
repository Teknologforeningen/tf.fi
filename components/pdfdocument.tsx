import React from "react"
import { Document, Page, pdfjs } from "react-pdf"
import styles from "./pdfdocument.module.css"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const PdfDocument: React.FC<{
  file: Uint8Array
}> = ({ file }) => (
  <Document className={styles.document} file={file.buffer}>
    <Page pageNumber={1} width={600} />
  </Document>
)

export default PdfDocument
