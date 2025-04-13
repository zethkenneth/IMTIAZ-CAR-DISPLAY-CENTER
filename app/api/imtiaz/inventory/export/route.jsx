import { NextResponse } from "next/server";
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export async function POST(req) {
  try {
    const { data, exportType } = await req.json();
    
    if (exportType === 'pdf') {
      return new Promise((resolve, reject) => {
        try {
          // Get the Arial font path
          const fontPath = path.join(process.cwd(), 'public', 'fonts', 'Arial.ttf');
          
          // Verify font exists
          if (!fs.existsSync(fontPath)) {
            throw new Error(`Font file not found at: ${fontPath}`);
          }

          // Format currency function
          const formatCurrency = (amount) => {
            return `PHP ${Number(amount || 0).toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}`;
          };
          
          // Create PDF document
          const doc = new PDFDocument({
            margin: 30,
            size: 'A4',
            layout: 'landscape',
            autoFirstPage: true,
            bufferPages: true,
            font: null
          });

          // Register and use Arial font
          doc.registerFont('CustomFont', fontPath);
          doc.font('CustomFont');
          
          // Create buffer to store PDF
          const buffers = [];
          doc.on('data', chunk => buffers.push(chunk));
          doc.on('error', reject);

          // Add content
          doc.fontSize(20)
             .text('Inventory Report', { align: 'center' })
             .moveDown();

          doc.fontSize(12)
             .text(`Generated Date: ${new Date().toLocaleDateString()}`)
             .moveDown();

          // Table setup with adjusted column widths
          const tableTop = doc.y;
          const productNameCol = 50;
          const brandCol = 180;
          const modelCol = 280;
          const yearCol = 350;
          const chasisCol = 400;
          const engineCol = 500;
          const priceCol = 600;

          // Headers
          doc.fontSize(10)
             .text('Product Name', productNameCol, tableTop)
             .text('Brand', brandCol, tableTop)
             .text('Model', modelCol, tableTop)
             .text('Year', yearCol, tableTop)
             .text('Chassis No.', chasisCol, tableTop)
             .text('Engine No.', engineCol, tableTop)
             .text('Price', priceCol, tableTop);

          // Separator line
          doc.moveTo(productNameCol, tableTop + 15)
             .lineTo(priceCol + 100, tableTop + 15)
             .stroke();

          // Data rows
          let yPos = tableTop + 30;
          
          // Sort products by name in ascending order
          const sortedProducts = [...data].sort((a, b) => 
            (a.productName || '').localeCompare(b.productName || '')
          );

          sortedProducts.forEach((product, index) => {
            if (yPos > 500) { // Adjusted for landscape
              doc.addPage({ layout: 'landscape' });
              yPos = 50;
              doc.font('CustomFont');

              // Add headers to new page
              doc.fontSize(10)
                 .text('Product Name', productNameCol, yPos - 20)
                 .text('Brand', brandCol, yPos - 20)
                 .text('Model', modelCol, yPos - 20)
                 .text('Year', yearCol, yPos - 20)
                 .text('Chassis No.', chasisCol, yPos - 20)
                 .text('Engine No.', engineCol, yPos - 20)
                 .text('Price', priceCol, yPos - 20);

              // Separator line
              doc.moveTo(productNameCol, yPos - 5)
                 .lineTo(priceCol + 100, yPos - 5)
                 .stroke();
            }

            // Truncate long text
            const truncateText = (text, maxLength) => {
              if (!text) return 'N/A';
              return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
            };

            doc.fontSize(10)
               .text(truncateText(product.productName, 20), productNameCol, yPos)
               .text(truncateText(product.brand, 15), brandCol, yPos)
               .text(truncateText(product.model, 12), modelCol, yPos)
               .text(product.year || 'N/A', yearCol, yPos)
               .text(product.chasis || 'N/A', chasisCol, yPos)
               .text(product.engineNumber || 'N/A', engineCol, yPos)
               .text(formatCurrency(product.price), priceCol, yPos);

            yPos += 20;
          });

          // Add total count
          doc.moveDown(2)
             .fontSize(12)
             .text(`Total Products: ${sortedProducts.length}`, productNameCol);

          // Finalize PDF
          doc.end();

          doc.on('end', () => {
            const pdfBuffer = Buffer.concat(buffers);
            
            resolve(new NextResponse(pdfBuffer, {
              status: 200,
              headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename=inventory-report.pdf',
                'Content-Length': pdfBuffer.length.toString()
              }
            }));
          });

        } catch (error) {
          console.error('PDF generation failed:', error);
          reject(new Error(`PDF generation failed: ${error.message}`));
        }
      });
    }

  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json({
      error: 'Failed to generate export',
      details: error.message
    }, {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
} 