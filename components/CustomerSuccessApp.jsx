import React, { useState, useEffect } from 'react';
import { Calendar, Users, FileText, CheckCircle, AlertCircle, Clock, Plus, Mail, Phone, Edit2, Trash2, Save, X, Play, Video, ExternalLink, Search, Filter, ChevronRight, ChevronLeft, ChevronDown, TrendingUp, Activity } from 'lucide-react';

// ============================================================================
// DATA MODELS & MOCK DATABASE
// ============================================================================

// Simulated backend database
const createDatabase = () => ({
  customers: [
    {
      id: 1,
      siteName: 'CabrioLi Kombibad',
      city: 'Lippstadt',
      firstName: 'Lazaros',
      lastName: 'Doris',
      emailPOC: 'lazaros.doris@live.de',
      emailTechnicalPOC: 'lazaros.doris@live.de',
      emailTechnicalExternalPOC: 'lazaros.doris@live.de',
      hubspotId: '9900009990',
      dealStage: 'PAYING',
      meetingInterval: '3_MONTHS',
      goLiveDate: new Date(2021, 4, 31),
      lastAppointment: new Date(2026, 1, 3, 20, 0),
      nextAppointment: new Date(2026, 1, 6),
      renewalDate: new Date(2026, 0, 4),
      endDate: new Date(2026, 0, 10),
      status: 'ACTIVE',
      assignedCsmId: 1,
      metadata: { poolType: 'Indoor/Outdoor', cameras: 8 },
      createdAt: new Date(2021, 4, 31)
    },
    {
      id: 2,
      siteName: 'Stadtbad Heidelberg',
      city: 'Heidelberg',
      firstName: 'Thomas',
      lastName: 'Mueller',
      emailPOC: 'thomas.mueller@stadtbad-hd.de',
      emailTechnicalPOC: 'tech@stadtbad-hd.de',
      emailTechnicalExternalPOC: 'support@pooltech.de',
      hubspotId: '9900009991',
      dealStage: 'PAYING',
      meetingInterval: '2_MONTHS',
      goLiveDate: new Date(2022, 2, 15),
      lastAppointment: new Date(2025, 11, 15, 14, 0),
      nextAppointment: new Date(2026, 1, 15),
      renewalDate: new Date(2026, 2, 15),
      endDate: new Date(2027, 2, 15),
      status: 'ACTIVE',
      assignedCsmId: 1,
      metadata: { poolType: 'Indoor', cameras: 12 },
      createdAt: new Date(2022, 2, 15)
    },
    {
      id: 3,
      siteName: 'Schwimmbad am Park',
      city: 'München',
      firstName: 'Anna',
      lastName: 'Schmidt',
      emailPOC: 'anna.schmidt@schwimmbad-park.de',
      emailTechnicalPOC: 'anna.schmidt@schwimmbad-park.de',
      emailTechnicalExternalPOC: 'service@aquatech.de',
      hubspotId: '9900009992',
      dealStage: 'TRIAL',
      meetingInterval: '1_MONTH',
      goLiveDate: new Date(2025, 10, 1),
      lastAppointment: new Date(2026, 0, 10, 10, 0),
      nextAppointment: new Date(2026, 2, 10),
      renewalDate: new Date(2026, 4, 1),
      endDate: new Date(2026, 10, 1),
      status: 'ACTIVE',
      assignedCsmId: 1,
      metadata: { poolType: 'Outdoor', cameras: 6 },
      createdAt: new Date(2025, 10, 1)
    }
  ],
  meetings: [
    {
      id: 1,
      customerId: 1,
      scheduledAt: new Date(2026, 1, 3, 20, 0),
      status: 'COMPLETED',
      googleMeetLink: 'https://meet.google.com/abc-defg-hij',
      actualMeetingDate: new Date(2026, 1, 3, 20, 0),
      completedAt: new Date(2026, 1, 3, 21, 0)
    },
    {
      id: 2,
      customerId: 1,
      scheduledAt: new Date(2026, 1, 6),
      status: 'SCHEDULED',
      googleMeetLink: 'https://meet.google.com/xyz-mnop-qrs',
      actualMeetingDate: null,
      completedAt: null
    },
    {
      id: 3,
      customerId: 2,
      scheduledAt: new Date(2026, 1, 15),
      status: 'SCHEDULED',
      googleMeetLink: 'https://meet.google.com/tuv-wxyz-123',
      actualMeetingDate: null,
      completedAt: null
    },
    {
      id: 4,
      customerId: 3,
      scheduledAt: new Date(2026, 2, 10),
      status: 'SCHEDULED',
      googleMeetLink: 'https://meet.google.com/def-ghij-klm',
      actualMeetingDate: null,
      completedAt: null
    },
    {
      id: 5,
      customerId: 1,
      scheduledAt: new Date(2025, 10, 3, 15, 0),
      status: 'COMPLETED',
      googleMeetLink: 'https://meet.google.com/old-meet-ing',
      actualMeetingDate: new Date(2025, 10, 3, 15, 0),
      completedAt: new Date(2025, 10, 3, 16, 0)
    }
  ],
  protocols: [
    {
      id: 1,
      meetingId: 1,
      status: 'COMPLETED',
      completedAt: new Date(2026, 1, 3, 21, 0)
    },
    {
      id: 2,
      meetingId: 5,
      status: 'COMPLETED',
      completedAt: new Date(2025, 10, 3, 16, 0)
    }
  ],
  questions: [
    {
      id: 1,
      questionText: 'How satisfied are you with the platform overall?',
      questionType: 'RATING',
      isRequired: true,
      displayOrder: 1,
      category: 'Product Feedback',
      isActive: true
    },
    {
      id: 2,
      questionText: 'What features would you like to see added or improved?',
      questionType: 'TEXTAREA',
      isRequired: false,
      displayOrder: 2,
      category: 'Product Feedback',
      isActive: true
    },
    {
      id: 3,
      questionText: 'How many team members are actively using the platform?',
      questionType: 'NUMBER',
      isRequired: true,
      displayOrder: 3,
      category: 'Business Health',
      isActive: true
    },
    {
      id: 4,
      questionText: 'Are you planning to expand usage in the next quarter?',
      questionType: 'BOOLEAN',
      isRequired: false,
      displayOrder: 4,
      category: 'Business Health',
      isActive: true
    },
    {
      id: 5,
      questionText: 'Any support issues or blockers we should address?',
      questionType: 'TEXTAREA',
      isRequired: false,
      displayOrder: 5,
      category: 'Support',
      isActive: true
    }
  ],
  answers: [
    {
      id: 1,
      protocolId: 1,
      questionId: 1,
      answerValue: { rating: 5 },
      answeredAt: new Date(2026, 1, 3, 20, 30)
    },
    {
      id: 2,
      protocolId: 1,
      questionId: 2,
      answerValue: { text: 'The AI detection is working perfectly. We would love to see better mobile notifications.' },
      answeredAt: new Date(2026, 1, 3, 20, 35)
    },
    {
      id: 3,
      protocolId: 1,
      questionId: 3,
      answerValue: { number: 8 },
      answeredAt: new Date(2026, 1, 3, 20, 40)
    },
    {
      id: 4,
      protocolId: 2,
      questionId: 1,
      answerValue: { rating: 4 },
      answeredAt: new Date(2025, 10, 3, 15, 30)
    },
    {
      id: 5,
      protocolId: 2,
      questionId: 2,
      answerValue: { text: 'System works great during peak hours. Would appreciate better analytics dashboard.' },
      answeredAt: new Date(2025, 10, 3, 15, 35)
    },
    {
      id: 6,
      protocolId: 2,
      questionId: 3,
      answerValue: { number: 8 },
      answeredAt: new Date(2025, 10, 3, 15, 40)
    }
  ],
  users: [
    {
      id: 1,
      name: 'Sarah Martinez',
      email: 'sarah@company.com',
      role: 'Customer Success Manager'
    }
  ]
});

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const formatDate = (date) => {
  if (!date) return 'N/A';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const formatDateTime = (date) => {
  if (!date) return 'N/A';
  const d = new Date(date);
  return d.toLocaleString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true 
  });
};

