import { NextResponse } from "next/server";
import ExcelJS from 'exceljs';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export async function POST(req) {
  try {
    const { type, data, exportType } = await req.json();
    console.log('Received request:', { type, exportType });

    if (exportType === 'excel') {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Sales Report');

      // Add headers
      worksheet.addRow(['Sales Report', '', '', '']);
      worksheet.addRow(['Report Type:', type, '', '']);
      worksheet.addRow(['Generated Date:', new Date().toLocaleDateString(), '', '']);
      worksheet.addRow(['']);

      // Sales Summary
      worksheet.addRow(['Sales Summary']);
      worksheet.addRow(['Total Sales', 'Total Orders', 'Average Order Value']);
      worksheet.addRow([
        data.salesSummary.totalSales,
        data.salesSummary.totalOrders,
        data.salesSummary.averageOrderValue
      ]);
      worksheet.addRow(['']);

      // Orders List
      worksheet.addRow(['Orders List']);
      worksheet.addRow(['Order ID', 'Date', 'Customer', 'Payment Status', 'Amount']);
      data.orders.forEach(order => {
        worksheet.addRow([
          order.orderID,
          new Date(order.orderDate).toLocaleDateString(),
          order.customerName,
          order.paymentStatus,
          order.totalAmount
        ]);
      });

      const buffer = await workbook.xlsx.writeBuffer();
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': 'attachment; filename=sales-report.xlsx'
        }
      });
    }

    if (exportType === 'pdf') {
      return new Promise((resolve, reject) => {
        try {
          console.log('Starting PDF generation');
          
          // Get the Arial font path
          const fontPath = path.join(process.cwd(), 'public', 'fonts', 'Arial.ttf');
          
          // Verify font exists
          if (!fs.existsSync(fontPath)) {
            throw new Error(`Font file not found at: ${fontPath}`);
          }

          // Format currency function with 2 decimal places
          const formatCurrency = (amount) => {
            const formattedAmount = Number(amount || 0).toFixed(2);
            return `PHP ${Number(formattedAmount).toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}`;
          };
          
          // Create PDF document with no default font
          const doc = new PDFDocument({
            margin: 30,
            size: 'A4',
            autoFirstPage: true,
            bufferPages: true,
            font: null  // Disable default fonts
          });

          // Register and use Arial font immediately
          doc.registerFont('CustomFont', fontPath);
          doc.font('CustomFont');
          
          // Create buffer to store PDF
          const buffers = [];
          doc.on('data', chunk => buffers.push(chunk));
          doc.on('error', reject);

          // Add content with custom font
          doc.fontSize(20)
             .text('Sales Report', { align: 'center' })
             .moveDown();

          doc.fontSize(12)
             .text(`Report Type: ${type || 'N/A'}`)
             .text(`Generated Date: ${new Date().toLocaleDateString()}`)
             .moveDown();

          // Sales Summary
          if (data?.salesSummary) {
            doc.fontSize(14)
               .text('Sales Summary')
               .moveDown();

            doc.fontSize(12)
               .text(`Total Sales: ${formatCurrency(data.salesSummary.totalSales)}`)
               .text(`Total Orders: ${data.salesSummary.totalOrders || '0'}`)
               .text(`Average Order Value: ${formatCurrency(data.salesSummary.averageOrderValue)}`)
               .moveDown();
          }

          // Orders List
          if (data?.orders?.length > 0) {
            doc.fontSize(14)
               .text('Recent Orders')
               .moveDown();

            const tableTop = doc.y;
            const orderCol = 50;
            const dateCol = 150;
            const customerCol = 250;
            const amountCol = 400;

            // Headers
            doc.fontSize(10)
               .text('Order ID', orderCol, tableTop)
               .text('Date', dateCol, tableTop)
               .text('Customer', customerCol, tableTop)
               .text('Amount', amountCol, tableTop);

            // Separator line
            doc.moveTo(orderCol, tableTop + 15)
               .lineTo(amountCol + 100, tableTop + 15)
               .stroke();

            // Data rows
            let yPos = tableTop + 30;
            data.orders.forEach((order, index) => {
              if (yPos > 700) {
                doc.addPage();
                yPos = 50;
                doc.font('CustomFont'); // Ensure font is set after new page
              }

              doc.fontSize(10)
                 .text(order.orderID || `Order ${index + 1}`, orderCol, yPos)
                 .text(order.orderDate ? new Date(order.orderDate).toLocaleDateString() : 'N/A', dateCol, yPos)
                 .text(order.customerName || 'N/A', customerCol, yPos)
                 .text(formatCurrency(order.totalAmount), amountCol, yPos);

              yPos += 20;
            });
          }

          // Finalize PDF
          doc.end();

          doc.on('end', () => {
            console.log('PDF generation completed');
            const pdfBuffer = Buffer.concat(buffers);
            
            resolve(new NextResponse(pdfBuffer, {
              status: 200,
              headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename=sales-report-${type}.pdf`,
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