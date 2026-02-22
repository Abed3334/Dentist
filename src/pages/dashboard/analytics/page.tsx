
import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import {
  appointmentsPerDay, revenuePerMonth, topServices, cancellationRate,
  doctorUtilization, peakHours, insights
} from '../../../mocks/analytics';

const COLORS = ['#0F766E', '#0B1F3B', '#A7F3D0', '#6B7280', '#FEF3C7', '#FEE2E2'];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('30d');
  const [doctorFilter, setDoctorFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#0B1F3B]">Analytics</h1>
            <p className="text-sm text-[#6B7280]">Track performance and gain insights</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={dateRange}
              onChange={e => setDateRange(e.target.value)}
              className="px-3 py-2 border-2 border-[#E5E7EB] rounded-xl text-sm focus:border-[#0F766E] focus:outline-none cursor-pointer"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <select
              value={doctorFilter}
              onChange={e => setDoctorFilter(e.target.value)}
              className="px-3 py-2 border-2 border-[#E5E7EB] rounded-xl text-sm focus:border-[#0F766E] focus:outline-none cursor-pointer"
            >
              <option value="all">All Doctors</option>
              <option value="smith">Dr. Smith</option>
              <option value="williams">Dr. Williams</option>
              <option value="brown">Dr. Brown</option>
            </select>
            <select
              value={serviceFilter}
              onChange={e => setServiceFilter(e.target.value)}
              className="px-3 py-2 border-2 border-[#E5E7EB] rounded-xl text-sm focus:border-[#0F766E] focus:outline-none cursor-pointer"
            >
              <option value="all">All Services</option>
              <option value="cleaning">Cleaning</option>
              <option value="whitening">Whitening</option>
              <option value="braces">Braces</option>
              <option value="implants">Implants</option>
            </select>
          </div>
        </div>

        {/* Insight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {insights.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5E7EB] hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: item.color + '15' }}>
                  <i className={`${item.icon} text-xl`} style={{ color: item.color }}></i>
                </div>
                <span className="text-xs font-semibold text-[#6B7280] uppercase">{item.title}</span>
              </div>
              <p className="text-2xl font-bold text-[#111827] mb-0.5">{item.value}</p>
              <p className="text-xs text-[#6B7280]">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Appointments Per Day */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-6">
            <h3 className="text-base font-bold text-[#0B1F3B] mb-4">Appointments Per Day</h3>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={appointmentsPerDay}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', fontSize: '12px' }}
                  />
                  <Bar dataKey="count" fill="#0F766E" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Revenue Per Month */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-6">
            <h3 className="text-base font-bold text-[#0B1F3B] mb-4">Monthly Revenue</h3>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenuePerMonth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', fontSize: '12px' }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                  />
                  <Line type="monotone" dataKey="revenue" stroke="#0F766E" strokeWidth={3} dot={{ fill: '#0F766E', r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Top Services */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-6">
            <h3 className="text-base font-bold text-[#0B1F3B] mb-4">Top Services</h3>
            <div className="w-full h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topServices}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="bookings"
                    nameKey="name"
                    paddingAngle={3}
                  >
                    {topServices.map((_, idx) => (
                      <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-2">
              {topServices.slice(0, 4).map((s, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }}></div>
                    <span className="text-[#111827]">{s.name}</span>
                  </div>
                  <span className="text-[#6B7280] font-medium">{s.bookings}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cancellation Rate */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-6">
            <h3 className="text-base font-bold text-[#0B1F3B] mb-4">Cancellation Rate</h3>
            <div className="w-full h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cancellationRate}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} tickFormatter={v => `${v}%`} />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', fontSize: '12px' }}
                    formatter={(value: number) => [`${value}%`, 'Rate']}
                  />
                  <Line type="monotone" dataKey="rate" stroke="#DC2626" strokeWidth={2} dot={{ fill: '#DC2626', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Peak Hours */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-6">
            <h3 className="text-base font-bold text-[#0B1F3B] mb-4">Peak Hours</h3>
            <div className="w-full h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={peakHours} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis type="number" tick={{ fontSize: 11, fill: '#6B7280' }} />
                  <YAxis dataKey="hour" type="category" tick={{ fontSize: 11, fill: '#6B7280' }} width={50} />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', fontSize: '12px' }}
                  />
                  <Bar dataKey="patients" fill="#0B1F3B" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Doctor Utilization */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-6">
          <h3 className="text-base font-bold text-[#0B1F3B] mb-5">Doctor Utilization</h3>
          <div className="space-y-4">
            {doctorUtilization.map((doc, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="sm:w-36 flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#0B1F3B] rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {doc.name.split(' ').pop()?.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-[#111827] whitespace-nowrap">{doc.name}</span>
                </div>
                <div className="flex-1">
                  <div className="w-full bg-[#E5E7EB] rounded-full h-3">
                    <div
                      className="h-3 rounded-full transition-all duration-500"
                      style={{
                        width: `${doc.utilization}%`,
                        backgroundColor: doc.utilization >= 90 ? '#0F766E' : doc.utilization >= 80 ? '#0B1F3B' : '#6B7280'
                      }}
                    ></div>
                  </div>
                </div>
                <div className="flex items-center gap-4 sm:w-40 justify-end">
                  <span className="text-sm font-bold text-[#111827]">{doc.utilization}%</span>
                  <span className="text-xs text-[#6B7280]">{doc.appointments} appts</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