const formatTime = (date) => {
  if (!date) return 'N/A';
  const d = new Date(date);
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
};

const getIntervalLabel = (interval) => {
  const map = {
    '1_MONTH': 'Every 1 month',
    '2_MONTHS': 'Every 2 months',
    '3_MONTHS': 'Every 3 months'
  };
  return map[interval] || interval;
};

const isToday = (date) => {
  const today = new Date();
  const d = new Date(date);
  return d.toDateString() === today.toDateString();
};

const isThisWeek = (date) => {
  const today = new Date();
  const d = new Date(date);
  const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  return d > today && d <= weekFromNow;
};

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================

const CustomerSuccessApp = () => {
  const [db, setDb] = useState(createDatabase());
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [calendarView, setCalendarView] = useState('week'); // 'week' or 'month'
  const [currentDate, setCurrentDate] = useState(new Date());

  // ============================================================================
  // DASHBOARD VIEW
  // ============================================================================

  const DashboardView = () => {
    const todayMeetings = db.meetings.filter(m => 
      m.status === 'SCHEDULED' && isToday(m.scheduledAt)
    );
    
    const upcomingMeetings = db.meetings.filter(m => 
      m.status === 'SCHEDULED' && isThisWeek(m.scheduledAt) && !isToday(m.scheduledAt)
    );

    const overdueProtocols = db.protocols.filter(p => {
      const meeting = db.meetings.find(m => m.id === p.meetingId);
      if (!meeting || p.status === 'COMPLETED') return false;
      const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
      return meeting.scheduledAt < twoDaysAgo;
    });

    const completedThisMonth = db.meetings.filter(m => {
      if (m.status !== 'COMPLETED') return false;
      const thisMonth = new Date().getMonth();
      const meetingMonth = new Date(m.completedAt).getMonth();
      return thisMonth === meetingMonth;
    }).length;

    const getMeetingCustomer = (meeting) => {
      return db.customers.find(c => c.id === meeting.customerId);
    };

    return (
      <div className="space-y-6">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="metric-card">
            <div className="metric-icon this-week">
              <Calendar size={24} />
            </div>
            <div className="metric-content">
              <div className="metric-label">This Week</div>
              <div className="metric-value">{todayMeetings.length + upcomingMeetings.length}</div>
              <div className="metric-sublabel">scheduled meetings</div>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon overdue">
              <AlertCircle size={24} />
            </div>
            <div className="metric-content">
              <div className="metric-label">Overdue</div>
              <div className="metric-value">{overdueProtocols.length}</div>
              <div className="metric-sublabel">protocols pending</div>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon completed">
              <CheckCircle size={24} />
            </div>
            <div className="metric-content">
              <div className="metric-label">Completed</div>
              <div className="metric-value">{completedThisMonth}</div>
              <div className="metric-sublabel">meetings this month</div>
            </div>
          </div>
        </div>

        {/* Upcoming Meetings */}
        <div className="section-card">
          <div className="section-header">
            <h2 className="section-title">
              <Calendar size={20} />
              Upcoming Meetings
            </h2>
          </div>

          {todayMeetings.length > 0 && (
            <div className="mb-6">
              <div className="meeting-day-label">TODAY</div>
              <div className="space-y-3">
                {todayMeetings.map(meeting => {
                  const customer = getMeetingCustomer(meeting);
                  return (
                    <div key={meeting.id} className="meeting-item today">
                      <div className="meeting-info">
                        <div className="meeting-company">{customer.siteName}</div>
                        <div className="meeting-time">
                          <Clock size={14} />
                          {formatTime(meeting.scheduledAt)}
                        </div>
                      </div>
                      <div className="meeting-actions">
                        <a 
                          href={meeting.googleMeetLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn-meet"
                        >
                          <Video size={16} />
                          Join Meet
                        </a>
                        <button 
                          className="btn-protocol"
                          onClick={() => {
                            setSelectedMeeting(meeting);
                            setCurrentView('protocol');
                          }}
                        >
                          <FileText size={16} />
                          Protocol
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {upcomingMeetings.length > 0 && (
            <div>
              <div className="meeting-day-label">THIS WEEK</div>
              <div className="space-y-3">
                {upcomingMeetings.map(meeting => {
                  const customer = getMeetingCustomer(meeting);
                  return (
                    <div key={meeting.id} className="meeting-item">
                      <div className="meeting-info">
                        <div className="meeting-company">{customer.siteName}</div>
                        <div className="meeting-time">
                          <Clock size={14} />
                          {formatDateTime(meeting.scheduledAt)}
                        </div>
                      </div>
                      <div className="meeting-actions">
                        <button 
                          className="btn-secondary-small"
                          onClick={() => {
                            setSelectedCustomer(customer);
                            setCurrentView('customer-detail');
                          }}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {todayMeetings.length === 0 && upcomingMeetings.length === 0 && (
            <div className="empty-state">
              <Calendar size={48} />
              <p>No meetings scheduled this week</p>
            </div>
          )}
        </div>

        {/* Action Required */}
        {overdueProtocols.length > 0 && (
          <div className="section-card alert">
            <div className="section-header">
              <h2 className="section-title">
                <AlertCircle size={20} />
                Action Required
              </h2>
            </div>
            <div className="space-y-3">
              {overdueProtocols.map(protocol => {
                const meeting = db.meetings.find(m => m.id === protocol.meetingId);
                const customer = getMeetingCustomer(meeting);
                return (
                  <div key={protocol.id} className="action-item">
                    <div className="action-info">
                      <div className="action-title">Complete protocol: {customer.siteName}</div>
                      <div className="action-date">Meeting was {formatDate(meeting.scheduledAt)}</div>
                    </div>
                    <button 
                      className="btn-action"
                      onClick={() => {
                        setSelectedMeeting(meeting);
                        setCurrentView('protocol');
                      }}
                    >
                      Complete Now
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  // ============================================================================
  // CALENDAR VIEW
  // ============================================================================

  const CalendarView = () => {
    // Helper functions for calendar
    const getWeekDays = (date) => {
      const current = new Date(date);
      const monday = new Date(current);
      monday.setDate(current.getDate() - current.getDay() + 1);
      
      const days = [];
      for (let i = 0; i < 5; i++) {
        const day = new Date(monday);
        day.setDate(monday.getDate() + i);
        days.push(day);
      }
      return days;
    };

    const getMonthDays = (date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      
      const days = [];
      const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
      
      // Add previous month's trailing days
      for (let i = startDay - 1; i >= 0; i--) {
        const day = new Date(firstDay);
        day.setDate(day.getDate() - i - 1);
        days.push({ date: day, isCurrentMonth: false });
      }
      
      // Add current month's days
      for (let i = 1; i <= lastDay.getDate(); i++) {
        days.push({ date: new Date(year, month, i), isCurrentMonth: true });
      }
      
      // Add next month's leading days to complete the grid
      const remainingDays = 35 - days.length;
      for (let i = 1; i <= remainingDays; i++) {
        const day = new Date(lastDay);
        day.setDate(lastDay.getDate() + i);
        days.push({ date: day, isCurrentMonth: false });
      }
      
      return days;
    };

    const getTimeSlots = () => {
      const slots = [];
      for (let hour = 8; hour <= 18; hour++) {
        slots.push(`${hour.toString().padStart(2, '0')}:00`);
      }
      return slots;
    };

    const getMeetingsForDay = (date) => {
      return db.meetings.filter(meeting => {
        const meetingDate = new Date(meeting.scheduledAt);
        return meetingDate.toDateString() === date.toDateString();
      });
    };

    const getMeetingsForTimeSlot = (date, hour) => {
      return db.meetings.filter(meeting => {
        const meetingDate = new Date(meeting.scheduledAt);
        return (
          meetingDate.toDateString() === date.toDateString() &&
          meetingDate.getHours() === hour
        );
      });
    };

    const formatTimeShort = (date) => {
      const d = new Date(date);
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    };

    const getCustomerForMeeting = (meeting) => {
      return db.customers.find(c => c.id === meeting.customerId);
    };

    const navigateWeek = (direction) => {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() + (direction * 7));
      setCurrentDate(newDate);
    };

    const navigateMonth = (direction) => {
      const newDate = new Date(currentDate);
      newDate.setMonth(newDate.getMonth() + direction);
      setCurrentDate(newDate);
    };

    const goToToday = () => {
      setCurrentDate(new Date());
    };

    const weekDays = getWeekDays(currentDate);
    const monthDays = getMonthDays(currentDate);
    const timeSlots = getTimeSlots();

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                        'July', 'August', 'September', 'October', 'November', 'December'];

    return (
      <div className="space-y-6">
        {/* Calendar Header */}
        <div className="calendar-header">
          <div className="calendar-title-section">
            <h1 className="page-title">Calendar</h1>
            <p className="page-subtitle">
              {calendarView === 'week' 
                ? `Week of ${formatDate(weekDays[0])}`
                : `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`
              }
            </p>
          </div>
          
          <div className="calendar-controls">
            <button className="btn-secondary" onClick={goToToday}>
              Today
            </button>
            
            <div className="calendar-nav-buttons">
              <button 
                className="btn-icon"
                onClick={() => calendarView === 'week' ? navigateWeek(-1) : navigateMonth(-1)}
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                className="btn-icon"
                onClick={() => calendarView === 'week' ? navigateWeek(1) : navigateMonth(1)}
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="view-toggle">
              <button 
                className={`toggle-btn ${calendarView === 'week' ? 'active' : ''}`}
                onClick={() => setCalendarView('week')}
              >
                Week
              </button>
              <button 
                className={`toggle-btn ${calendarView === 'month' ? 'active' : ''}`}
                onClick={() => setCalendarView('month')}
              >
                Month
              </button>
            </div>
          </div>
        </div>

        {/* Week View */}
        {calendarView === 'week' && (
          <div className="calendar-week-view">
            <div className="week-grid">
              {/* Time column */}
              <div className="time-column">
                <div className="time-header"></div>
                {timeSlots.map(slot => (
                  <div key={slot} className="time-slot-label">{slot}</div>
                ))}
              </div>

              {/* Day columns */}
              {weekDays.map((day, dayIndex) => {
                const isToday = day.toDateString() === new Date().toDateString();
                const dayName = day.toLocaleDateString('en-US', { weekday: 'short' });
                const dayNumber = day.getDate();

                return (
                  <div key={dayIndex} className="day-column">
                    <div className={`day-header ${isToday ? 'today' : ''}`}>
                      <div className="day-name">{dayName}</div>
                      <div className={`day-number ${isToday ? 'today-number' : ''}`}>{dayNumber}</div>
                    </div>

                    {timeSlots.map((slot, slotIndex) => {
                      const hour = parseInt(slot.split(':')[0]);
                      const meetingsInSlot = getMeetingsForTimeSlot(day, hour);

                      return (
                        <div key={slotIndex} className="time-slot">
                          {meetingsInSlot.map(meeting => {
                            const customer = getCustomerForMeeting(meeting);
                            return (
                              <div 
                                key={meeting.id} 
                                className={`calendar-event ${meeting.status.toLowerCase()}`}
                                onClick={() => {
                                  setSelectedMeeting(meeting);
                                  setSelectedCustomer(customer);
                                  setCurrentView('protocol');
                                }}
                              >
                                <div className="event-time">{formatTimeShort(meeting.scheduledAt)}</div>
                                <div className="event-title">{customer.siteName}</div>
                                <div className="event-subtitle">{customer.city}</div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Month View */}
        {calendarView === 'month' && (
          <div className="calendar-month-view">
            <div className="month-grid">
              {/* Weekday headers */}
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <div key={day} className="weekday-header">{day}</div>
              ))}

              {/* Calendar days */}
              {monthDays.map((dayObj, index) => {
                const { date, isCurrentMonth } = dayObj;
                const isToday = date.toDateString() === new Date().toDateString();
                const meetings = getMeetingsForDay(date);

                return (
                  <div 
                    key={index} 
                    className={`month-day ${!isCurrentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''}`}
                  >
                    <div className="month-day-number">{date.getDate()}</div>
                    <div className="month-day-events">
                      {meetings.map(meeting => {
                        const customer = getCustomerForMeeting(meeting);
                        return (
                          <div 
                            key={meeting.id}
                            className={`month-event ${meeting.status.toLowerCase()}`}
                            onClick={() => {
                              setSelectedMeeting(meeting);
                              setSelectedCustomer(customer);
                              setCurrentView('protocol');
                            }}
                          >
                            <span className="month-event-time">{formatTimeShort(meeting.scheduledAt)}</span>
                            <span className="month-event-title">{customer.siteName}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  // ============================================================================
  // CUSTOMERS LIST VIEW
  // ============================================================================

  const CustomersListView = () => {
    const filteredCustomers = db.customers.filter(customer => {
      const matchesSearch = customer.siteName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           customer.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           customer.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           customer.city.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterStatus === 'ALL' || customer.dealStage === filterStatus;
      return matchesSearch && matchesFilter;
    });

    return (
      <div className="space-y-6">
        {/* Header with Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="page-title">All Customers</h1>
            <p className="page-subtitle">{filteredCustomers.length} total customers</p>
          </div>
          <button 
            className="btn-primary"
            onClick={() => {
              setEditingCustomer({
                id: null,
                siteName: '',
                city: '',
                firstName: '',
                lastName: '',
                emailPOC: '',
                emailTechnicalPOC: '',
                emailTechnicalExternalPOC: '',
                hubspotId: '',
                dealStage: 'TRIAL',
                meetingInterval: '1_MONTH',
                status: 'ACTIVE',
                metadata: {}
              });
            }}
          >
            <Plus size={20} />
            Add Customer
          </button>
        </div>

        {/* Filters */}
        <div className="filters-bar">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <select 
            className="filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="ALL">All Stages</option>
            <option value="PAYING">Paying</option>
            <option value="TRIAL">Trial</option>
            <option value="CHURNED">Churned</option>
          </select>
        </div>

        {/* Customer Cards */}
        <div className="grid grid-cols-1 gap-4">
          {filteredCustomers.map(customer => {
            const nextMeeting = db.meetings.find(m => 
              m.customerId === customer.id && m.status === 'SCHEDULED'
            );
            
            return (
              <div key={customer.id} className="customer-card">
                <div className="customer-main">
                  <div className="customer-info">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="customer-name">{customer.siteName}</h3>
                        <div className="customer-contact">
                          <span>{customer.firstName} {customer.lastName}</span>
                          <span className="separator">•</span>
                          <span className="customer-email">{customer.emailPOC}</span>
                        </div>
                      </div>
                      <div className={`status-badge ${customer.dealStage.toLowerCase()}`}>
                        {customer.dealStage}
                      </div>
                    </div>
                    <div className="customer-meta">
                      <div className="meta-item">
                        <Clock size={14} />
                        <span>{getIntervalLabel(customer.meetingInterval)}</span>
                      </div>
                      {nextMeeting && (
                        <div className="meta-item">
                          <Calendar size={14} />
                          <span>Next: {formatDate(nextMeeting.scheduledAt)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="customer-actions">
                  <button 
                    className="btn-icon"
                    onClick={() => setEditingCustomer(customer)}
                    title="Edit customer"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    className="btn-secondary"
                    onClick={() => {
                      setSelectedCustomer(customer);
                      setCurrentView('customer-detail');
                    }}
                  >
                    View Details
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCustomers.length === 0 && (
          <div className="empty-state">
            <Users size={48} />
            <p>No customers found</p>
          </div>
        )}
      </div>
    );
  };

  // ============================================================================
  // CUSTOMER DETAIL VIEW
  // ============================================================================

  const CustomerDetailView = () => {
    if (!selectedCustomer) return null;

    const customerMeetings = db.meetings
      .filter(m => m.customerId === selectedCustomer.id)
      .sort((a, b) => new Date(b.scheduledAt) - new Date(a.scheduledAt));

    const nextMeeting = customerMeetings.find(m => m.status === 'SCHEDULED');

    return (
      <div className="space-y-6">
        {/* Back Button */}
        <button 
          className="btn-back"
          onClick={() => setCurrentView('customers')}
        >
          ← Back to Customers
        </button>

        {/* Customer Header */}
        <div className="customer-detail-header">
          <div className="customer-detail-info">
            <h1 className="customer-detail-name">{selectedCustomer.siteName}</h1>
            <div className="customer-detail-contact">
              <div className="contact-item">
                <Users size={16} />
                <span>{selectedCustomer.firstName} {selectedCustomer.lastName}</span>
              </div>
              <div className="contact-item">
                <Mail size={16} />
                <span>{selectedCustomer.emailPOC}</span>
              </div>
              <div className="contact-item">
                <Calendar size={16} />
                <span>{selectedCustomer.city}</span>
              </div>
            </div>
            <div className="customer-detail-meta">
              <span className="meta-label">Meeting Interval:</span>
              <span className="meta-value">{getIntervalLabel(selectedCustomer.meetingInterval)}</span>
              <span className="separator">•</span>
              <span className={`status-badge ${selectedCustomer.dealStage.toLowerCase()}`}>
                {selectedCustomer.dealStage}
              </span>
              <span className="separator">•</span>
              <span className="meta-label">HubSpot ID:</span>
              <span className="meta-value">{selectedCustomer.hubspotId}</span>
            </div>
          </div>
          <div className="customer-detail-actions">
            <button 
              className="btn-secondary"
              onClick={() => setEditingCustomer(selectedCustomer)}
            >
              <Edit2 size={18} />
              Edit
            </button>
          </div>
        </div>

        {/* Next Meeting */}
        {nextMeeting && (
          <div className="section-card highlight">
            <div className="section-header">
              <h2 className="section-title">
                <Calendar size={20} />
                Next Meeting
              </h2>
            </div>
            <div className="next-meeting-info">
              <div className="next-meeting-datetime">
                {formatDateTime(nextMeeting.scheduledAt)}
              </div>
              <div className="flex gap-3">
                <a 
                  href={nextMeeting.googleMeetLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <Video size={18} />
                  Join Google Meet
                </a>
                <button className="btn-secondary">
                  Reschedule
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Meeting History */}
        <div className="section-card">
          <div className="section-header">
            <h2 className="section-title">
              <FileText size={20} />
              Meeting History
            </h2>
          </div>

          {customerMeetings.length > 0 ? (
            <div className="space-y-3">
              {customerMeetings.map(meeting => {
                const protocol = db.protocols.find(p => p.meetingId === meeting.id);
                
                return (
                  <div key={meeting.id} className="history-item">
                    <div className="history-info">
                      <div className="history-date">{formatDate(meeting.scheduledAt)}</div>
                      <div className={`history-status ${meeting.status.toLowerCase()}`}>
                        {meeting.status === 'COMPLETED' && <CheckCircle size={16} />}
                        {meeting.status === 'SCHEDULED' && <Clock size={16} />}
                        {meeting.status === 'NO_SHOW' && <AlertCircle size={16} />}
                        {meeting.status}
                      </div>
                    </div>
                    {protocol && (
                      <button 
                        className="btn-link"
                        onClick={() => {
                          setSelectedMeeting(meeting);
                          setCurrentView('protocol');
                        }}
                      >
                        {protocol.status === 'COMPLETED' ? 'View Protocol' : 'Complete Protocol'}
                        <ChevronRight size={16} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty-state-small">
              <p>No meeting history yet</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ============================================================================
  // PROTOCOL VIEW
  // ============================================================================

  const ProtocolView = () => {
    if (!selectedMeeting) return null;

    const customer = db.customers.find(c => c.id === selectedMeeting.customerId);
    const protocol = db.protocols.find(p => p.meetingId === selectedMeeting.id);
    
    if (!protocol) {
      return (
        <div className="empty-state">
          <FileText size={48} />
          <p>No protocol found for this meeting</p>
        </div>
      );
    }

    const [answers, setAnswers] = useState(() => {
      const existingAnswers = db.answers.filter(a => a.protocolId === protocol.id);
      const answerMap = {};
      existingAnswers.forEach(a => {
        answerMap[a.questionId] = a.answerValue;
      });
      return answerMap;
    });

    const handleAnswerChange = (questionId, value) => {
      setAnswers(prev => ({
        ...prev,
        [questionId]: value
      }));
    };

    const handleSaveDraft = () => {
      alert('Protocol saved as draft');
    };

    const handleComplete = () => {
      const requiredQuestions = db.questions.filter(q => q.isRequired && q.isActive);
      const missingRequired = requiredQuestions.filter(q => !answers[q.id]);
      
      if (missingRequired.length > 0) {
        alert(`Please answer all required questions: ${missingRequired.map(q => q.questionText).join(', ')}`);
        return;
      }

      // Update protocol status
      const updatedProtocols = db.protocols.map(p => 
        p.id === protocol.id 
          ? { ...p, status: 'COMPLETED', completedAt: new Date() }
          : p
      );

      // Update meeting status
      const updatedMeetings = db.meetings.map(m =>
        m.id === selectedMeeting.id
          ? { ...m, status: 'COMPLETED', completedAt: new Date() }
          : m
      );

      setDb({
        ...db,
        protocols: updatedProtocols,
        meetings: updatedMeetings
      });

      alert('Protocol completed! Emails sent to CSM and customer. Next meeting scheduled.');
      setCurrentView('dashboard');
    };

    const questionsByCategory = db.questions
      .filter(q => q.isActive)
      .reduce((acc, q) => {
        if (!acc[q.category]) acc[q.category] = [];
        acc[q.category].push(q);
        return acc;
      }, {});

    return (
      <div className="space-y-6">
        {/* Back Button */}
        <button 
          className="btn-back"
          onClick={() => {
            setSelectedMeeting(null);
            setCurrentView(selectedCustomer ? 'customer-detail' : 'dashboard');
          }}
        >
          ← Back
        </button>

        {/* Protocol Header */}
        <div className="protocol-header">
          <div>
            <h1 className="protocol-title">Meeting Protocol - {customer.siteName}</h1>
            <div className="protocol-meta">
              <span>Scheduled: {formatDateTime(selectedMeeting.scheduledAt)}</span>
              <span className="separator">•</span>
              <span className={`status-badge ${protocol.status.toLowerCase()}`}>
                {protocol.status.replace('_', ' ')}
              </span>
            </div>
          </div>
        </div>

        {/* Protocol Form */}
        <div className="protocol-form">
          {Object.entries(questionsByCategory).map(([category, questions]) => (
            <div key={category} className="protocol-category">
              <h3 className="category-title">{category}</h3>
              <div className="space-y-6">
                {questions.map((question, idx) => (
                  <div key={question.id} className="question-block">
                    <label className="question-label">
                      {idx + 1}. {question.questionText}
                      {question.isRequired && <span className="required">*</span>}
                    </label>

                    {question.questionType === 'RATING' && (
                      <div className="rating-input">
                        {[1, 2, 3, 4, 5].map(rating => (
                          <button
                            key={rating}
                            type="button"
                            className={`rating-star ${answers[question.id]?.rating >= rating ? 'active' : ''}`}
                            onClick={() => handleAnswerChange(question.id, { rating })}
                          >
                            ★
                          </button>
                        ))}
                        {answers[question.id]?.rating && (
                          <span className="rating-label">{answers[question.id].rating}/5</span>
                        )}
                      </div>
                    )}

                    {question.questionType === 'TEXT' && (
                      <input
                        type="text"
                        className="text-input"
                        value={answers[question.id]?.text || ''}
                        onChange={(e) => handleAnswerChange(question.id, { text: e.target.value })}
                        placeholder="Enter your answer..."
                      />
                    )}

                    {question.questionType === 'TEXTAREA' && (
                      <textarea
                        className="textarea-input"
                        rows={4}
                        value={answers[question.id]?.text || ''}
                        onChange={(e) => handleAnswerChange(question.id, { text: e.target.value })}
                        placeholder="Enter detailed answer..."
                      />
                    )}

                    {question.questionType === 'NUMBER' && (
                      <input
                        type="number"
                        className="number-input"
                        value={answers[question.id]?.number || ''}
                        onChange={(e) => handleAnswerChange(question.id, { number: parseInt(e.target.value) || 0 })}
                        placeholder="Enter number..."
                      />
                    )}

                    {question.questionType === 'BOOLEAN' && (
                      <div className="boolean-input">
                        <label className="boolean-option">
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            checked={answers[question.id]?.boolean === true}
                            onChange={() => handleAnswerChange(question.id, { boolean: true })}
                          />
                          <span>Yes</span>
                        </label>
                        <label className="boolean-option">
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            checked={answers[question.id]?.boolean === false}
                            onChange={() => handleAnswerChange(question.id, { boolean: false })}
                          />
                          <span>No</span>
                        </label>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        {protocol.status !== 'COMPLETED' && (
          <div className="protocol-actions">
            <button className="btn-secondary" onClick={handleSaveDraft}>
              <Save size={18} />
              Save Draft
            </button>
            <button className="btn-primary" onClick={handleComplete}>
              <CheckCircle size={18} />
              Mark Complete & Send
            </button>
          </div>
        )}

        {protocol.status === 'COMPLETED' && (
          <div className="protocol-completed-notice">
            <CheckCircle size={20} />
            <span>This protocol was completed on {formatDate(protocol.completedAt)}</span>
          </div>
        )}
      </div>
    );
  };

  // ============================================================================
  // CUSTOMER FORM MODAL
  // ============================================================================

  const CustomerFormModal = () => {
    if (!editingCustomer) return null;

    const [formData, setFormData] = useState(editingCustomer);

    const handleSubmit = (e) => {
      e.preventDefault();
      
      if (formData.id) {
        // Update existing
        setDb({
          ...db,
          customers: db.customers.map(c => c.id === formData.id ? formData : c)
        });
      } else {
        // Create new
        const newCustomer = {
          ...formData,
          id: Math.max(...db.customers.map(c => c.id)) + 1,
          assignedCsmId: 1,
          createdAt: new Date(),
          goLiveDate: new Date(),
          nextAppointment: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          lastAppointment: null,
          renewalDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          endDate: new Date(Date.now() + 730 * 24 * 60 * 60 * 1000)
        };
        setDb({
          ...db,
          customers: [...db.customers, newCustomer]
        });
      }

      setEditingCustomer(null);
    };

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">
              {formData.id ? 'Edit Customer' : 'Add New Customer'}
            </h2>
            <button 
              className="modal-close"
              onClick={() => setEditingCustomer(null)}
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="modal-form">
            <div className="form-group">
              <label className="form-label">Site Name *</label>
              <input
                type="text"
                required
                className="form-input"
                value={formData.siteName}
                onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">City *</label>
              <input
                type="text"
                required
                className="form-input"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">First Name *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Last Name *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">E-Mail POC *</label>
              <input
                type="email"
                required
                className="form-input"
                value={formData.emailPOC}
                onChange={(e) => setFormData({ ...formData, emailPOC: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">E-Mail Technical POC</label>
              <input
                type="email"
                className="form-input"
                value={formData.emailTechnicalPOC}
                onChange={(e) => setFormData({ ...formData, emailTechnicalPOC: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">E-Mail Technical External POC</label>
              <input
                type="email"
                className="form-input"
                value={formData.emailTechnicalExternalPOC}
                onChange={(e) => setFormData({ ...formData, emailTechnicalExternalPOC: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">HubSpot ID</label>
              <input
                type="text"
                className="form-input"
                value={formData.hubspotId}
                onChange={(e) => setFormData({ ...formData, hubspotId: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Meeting Interval *</label>
              <select
                required
                className="form-select"
                value={formData.meetingInterval}
                onChange={(e) => setFormData({ ...formData, meetingInterval: e.target.value })}
              >
                <option value="1_MONTH">Every 1 month</option>
                <option value="2_MONTHS">Every 2 months</option>
                <option value="3_MONTHS">Every 3 months</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Deal Stage</label>
              <select
                className="form-select"
                value={formData.dealStage}
                onChange={(e) => setFormData({ ...formData, dealStage: e.target.value })}
              >
                <option value="TRIAL">Trial</option>
                <option value="PAYING">Paying</option>
                <option value="CHURNED">Churned</option>
              </select>
            </div>

            <div className="modal-actions">
              <button type="button" className="btn-secondary" onClick={() => setEditingCustomer(null)}>
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                {formData.id ? 'Update Customer' : 'Create Customer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // ============================================================================
  // MAIN LAYOUT
  // ============================================================================

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <Activity size={28} />
            <span>CustomerSuccess</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`}
            onClick={() => {
              setCurrentView('dashboard');
              setSelectedCustomer(null);
              setSelectedMeeting(null);
            }}
          >
            <TrendingUp size={20} />
            <span>Dashboard</span>
          </button>
          <button 
            className={`nav-item ${currentView === 'calendar' ? 'active' : ''}`}
            onClick={() => {
              setCurrentView('calendar');
              setSelectedCustomer(null);
              setSelectedMeeting(null);
            }}
          >
            <Calendar size={20} />
            <span>Calendar</span>
          </button>
          <button 
            className={`nav-item ${currentView === 'customers' ? 'active' : ''}`}
            onClick={() => {
              setCurrentView('customers');
              setSelectedCustomer(null);
              setSelectedMeeting(null);
            }}
          >
            <Users size={20} />
            <span>Customers</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">SM</div>
            <div className="user-info">
              <div className="user-name">Sarah Martinez</div>
              <div className="user-role">CS Manager</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-wrapper">
          {currentView === 'dashboard' && <DashboardView />}
          {currentView === 'calendar' && <CalendarView />}
          {currentView === 'customers' && <CustomersListView />}
          {currentView === 'customer-detail' && <CustomerDetailView />}
          {currentView === 'protocol' && <ProtocolView />}
        </div>
      </main>

      {/* Modal */}
      {editingCustomer && <CustomerFormModal />}

      {/* Styles with Lynxight Branding */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
          background: #f5f7fa;
          color: #1a1f36;
        }

        .app-container {
          display: flex;
          min-height: 100vh;
        }

        /* ===== SIDEBAR - LYNXIGHT STYLE ===== */
        .sidebar {
          width: 260px;
          background: linear-gradient(180deg, #1a1f36 0%, #0f1419 100%);
          color: white;
          display: flex;
          flex-direction: column;
          position: fixed;
          height: 100vh;
          left: 0;
          top: 0;
          z-index: 100;
          box-shadow: 4px 0 20px rgba(0, 212, 255, 0.1);
        }

        .sidebar-header {
          padding: 28px 20px;
          border-bottom: 1px solid rgba(77, 212, 255, 0.2);
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 20px;
          font-weight: 700;
          color: #4dd4ff;
          letter-spacing: -0.5px;
        }

        .sidebar-nav {
          flex: 1;
          padding: 24px 12px;
        }

        .nav-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 18px;
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.7);
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          border-radius: 10px;
          transition: all 0.3s ease;
          margin-bottom: 6px;
          position: relative;
        }

        .nav-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 60%;
          background: linear-gradient(135deg, #00d4ff 0%, #4dd4ff 100%);
          border-radius: 0 4px 4px 0;
          transition: width 0.3s ease;
        }

        .nav-item:hover {
          background: rgba(77, 212, 255, 0.1);
          color: #4dd4ff;
        }

        .nav-item.active {
          background: rgba(77, 212, 255, 0.15);
          color: #4dd4ff;
        }

        .nav-item.active::before {
          width: 4px;
        }

        .sidebar-footer {
          padding: 20px;
          border-top: 1px solid rgba(77, 212, 255, 0.2);
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .user-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00d4ff 0%, #4dd4ff 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
          box-shadow: 0 4px 12px rgba(77, 212, 255, 0.3);
        }

        .user-info {
          flex: 1;
        }

        .user-name {
          font-size: 14px;
          font-weight: 600;
          color: white;
        }

        .user-role {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
        }

        /* ===== MAIN CONTENT ===== */
        .main-content {
          flex: 1;
          margin-left: 260px;
          background: #f5f7fa;
          min-height: 100vh;
        }

        .content-wrapper {
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px;
        }

        /* ===== METRICS CARDS - LYNXIGHT STYLE ===== */
        .metric-card {
          background: white;
          border-radius: 16px;
          padding: 28px;
          display: flex;
          align-items: center;
          gap: 24px;
          box-shadow: 0 2px 8px rgba(26, 31, 54, 0.08);
          transition: all 0.3s ease;
          border: 1px solid rgba(77, 212, 255, 0.1);
        }

        .metric-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(77, 212, 255, 0.15);
        }

        .metric-icon {
          width: 64px;
          height: 64px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          position: relative;
          overflow: hidden;
        }

        .metric-icon::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%);
        }

        .metric-icon.this-week {
          background: linear-gradient(135deg, #00d4ff 0%, #4dd4ff 100%);
          box-shadow: 0 4px 16px rgba(77, 212, 255, 0.3);
        }

        .metric-icon.overdue {
          background: linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%);
          box-shadow: 0 4px 16px rgba(255, 107, 107, 0.3);
        }

        .metric-icon.completed {
          background: linear-gradient(135deg, #51cf66 0%, #37b24d 100%);
          box-shadow: 0 4px 16px rgba(81, 207, 102, 0.3);
        }

        .metric-content {
          flex: 1;
        }

        .metric-label {
          font-size: 13px;
          color: #6c757d;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }

        .metric-value {
          font-size: 36px;
          font-weight: 800;
          color: #1a1f36;
          line-height: 1;
        }

        .metric-sublabel {
          font-size: 13px;
          color: #9ca3af;
          margin-top: 6px;
        }

        /* ===== SECTION CARDS ===== */
        .section-card {
          background: white;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 2px 8px rgba(26, 31, 54, 0.08);
          border: 1px solid rgba(77, 212, 255, 0.1);
        }

        .section-card.alert {
          border-left: 4px solid #ff8e53;
          background: linear-gradient(90deg, rgba(255, 142, 83, 0.05) 0%, white 100%);
        }

        .section-card.highlight {
          background: linear-gradient(135deg, rgba(0, 212, 255, 0.05) 0%, rgba(77, 212, 255, 0.05) 100%);
          border: 2px solid rgba(77, 212, 255, 0.3);
        }

        .section-header {
          margin-bottom: 28px;
        }

        .section-title {
          font-size: 20px;
          font-weight: 700;
          color: #1a1f36;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        /* ===== MEETINGS ===== */
        .meeting-day-label {
          font-size: 11px;
          font-weight: 800;
          color: #6c757d;
          letter-spacing: 1px;
          margin-bottom: 14px;
          text-transform: uppercase;
        }

        .meeting-item {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 18px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          transition: all 0.3s ease;
          border: 1px solid #e9ecef;
        }

        .meeting-item:hover {
          background: white;
          transform: translateX(6px);
          box-shadow: 0 4px 12px rgba(77, 212, 255, 0.1);
          border-color: #4dd4ff;
        }

        .meeting-item.today {
          background: linear-gradient(135deg, rgba(0, 212, 255, 0.08) 0%, rgba(77, 212, 255, 0.08) 100%);
          border: 2px solid #4dd4ff;
        }

        .meeting-info {
          flex: 1;
        }

        .meeting-company {
          font-size: 16px;
          font-weight: 700;
          color: #1a1f36;
          margin-bottom: 6px;
        }

        .meeting-time {
          font-size: 13px;
          color: #6c757d;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .meeting-actions {
          display: flex;
          gap: 10px;
        }

        .btn-meet {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: linear-gradient(135deg, #00d4ff 0%, #4dd4ff 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          box-shadow: 0 4px 12px rgba(77, 212, 255, 0.3);
        }

        .btn-meet:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(77, 212, 255, 0.4);
        }

        .btn-protocol {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: white;
          color: #00d4ff;
          border: 2px solid #00d4ff;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-protocol:hover {
          background: #00d4ff;
          color: white;
          transform: translateY(-2px);
        }

        /* ===== ACTION ITEMS ===== */
        .action-item {
          background: linear-gradient(135deg, #fff3e0 0%, #ffe5b4 100%);
          border-left: 4px solid #ff8e53;
          border-radius: 10px;
          padding: 18px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }

        .action-info {
          flex: 1;
        }

        .action-title {
          font-size: 15px;
          font-weight: 700;
          color: #c05621;
          margin-bottom: 4px;
        }

        .action-date {
          font-size: 13px;
          color: #d97706;
        }

        .btn-action {
          padding: 10px 20px;
          background: #ff8e53;
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(255, 142, 83, 0.3);
        }

        .btn-action:hover {
          background: #ff6b35;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 142, 83, 0.4);
        }

        /* ===== BUTTONS - LYNXIGHT STYLE ===== */
        .btn-primary {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          background: linear-gradient(135deg, #00d4ff 0%, #4dd4ff 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(77, 212, 255, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 24px rgba(77, 212, 255, 0.4);
        }

        .btn-secondary {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px;
          background: white;
          color: #1a1f36;
          border: 2px solid #e9ecef;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-secondary:hover {
          border-color: #4dd4ff;
          color: #00d4ff;
          transform: translateY(-2px);
        }

        .btn-secondary-small {
          padding: 8px 18px;
          background: white;
          color: #1a1f36;
          border: 2px solid #e9ecef;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-secondary-small:hover {
          border-color: #4dd4ff;
          color: #00d4ff;
        }

        .btn-back {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: transparent;
          color: #00d4ff;
          border: none;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-back:hover {
          color: #4dd4ff;
          transform: translateX(-4px);
        }

        .btn-icon {
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          color: #6c757d;
          border: 2px solid #e9ecef;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-icon:hover {
          border-color: #4dd4ff;
          color: #00d4ff;
        }

        .btn-link {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          background: transparent;
          color: #00d4ff;
          border: none;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-link:hover {
          color: #4dd4ff;
        }

        /* ===== PAGE HEADER ===== */
        .page-title {
          font-size: 32px;
          font-weight: 800;
          color: #1a1f36;
          margin-bottom: 6px;
          letter-spacing: -0.5px;
        }

        .page-subtitle {
          font-size: 14px;
          color: #6c757d;
        }

        /* ===== FILTERS ===== */
        .filters-bar {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .search-box {
          flex: 1;
          min-width: 280px;
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-box svg {
          position: absolute;
          left: 16px;
          color: #9ca3af;
        }

        .search-input {
          width: 100%;
          padding: 14px 14px 14px 48px;
          background: white;
          border: 2px solid #e9ecef;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #4dd4ff;
          box-shadow: 0 0 0 3px rgba(77, 212, 255, 0.1);
        }

        .filter-select {
          padding: 14px 18px;
          background: white;
          border: 2px solid #e9ecef;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-select:focus {
          outline: none;
          border-color: #4dd4ff;
          box-shadow: 0 0 0 3px rgba(77, 212, 255, 0.1);
        }

        /* ===== CUSTOMER CARDS ===== */
        .customer-card {
          background: white;
          border-radius: 14px;
          padding: 24px 28px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
          box-shadow: 0 2px 8px rgba(26, 31, 54, 0.08);
          transition: all 0.3s ease;
          border: 1px solid rgba(77, 212, 255, 0.1);
        }

        .customer-card:hover {
          box-shadow: 0 6px 20px rgba(77, 212, 255, 0.15);
          transform: translateY(-3px);
          border-color: #4dd4ff;
        }

        .customer-main {
          flex: 1;
        }

        .customer-info {
          margin-bottom: 14px;
        }

        .customer-name {
          font-size: 19px;
          font-weight: 800;
          color: #1a1f36;
          margin-bottom: 8px;
        }

        .customer-contact {
          font-size: 14px;
          color: #6c757d;
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .customer-email {
          color: #00d4ff;
          font-weight: 600;
        }

        .separator {
          color: #d1d5db;
        }

        .customer-meta {
          display: flex;
          align-items: center;
          gap: 18px;
          flex-wrap: wrap;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #6c757d;
          font-weight: 500;
        }

        .meta-label {
          font-size: 13px;
          color: #9ca3af;
        }

        .meta-value {
          font-size: 13px;
          font-weight: 700;
          color: #1a1f36;
        }

        .status-badge {
          padding: 5px 14px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-badge.active {
          background: linear-gradient(135deg, #d3f9d8 0%, #b2f2bb 100%);
          color: #2b8a3e;
        }

        .status-badge.paying {
          background: linear-gradient(135deg, #d3f9d8 0%, #b2f2bb 100%);
          color: #2b8a3e;
        }

        .status-badge.trial {
          background: linear-gradient(135deg, #d0ebff 0%, #a5d8ff 100%);
          color: #1864ab;
        }

        .status-badge.paused {
          background: linear-gradient(135deg, #fff3e0 0%, #ffe5b4 100%);
          color: #c05621;
        }

        .status-badge.churned {
          background: linear-gradient(135deg, #ffe0e0 0%, #ffc9c9 100%);
          color: #c92a2a;
        }

        .status-badge.scheduled {
          background: linear-gradient(135deg, #d0ebff 0%, #a5d8ff 100%);
          color: #1864ab;
        }

        .status-badge.completed {
          background: linear-gradient(135deg, #d3f9d8 0%, #b2f2bb 100%);
          color: #2b8a3e;
        }

        .status-badge.no_show {
          background: linear-gradient(135deg, #ffe0e0 0%, #ffc9c9 100%);
          color: #c92a2a;
        }

        .status-badge.draft,
        .status-badge.in_progress {
          background: linear-gradient(135deg, #fff3e0 0%, #ffe5b4 100%);
          color: #c05621;
        }

        .customer-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        /* ===== CUSTOMER DETAIL ===== */
        .customer-detail-header {
          background: white;
          border-radius: 16px;
          padding: 36px;
          box-shadow: 0 2px 8px rgba(26, 31, 54, 0.08);
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 28px;
          border: 1px solid rgba(77, 212, 255, 0.1);
        }

        .customer-detail-info {
          flex: 1;
        }

        .customer-detail-name {
          font-size: 36px;
          font-weight: 800;
          color: #1a1f36;
          margin-bottom: 18px;
          letter-spacing: -0.5px;
        }

        .customer-detail-contact {
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
          margin-bottom: 18px;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #6c757d;
          font-weight: 500;
        }

        .customer-detail-meta {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .customer-detail-actions {
          display: flex;
          gap: 12px;
        }

        /* ===== NEXT MEETING ===== */
        .next-meeting-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }

        .next-meeting-datetime {
          font-size: 22px;
          font-weight: 800;
          background: linear-gradient(135deg, #00d4ff 0%, #4dd4ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ===== HISTORY ===== */
        .history-item {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 18px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          border: 1px solid #e9ecef;
          transition: all 0.3s ease;
        }

        .history-item:hover {
          background: white;
          border-color: #4dd4ff;
          transform: translateX(4px);
        }

        .history-info {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .history-date {
          font-size: 15px;
          font-weight: 700;
          color: #1a1f36;
        }

        .history-status {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 5px 14px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .history-status.completed {
          background: linear-gradient(135deg, #d3f9d8 0%, #b2f2bb 100%);
          color: #2b8a3e;
        }

        .history-status.scheduled {
          background: linear-gradient(135deg, #d0ebff 0%, #a5d8ff 100%);
          color: #1864ab;
        }

        .history-status.no_show {
          background: linear-gradient(135deg, #ffe0e0 0%, #ffc9c9 100%);
          color: #c92a2a;
        }

        /* ===== PROTOCOL ===== */
        .protocol-header {
          background: white;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 2px 8px rgba(26, 31, 54, 0.08);
          border: 1px solid rgba(77, 212, 255, 0.1);
        }

        .protocol-title {
          font-size: 26px;
          font-weight: 800;
          color: #1a1f36;
          margin-bottom: 10px;
          letter-spacing: -0.5px;
        }

        .protocol-meta {
          display: flex;
          align-items: center;
          gap: 14px;
          font-size: 14px;
          color: #6c757d;
          flex-wrap: wrap;
        }

        .protocol-form {
          background: white;
          border-radius: 16px;
          padding: 36px;
          box-shadow: 0 2px 8px rgba(26, 31, 54, 0.08);
          border: 1px solid rgba(77, 212, 255, 0.1);
        }

        .protocol-category {
          margin-bottom: 44px;
        }

        .protocol-category:last-child {
          margin-bottom: 0;
        }

        .category-title {
          font-size: 20px;
          font-weight: 800;
          background: linear-gradient(135deg, #00d4ff 0%, #4dd4ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 28px;
          padding-bottom: 14px;
          border-bottom: 2px solid rgba(77, 212, 255, 0.2);
        }

        .question-block {
          margin-bottom: 36px;
        }

        .question-block:last-child {
          margin-bottom: 0;
        }

        .question-label {
          display: block;
          font-size: 15px;
          font-weight: 700;
          color: #1a1f36;
          margin-bottom: 14px;
        }

        .required {
          color: #ff6b35;
          margin-left: 4px;
        }

        .rating-input {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .rating-star {
          width: 48px;
          height: 48px;
          background: white;
          border: 2px solid #e9ecef;
          border-radius: 10px;
          font-size: 28px;
          color: #d1d5db;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .rating-star:hover {
          border-color: #ffd43b;
          color: #ffd43b;
          transform: scale(1.1);
        }

        .rating-star.active {
          border-color: #ffd43b;
          background: linear-gradient(135deg, #fff3bf 0%, #ffe066 100%);
          color: #fab005;
          box-shadow: 0 4px 12px rgba(255, 212, 59, 0.3);
        }

        .rating-label {
          font-size: 14px;
          font-weight: 700;
          color: #6c757d;
          margin-left: 10px;
        }

        .text-input,
        .textarea-input,
        .number-input {
          width: 100%;
          padding: 14px 18px;
          background: white;
          border: 2px solid #e9ecef;
          border-radius: 12px;
          font-size: 14px;
          font-family: inherit;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .text-input:focus,
        .textarea-input:focus,
        .number-input:focus {
          outline: none;
          border-color: #4dd4ff;
          box-shadow: 0 0 0 3px rgba(77, 212, 255, 0.1);
        }

        .textarea-input {
          resize: vertical;
          min-height: 120px;
        }

        .boolean-input {
          display: flex;
          gap: 16px;
        }

        .boolean-option {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 24px;
          background: white;
          border: 2px solid #e9ecef;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .boolean-option:hover {
          border-color: #4dd4ff;
        }

        .boolean-option input[type="radio"] {
          width: 20px;
          height: 20px;
          cursor: pointer;
          accent-color: #00d4ff;
        }

        .boolean-option input[type="radio"]:checked + span {
          font-weight: 700;
          color: #00d4ff;
        }

        .protocol-actions {
          display: flex;
          justify-content: flex-end;
          gap: 14px;
          background: white;
          border-radius: 16px;
          padding: 28px;
          box-shadow: 0 2px 8px rgba(26, 31, 54, 0.08);
          border: 1px solid rgba(77, 212, 255, 0.1);
        }

        .protocol-completed-notice {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 18px;
          background: linear-gradient(135deg, #d3f9d8 0%, #b2f2bb 100%);
          color: #2b8a3e;
          border-radius: 12px;
          font-weight: 700;
        }

        /* ===== MODAL ===== */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(26, 31, 54, 0.7);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-content {
          background: white;
          border-radius: 20px;
          max-width: 600px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 24px 60px rgba(77, 212, 255, 0.2);
          border: 1px solid rgba(77, 212, 255, 0.2);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 28px 32px;
          border-bottom: 1px solid rgba(77, 212, 255, 0.2);
        }

        .modal-title {
          font-size: 22px;
          font-weight: 800;
          color: #1a1f36;
        }

        .modal-close {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8f9fa;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          color: #6c757d;
          transition: all 0.3s ease;
        }

        .modal-close:hover {
          background: #e9ecef;
          color: #1a1f36;
        }

        .modal-form {
          padding: 32px;
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-label {
          display: block;
          font-size: 14px;
          font-weight: 700;
          color: #1a1f36;
          margin-bottom: 10px;
        }

        .form-input,
        .form-select {
          width: 100%;
          padding: 14px 18px;
          background: white;
          border: 2px solid #e9ecef;
          border-radius: 12px;
          font-size: 14px;
          font-family: inherit;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .form-input:focus,
        .form-select:focus {
          outline: none;
          border-color: #4dd4ff;
          box-shadow: 0 0 0 3px rgba(77, 212, 255, 0.1);
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 14px;
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid rgba(77, 212, 255, 0.2);
        }

        /* ===== EMPTY STATE ===== */
        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: #9ca3af;
        }

        .empty-state svg {
          margin: 0 auto 18px;
          opacity: 0.4;
        }

        .empty-state p {
          font-size: 15px;
          font-weight: 600;
        }

        .empty-state-small {
          text-align: center;
          padding: 40px 20px;
          color: #9ca3af;
        }

        .empty-state-small p {
          font-size: 14px;
          font-weight: 500;
        }

        /* ===== CALENDAR STYLES ===== */
        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
          margin-bottom: 8px;
        }

        .calendar-title-section {
          flex: 1;
        }

        .calendar-controls {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .calendar-nav-buttons {
          display: flex;
          gap: 6px;
        }

        .view-toggle {
          display: flex;
          background: white;
          border: 2px solid #e9ecef;
          border-radius: 10px;
          padding: 3px;
        }

        .toggle-btn {
          padding: 8px 20px;
          background: transparent;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          color: #6c757d;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .toggle-btn.active {
          background: linear-gradient(135deg, #00d4ff 0%, #4dd4ff 100%);
          color: white;
          box-shadow: 0 2px 8px rgba(77, 212, 255, 0.3);
        }

        /* === WEEK VIEW === */
        .calendar-week-view {
          background: white;
          border-radius: 16px;
          box-shadow: 0 2px 8px rgba(26, 31, 54, 0.08);
          border: 1px solid rgba(77, 212, 255, 0.1);
          overflow: hidden;
        }

        .week-grid {
          display: grid;
          grid-template-columns: 80px repeat(5, 1fr);
          min-height: 600px;
        }

        .time-column {
          border-right: 1px solid #e9ecef;
          background: #f8f9fa;
        }

        .time-header {
          height: 70px;
          border-bottom: 1px solid #e9ecef;
        }

        .time-slot-label {
          height: 60px;
          padding: 8px 12px;
          font-size: 12px;
          font-weight: 600;
          color: #6c757d;
          border-bottom: 1px solid #e9ecef;
          display: flex;
          align-items: flex-start;
        }

        .day-column {
          border-right: 1px solid #e9ecef;
        }

        .day-column:last-child {
          border-right: none;
        }

        .day-header {
          height: 70px;
          padding: 12px;
          border-bottom: 2px solid #e9ecef;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          background: #f8f9fa;
        }

        .day-header.today {
          background: linear-gradient(135deg, rgba(0, 212, 255, 0.08) 0%, rgba(77, 212, 255, 0.08) 100%);
        }

        .day-name {
          font-size: 12px;
          font-weight: 700;
          color: #6c757d;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .day-number {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 700;
          color: #1a1f36;
          border-radius: 50%;
        }

        .day-number.today-number {
          background: linear-gradient(135deg, #00d4ff 0%, #4dd4ff 100%);
          color: white;
          box-shadow: 0 2px 8px rgba(77, 212, 255, 0.3);
        }

        .time-slot {
          height: 60px;
          border-bottom: 1px solid #e9ecef;
          position: relative;
          padding: 2px;
        }

        .calendar-event {
          position: relative;
          padding: 6px 8px;
          margin: 2px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          border-left: 3px solid;
          font-size: 12px;
          overflow: hidden;
        }

        .calendar-event.scheduled {
          background: linear-gradient(135deg, #d0ebff 0%, #a5d8ff 100%);
          border-left-color: #1864ab;
        }

        .calendar-event.completed {
          background: linear-gradient(135deg, #d3f9d8 0%, #b2f2bb 100%);
          border-left-color: #2b8a3e;
        }

        .calendar-event:hover {
          transform: scale(1.02);
          box-shadow: 0 4px 12px rgba(77, 212, 255, 0.2);
        }

        .event-time {
          font-size: 11px;
          font-weight: 700;
          color: #1a1f36;
          margin-bottom: 2px;
        }

        .event-title {
          font-size: 12px;
          font-weight: 700;
          color: #1a1f36;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .event-subtitle {
          font-size: 10px;
          font-weight: 500;
          color: #6c757d;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* === MONTH VIEW === */
        .calendar-month-view {
          background: white;
          border-radius: 16px;
          box-shadow: 0 2px 8px rgba(26, 31, 54, 0.08);
          border: 1px solid rgba(77, 212, 255, 0.1);
          padding: 16px;
        }

        .month-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 1px;
          background: #e9ecef;
          border: 1px solid #e9ecef;
        }

        .weekday-header {
          background: #f8f9fa;
          padding: 12px 8px;
          text-align: center;
          font-size: 12px;
          font-weight: 700;
          color: #6c757d;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .month-day {
          background: white;
          min-height: 100px;
          padding: 8px;
          position: relative;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .month-day:hover {
          background: #f8f9fa;
        }

        .month-day.other-month {
          background: #f8f9fa;
          opacity: 0.5;
        }

        .month-day.today {
          background: linear-gradient(135deg, rgba(0, 212, 255, 0.05) 0%, rgba(77, 212, 255, 0.05) 100%);
          border: 2px solid #4dd4ff;
        }

        .month-day-number {
          font-size: 14px;
          font-weight: 700;
          color: #1a1f36;
          margin-bottom: 6px;
        }

        .month-day.today .month-day-number {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          background: linear-gradient(135deg, #00d4ff 0%, #4dd4ff 100%);
          color: white;
          border-radius: 50%;
        }

        .month-day-events {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .month-event {
          padding: 4px 6px;
          border-radius: 4px;
          font-size: 11px;
          cursor: pointer;
          transition: all 0.2s ease;
          border-left: 2px solid;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .month-event.scheduled {
          background: linear-gradient(135deg, #d0ebff 0%, #a5d8ff 100%);
          border-left-color: #1864ab;
        }

        .month-event.completed {
          background: linear-gradient(135deg, #d3f9d8 0%, #b2f2bb 100%);
          border-left-color: #2b8a3e;
        }

        .month-event:hover {
          transform: translateX(2px);
          box-shadow: 0 2px 6px rgba(77, 212, 255, 0.2);
        }

        .month-event-time {
          font-weight: 700;
          color: #1a1f36;
          white-space: nowrap;
        }

        .month-event-title {
          font-weight: 600;
          color: #1a1f36;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 1;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 768px) {
          .sidebar {
            width: 100%;
            height: auto;
            position: relative;
          }

          .main-content {
            margin-left: 0;
          }

          .content-wrapper {
            padding: 20px;
          }

          .metric-card {
            flex-direction: column;
            text-align: center;
          }

          .customer-card {
            flex-direction: column;
            align-items: stretch;
          }

          .customer-actions {
            justify-content: stretch;
          }

          .customer-actions button {
            flex: 1;
          }

          .calendar-header {
            flex-direction: column;
            align-items: stretch;
          }

          .calendar-controls {
            flex-wrap: wrap;
          }

          .week-grid {
            grid-template-columns: 60px repeat(5, 1fr);
            overflow-x: auto;
          }

          .month-grid {
            grid-template-columns: repeat(7, minmax(80px, 1fr));
          }

          .month-day {
            min-height: 80px;
          }
        }
      `}</style>
    </div>
  );
};

export default CustomerSuccessApp;