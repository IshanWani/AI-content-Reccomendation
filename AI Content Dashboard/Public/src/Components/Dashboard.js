import React, { useState } from 'react';
import Header from '../Header';
import FilterBar from '../FilterBar';
import KPICards from '../KPICards';
import { 
  CTRTrendChart, 
  CategoryPerformanceChart, 
  AlgorithmRadarChart,
  GeoDistributionChart,
  HourlyPerformanceChart,
  EngagementFunnel 
} from '../Charts';
import ProjectSummary from '../Footer/ProjectSummary';
import { useAutoRefresh } from '../../hooks/useAutoRefresh';
import { useFilters } from '../../hooks/useFilters';
import { useAnalytics } from '../../hooks/useAnalytics';
import './Dashboard.css';

const Dashboard = () => {
  const [autoRefresh, setAutoRefresh] = useState(true);
  const { lastUpdated } = useAutoRefresh(5000, autoRefresh);
  const { dateRange, category, setDateRange, setCategory } = useFilters();
  const { kpiData, chartData, loading } = useAnalytics(dateRange, category);

  const handleExport = () => {
    console.log('Exporting dashboard data...');
    // Implementation for data export
  };

  if (loading) {
    return <div className="dashboard-loading">Loading analytics data...</div>;
  }

  return (
    <div className="dashboard-container">
      <Header 
        onExport={handleExport}
        autoRefresh={autoRefresh}
        onToggleRefresh={() => setAutoRefresh(!autoRefresh)}
      />
      
      <FilterBar
        dateRange={dateRange}
        category={category}
        onDateRangeChange={setDateRange}
        onCategoryChange={setCategory}
        lastUpdated={lastUpdated}
      />

      <div className="dashboard-content">
        <KPICards data={kpiData} />
        
        <div className="charts-grid-main">
          <div className="chart-large">
            <CTRTrendChart data={chartData.ctrTrend} />
          </div>
          <div className="chart-medium">
            <GeoDistributionChart data={chartData.geoData} />
          </div>
        </div>

        <div className="charts-grid-secondary">
          <div className="chart-medium">
            <CategoryPerformanceChart data={chartData.categoryPerformance} />
          </div>
          <div className="chart-medium">
            <AlgorithmRadarChart data={chartData.algorithmMetrics} />
          </div>
        </div>

        <div className="charts-grid-tertiary">
          <div className="chart-large">
            <HourlyPerformanceChart data={chartData.hourlyData} />
          </div>
          <div className="chart-small">
            <EngagementFunnel data={chartData.funnelData} />
          </div>
        </div>

        <ProjectSummary />
      </div>
    </div>
  );
};

export default Dashboard;