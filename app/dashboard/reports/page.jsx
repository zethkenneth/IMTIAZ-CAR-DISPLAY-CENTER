'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Select,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Heading,
  Stack,
  Card,
  CardBody,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from '@chakra-ui/react';
import PageContainer from '@components/PageContainer';
import { FaFileExcel, FaFilePdf, FaChartLine, FaShoppingCart, FaExclamationTriangle } from 'react-icons/fa';
import axios from 'axios';
import BarChart from '../Home/barcart';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

// Register the chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Reports = () => {
  const [reportType, setReportType] = useState('daily');
  const [reportData, setReportData] = useState(null);
  const [analytics, setAnalytics] = useState({
    totalOrdersPerMonth: 0,
    totalSalesToday: 0,
    pendingOrdersCount: 0,
    lowStockProducts: [],
    yearSales: []
  });
  const [loading, setLoading] = useState(false);

  const fetchReportData = async () => {
    setLoading(true);
    try {
      const [reportResponse, analyticsResponse] = await Promise.all([
        axios.get(`/api/imtiaz/reports?type=${reportType}`),
        axios.get('/api/imtiaz/analytics')
      ]);

      if (reportResponse.data.status === 200) {
        setReportData(reportResponse.data.data);
      }
      if (analyticsResponse.data.status === 200) {
        setAnalytics(analyticsResponse.data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReportData();
  }, [reportType]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    }).format(amount || 0);
  };

  const exportToExcel = async () => {
    try {
      const response = await axios.post('/api/imtiaz/reports/export', {
        type: reportType,
        data: reportData,
        exportType: 'excel'
      }, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'sales-report.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Export failed:', error);
      // Add error toast notification here
    }
  };

  const exportToPDF = async () => {
    try {
      const response = await axios.post('/api/imtiaz/reports/export', {
        type: reportType,
        data: reportData,
        exportType: 'pdf'
      }, {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Create blob from array buffer
      const blob = new Blob([response.data], { type: 'application/pdf' });
      
      // Open PDF in new tab
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
      
      // Cleanup
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error('Export failed:', error);
      // Add error notification here
    }
  };

  return (
    <PageContainer>
      <Box p={4}>
        <Flex justifyContent="space-between" alignItems="center" mb={6}>
          <Heading size="lg">Sales Reports</Heading>
          <Stack direction="row" spacing={4}>
            <Select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              w="200px"
            >
              <option value="daily">Daily Report</option>
              <option value="weekly">Weekly Report</option>
              <option value="monthly">Monthly Report</option>
            </Select>
            <Button
              leftIcon={<FaFileExcel />}
              colorScheme="green"
              onClick={exportToExcel}
            >
              Export Excel
            </Button>
            <Button
              leftIcon={<FaFilePdf />}
              colorScheme="red"
              onClick={exportToPDF}
            >
              Export PDF
            </Button>
          </Stack>
        </Flex>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5} mb={6}>
          <StatCard
            label="Total Sales"
            value={formatCurrency(reportData?.salesSummary?.totalSales)}
            helpText="From completed orders"
          />
          <StatCard
            label="Total Orders"
            value={reportData?.salesSummary?.totalOrders}
            helpText="Completed orders"
          />
          <StatCard
            label="Average Order Value"
            value={formatCurrency(reportData?.salesSummary?.averageOrderValue)}
            helpText="Per order average"
          />
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6}>
          <Card>
            <CardBody>
              <Text fontSize="lg" fontWeight="bold" mb={4}>Sales by Product</Text>
              <Box h="300px">
                <Bar
                  data={{
                    labels: reportData?.topProducts?.map(p => p.productName) || [],
                    datasets: [{
                      label: 'Revenue',
                      data: reportData?.topProducts?.map(p => p.totalRevenue) || [],
                      backgroundColor: 'rgba(255, 159, 64, 0.2)',
                      borderColor: 'rgba(255, 159, 64, 1)',
                    }]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              </Box>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Text fontSize="lg" fontWeight="bold" mb={4}>Payment Methods</Text>
              <Box h="300px">
                <Doughnut
                  data={{
                    labels: reportData?.paymentMethods?.map(p => p.paymentMethod) || [],
                    datasets: [{
                      data: reportData?.paymentMethods?.map(p => p.totalAmount) || [],
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                      ],
                      borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                      ],
                    }]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              </Box>
            </CardBody>
          </Card>
        </SimpleGrid>

        <Box 
          mb={6} 
          p={4}
          bg="white" 
          rounded="lg" 
          shadow="md"
        >
          <Box h="400px">
            <BarChart 
              labels={analytics.yearSales.map(sale => sale.name)}
              values={analytics.yearSales.map(sale => sale.value)}
            />
          </Box>
        </Box>

        <Box 
          bg="white" 
          rounded="lg" 
          shadow="md" 
          overflow="hidden"
        >
          <Text p={4} fontSize="lg" fontWeight="bold">
            Orders List
          </Text>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Order ID</Th>
                <Th>Date</Th>
                <Th>Customer</Th>
                <Th>Payment Status</Th>
                <Th isNumeric>Amount</Th>
              </Tr>
            </Thead>
            <Tbody>
              {reportData?.orders?.map((order) => (
                <Tr key={order.orderID}>
                  <Td>{order.orderID}</Td>
                  <Td>{new Date(order.orderDate).toLocaleDateString()}</Td>
                  <Td>{order.customerName}</Td>
                  <Td>{order.paymentStatus}</Td>
                  <Td isNumeric>{formatCurrency(order.totalAmount)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </PageContainer>
  );
};

const StatCard = ({ label, value, helpText }) => (
  <Card>
    <CardBody>
      <Stat>
        <StatLabel>{label}</StatLabel>
        <StatNumber>{value}</StatNumber>
        <StatHelpText>{helpText}</StatHelpText>
      </Stat>
    </CardBody>
  </Card>
);

export default Reports; 