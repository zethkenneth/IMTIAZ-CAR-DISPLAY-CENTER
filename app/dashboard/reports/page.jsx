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
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
} from 'chart.js';

// Register the chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
);

const Reports = () => {
  const [reportType, setReportType] = useState('daily');
  const [reportData, setReportData] = useState(null);
  const [analytics, setAnalytics] = useState({
    totalOrdersPerMonth: 0,
    totalSalesToday: 0,
    pendingOrdersCount: 0,
    lowStockProducts: [],
    yearSales: [],
    paymentMethodStats: []
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
              <Text fontSize="lg" fontWeight="bold" mb={4}>Payment Status Distribution</Text>
              <Box h="300px">
                <Doughnut
                  data={{
                    labels: ['Paid', 'Pending', 'Other'],
                    datasets: [{
                      data: [
                        reportData?.paymentStatusAnalytics?.paid || 0,
                        reportData?.paymentStatusAnalytics?.pending || 0,
                        reportData?.paymentStatusAnalytics?.other || 0
                      ],
                      backgroundColor: [
                        'rgba(72, 187, 120, 0.2)',  // Green for paid
                        'rgba(254, 178, 66, 0.2)',   // Orange for pending
                        'rgba(160, 174, 192, 0.2)',  // Gray for other
                      ],
                      borderColor: [
                        'rgba(72, 187, 120, 1)',
                        'rgba(254, 178, 66, 1)',
                        'rgba(160, 174, 192, 1)',
                      ],
                      borderWidth: 1
                    }]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                      },
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value} orders (${percentage}%)`;
                          }
                        }
                      }
                    }
                  }}
                />
              </Box>
            </CardBody>
          </Card>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={4}>
          {/* Order Trends */}
          <Card>
            <CardBody>
              <Text fontSize="lg" fontWeight="bold" mb={4}>
                Order Trends ({reportType === 'daily' ? 'Last 7 Days' : 
                             reportType === 'weekly' ? 'Last 4 Weeks' : 
                             'Last 12 Months'})
              </Text>
              <Box h="300px">
                <Line
                  data={{
                    labels: reportData?.orderTrends?.map(trend => 
                      new Date(trend.date).toLocaleDateString('en-US', {
                        day: reportType === 'monthly' ? undefined : 'numeric',
                        month: 'short',
                        year: reportType === 'monthly' ? 'numeric' : undefined
                      })
                    ) || [],
                    datasets: [
                      {
                        label: 'Total Orders',
                        data: reportData?.orderTrends?.map(trend => trend.totalOrders) || [],
                        borderColor: 'rgba(66, 153, 225, 1)',
                        backgroundColor: 'rgba(66, 153, 225, 0.2)',
                        fill: true
                      },
                      {
                        label: 'Paid Orders',
                        data: reportData?.orderTrends?.map(trend => trend.paidOrders) || [],
                        borderColor: 'rgba(72, 187, 120, 1)',
                        backgroundColor: 'rgba(72, 187, 120, 0.2)',
                        fill: true
                      }
                    ]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          stepSize: 1
                        }
                      },
                      x: {
                        reverse: true, // Show most recent dates on the right
                        ticks: {
                          maxRotation: 45,
                          minRotation: 45
                        }
                      }
                    },
                    plugins: {
                      legend: {
                        position: 'bottom'
                      },
                      tooltip: {
                        callbacks: {
                          title: (context) => {
                            const date = new Date(reportData.orderTrends[context[0].dataIndex].date);
                            return date.toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            });
                          }
                        }
                      }
                    }
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