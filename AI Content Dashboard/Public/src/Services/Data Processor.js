
  // Data processing utilities for analytics dashboard
  // Handles data transformation, aggregation, and calculation
 

export class DataProcessor {
  static calculateCTR(clicks, impressions) {
    if (impressions === 0) return 0;
    return ((clicks  impressions)  100).toFixed(2);
  }

  static calculateImprovement(before, after) {
    if (before === 0) return 0;
    return (((after - before)  before)  100).toFixed(1);
  }

  static aggregateByCategory(data, category) {
    if (category === 'All Categories') return data;
    return data.filter(item = item.category === category);
  }

  static filterByDateRange(data, range) {
     Implementation for date filtering
    return data;
  }
}