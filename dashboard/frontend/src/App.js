import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Brush
} from 'recharts';
import { CustomTooltip } from './components/CustomTooltip';

function App() {
  const [data, setData] = useState({ prices: [], events: [], changePoint: null });
  const [filteredPrices, setFilteredPrices] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [dateRange, setDateRange] = useState({ start: '1987-01-01', end: new Date().toISOString().split('T')[0] });
  const [activeFilter, setActiveFilter] = useState('All');

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [pricesRes, eventsRes, changePointRes] = await Promise.all([
          axios.get('http://localhost:5000/api/prices'),
          axios.get('http://localhost:5000/api/events'),
          axios.get('http://localhost:5000/api/change-point')
        ]);

        const processedPrices = pricesRes.data.map(item => ({
          ...item,
          DateTimestamp: new Date(item.Date).getTime(), 
          DateStr: new Date(item.Date).toISOString().split('T')[0]
        }));

        setData({
          prices: processedPrices,
          events: eventsRes.data,
          changePoint: changePointRes.data
        });
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load dashboard data. Ensure backend is running at http://localhost:5000");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter Data Logic
  useEffect(() => {
    if (data.prices.length === 0) return;

    const filtered = data.prices.filter(p => 
      p.DateStr >= dateRange.start && p.DateStr <= dateRange.end
    );
    setFilteredPrices(filtered);

    // Calculate dynamic metrics based on view
    if (filtered.length > 0) {
      const prices = filtered.map(p => p.Price);
      setMetrics({
        current: prices[prices.length - 1],
        avg: prices.reduce((a, b) => a + b, 0) / prices.length,
        min: Math.min(...prices),
        max: Math.max(...prices),
        volatility: calculateVolatility(prices)
      });
    }
  }, [data.prices, dateRange]);

  const calculateVolatility = (prices) => {
    if (prices.length < 2) return 0;
    const mean = prices.reduce((a, b) => a + b, 0) / prices.length;
    const variance = prices.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / prices.length;
    return Math.sqrt(variance);
  };

  const handleDateChange = (e) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
  };

  // Filter events based on active category
  const filteredEvents = useMemo(() => {
     let events = data.events;
     if (activeFilter !== 'All') {
       events = events.filter(e => e.Type === activeFilter);
     }
     // Only show events within selected date range
     return events.filter(e => e.Date >= dateRange.start && e.Date <= dateRange.end);
  }, [data.events, activeFilter, dateRange]);

  const eventTypes = ['All', ...new Set(data.events.map(e => e.Type))];

  if (loading) return <div className="loading">Initializing Dashboard...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>Brent Oil Analysis Dashboard</h1>
          <small>Structural Breaks & Event Impact</small>
        </div>
        <div className="header-controls">
          {/* Header controls could go here (e.g., Theme Toggle) */}
        </div>
      </header>

      <main className="dashboard-container">
        
        {/* Controls Section */}
        <section className="controls-section">
          <div className="filter-group">
            <label>Date Range:</label>
            <input 
              type="date" 
              name="start" 
              value={dateRange.start} 
              onChange={handleDateChange} 
              className="date-input"
            />
            <span>to</span>
            <input 
              type="date" 
              name="end" 
              value={dateRange.end} 
              onChange={handleDateChange} 
              className="date-input"
            />
          </div>

          <div className="filter-group">
            <label>Event Filter:</label>
            {eventTypes.map(type => (
              <button 
                key={type}
                className={`btn btn-secondary ${activeFilter === type ? 'active' : ''}`}
                onClick={() => setActiveFilter(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </section>

        {/* KPI Cards */}
        {metrics && (
          <div className="kpi-grid">
            <div className="kpi-card">
              <h3>Current Price</h3>
              <div className="value">${metrics.current.toFixed(2)}</div>
              <div className="sub-text">Latest Close</div>
            </div>
            <div className="kpi-card">
              <h3>Average Price</h3>
              <div className="value">${metrics.avg.toFixed(2)}</div>
              <div className="sub-text">Selected Period</div>
            </div>
            <div className="kpi-card">
              <h3>Volatility (Std)</h3>
              <div className="value">{metrics.volatility.toFixed(2)}</div>
              <div className="sub-text">Risk Indicator</div>
            </div>
            <div className="kpi-card">
              <h3>Price Range</h3>
              <div className="value">${metrics.min.toFixed(0)} - ${metrics.max.toFixed(0)}</div>
              <div className="sub-text">Min - Max</div>
            </div>
          </div>
        )}

        {/* Main Chart */}
        <div className="chart-section">
          <div className="chart-header">
             <h2>Price History & Structural Breaks</h2>
             {selectedEvent && <button className="btn btn-secondary" onClick={() => setSelectedEvent(null)}>Clear Event Selection</button>}
          </div>
          
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredPrices} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} vertical={false} />
                <XAxis 
                  dataKey="DateStr" 
                  tickFormatter={(str) => str.substring(0, 4)} 
                  minTickGap={50}
                  stroke="#a0aec0"
                />
                <YAxis 
                   stroke="#a0aec0"
                   domain={['auto', 'auto']}
                   tickFormatter={(val) => `$${val}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="Price" 
                  stroke="#3182ce" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                  name="Brent Price"
                />
                
                {/* Change Point Line */}
                {data.changePoint && (
                  <ReferenceLine 
                    x={data.changePoint.date} 
                    stroke="#e53e3e" 
                    strokeDasharray="4 4" 
                    label={{ 
                       position: 'insideTopLeft', 
                       value: 'Structural Break', 
                       fill: '#e53e3e',
                       fontSize: 12
                    }} 
                  />
                )}
                
                {/* Selected Event Line */}
                {selectedEvent && (
                  <ReferenceLine 
                    x={selectedEvent.Date} 
                    stroke="#ed8936" 
                    strokeWidth={2}
                    label={{ 
                       position: 'insideTopRight', 
                       value: selectedEvent.Event, 
                       fill: '#ed8936',
                       fontSize: 12,
                       fontWeight: 'bold'
                    }} 
                  />
                )}
                
                <Brush 
                   dataKey="DateStr" 
                   height={30} 
                   stroke="#8884d8" 
                   fill="#ebf8ff"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Change Point Analysis Detail */}
        {data.changePoint && (
           <div className="analysis-box">
              <h4>📊 Structural Break Analysis</h4>
              <p>The Bayesian model detected the most significant regime change on <strong>{data.changePoint.date}</strong>.</p>
              <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem' }}>
                 <div>
                    <span style={{ color: '#718096', fontSize: '0.85rem' }}>Before Shift</span>
                    <br/><strong>${data.changePoint.mean_before.toFixed(2)}</strong>
                 </div>
                 <div style={{ fontSize: '1.5rem', color: '#718096' }}>→</div>
                 <div>
                    <span style={{ color: '#718096', fontSize: '0.85rem' }}>After Shift</span>
                    <br/><strong>${data.changePoint.mean_after.toFixed(2)}</strong>
                 </div>
              </div>
           </div>
        )}

        {/* Events Section */}
        <div className="events-section">
          <h2>Historical Context</h2>
          <p style={{ color: '#718096', marginBottom: '1rem' }}>
             Select an event below to visualize its timing relative to price movements. 
             Now viewing <strong>{filteredEvents.length}</strong> events.
          </p>
          <div className="events-table-container">
            <table className="events-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Event</th>
                  <th>Type</th>
                  <th>Impact Description</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map((event, index) => (
                  <tr 
                    key={index} 
                    onClick={() => setSelectedEvent(event)}
                    className={selectedEvent === event ? 'selected-row' : ''}
                  >
                    <td style={{ whiteSpace: 'nowrap' }}>{event.Date}</td>
                    <td style={{ fontWeight: 500 }}>{event.Event}</td>
                    <td>
                       <span className={`tag ${event.Type ? event.Type.toLowerCase().replace(' ', '-') : 'other'}`}>
                         {event.Type}
                       </span>
                    </td>
                    <td>{event.Description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

