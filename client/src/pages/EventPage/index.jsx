import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';

const EventPage = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [hoveredDate, setHoveredDate] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);

    // Demo events data with past and future events
    const events = [
        {
            id: 1,
            title: "Past Tech Conference",
            date: "2024-01-15", // Past event
            time: "10:00 AM - 4:00 PM",
            location: "Convention Center",
            description: "Annual technology conference featuring the latest innovations",
            organizer: "Tech Corp",
            type: "Conference",
            tags: ["Technology", "Networking", "Innovation"]
        },
        {
            id: 2,
            title: "BGMI Tournament",
            date: "2024-02-07", // Current month event
            time: "2:00 PM - 5:00 PM",
            location: "Virtual Event",
            description: "Join the ultimate BGMI tournament and compete for exciting prizes",
            organizer: "Gaming Hub",
            type: "Tournament",
            tags: ["Gaming", "BGMI", "Competition"]
        },
        {
            id: 3,
            title: "Future Startup Event",
            date: "2024-03-20", // Future event
            time: "6:00 PM - 9:00 PM",
            location: "Innovation Center",
            description: "Connect with fellow entrepreneurs and investors",
            organizer: "Startup Hub",
            type: "Networking",
            tags: ["Startup", "Networking", "Business"]
        }
    ];

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
    const today = new Date();

    const getEventsForDate = (date) => {
        return events.filter(event => isSameDay(new Date(event.date), date));
    };

    const getEventStatus = (date) => {
        if (!hasEvents(date)) return null;

        const compareDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (isSameDay(compareDate, today)) return 'current';
        if (compareDate < today) return 'past';
        return 'upcoming';
    };

    const hasEvents = (date) => {
        return events.some(event => isSameDay(new Date(event.date), date));
    };

    const getEventHighlightColor = (status) => {
        switch (status) {
            case 'past':
                return 'bg-gray-100 hover:bg-gray-200';
            case 'current':
                return 'bg-green-100 hover:bg-green-200';
            case 'upcoming':
                return 'bg-blue-100 hover:bg-blue-200';
            default:
                return '';
        }
    };

    const getDotColor = (status) => {
        switch (status) {
            case 'past':
                return 'bg-gray-500';
            case 'current':
                return 'bg-green-500';
            case 'upcoming':
                return 'bg-blue-500';
            default:
                return 'bg-blue-500';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
            <Navbar />
            <div className="container mx-auto px-4 py-6 mt-20">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Events Calendar</h1>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Calendar Section */}
                    <div className="lg:w-[400px]">
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            {/* Calendar Header */}
                            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                                <button
                                    onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <h2 className="text-xl font-semibold text-gray-800">
                                    {format(currentDate, 'MMMM yyyy')}
                                </h2>
                                <button
                                    onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>

                            {/* Calendar Grid */}
                            <div className="p-4">
                                <div className="grid grid-cols-7 gap-1">
                                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                        <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                                            {day}
                                        </div>
                                    ))}

                                    {monthDays.map((day) => {
                                        const dayEvents = getEventsForDate(day);
                                        const hasEventToday = hasEvents(day);
                                        const eventStatus = getEventStatus(day);
                                        const isSelected = selectedDate && isSameDay(day, selectedDate);

                                        return (
                                            <div
                                                key={day.toString()}
                                                className={`
                                                    relative p-2 text-center cursor-pointer transition-all duration-200
                                                    ${!isSameMonth(day, currentDate) ? 'text-gray-400' : 'text-gray-700'}
                                                    ${hasEventToday ? getEventHighlightColor(eventStatus) : 'hover:bg-gray-50'}
                                                    ${isSelected ? 'ring-2 ring-blue-500' : ''}
                                                    ${isSameDay(day, today) ? 'font-bold' : ''}
                                                    rounded-lg
                                                `}
                                                onClick={() => setSelectedDate(day)}
                                                onMouseEnter={() => setHoveredDate(day)}
                                                onMouseLeave={() => setHoveredDate(null)}
                                            >
                                                {format(day, 'd')}
                                                {hasEventToday && (
                                                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                                                        <div className={`h-1 w-1 ${getDotColor(eventStatus)} rounded-full`}></div>
                                                    </div>
                                                )}

                                                {/* Event Tooltip */}
                                                {hoveredDate && isSameDay(day, hoveredDate) && dayEvents.length > 0 && (
                                                    <div className="absolute z-10 w-64 bg-white rounded-lg shadow-lg p-4 left-1/2 transform -translate-x-1/2 mt-2">
                                                        <div className="text-left">
                                                            <h4 className="font-semibold mb-2">Events on {format(day, 'MMM d, yyyy')}</h4>
                                                            {dayEvents.map((event) => (
                                                                <div key={event.id} className="mb-2 last:mb-0">
                                                                    <p className="font-medium text-gray-800">{event.title}</p>
                                                                    <p className="text-sm text-gray-600">{event.time}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="mt-4 bg-white rounded-xl shadow-md p-4">
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">Event Types</h3>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                                    <span className="text-sm text-gray-600">Past Events</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <span className="text-sm text-gray-600">Today's Events</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                    <span className="text-sm text-gray-600">Upcoming Events</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Events List Section */}
                    <div className="flex-1">
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6">
                                {selectedDate
                                    ? `Events on ${format(selectedDate, 'MMMM d, yyyy')}`
                                    : 'All Upcoming Events'
                                }
                            </h2>
                            <div className="space-y-4">
                                {(selectedDate ? getEventsForDate(selectedDate) : events).map((event) => (
                                    <div
                                        key={event.id}
                                        className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-800">{event.title}</h3>
                                                <p className="text-gray-600">{event.time}</p>
                                                <p className="text-gray-600">{event.location}</p>
                                                <p className="text-gray-600 mt-2">{event.description}</p>
                                                <div className="flex flex-wrap gap-2 mt-3">
                                                    {event.tags.map((tag, index) => (
                                                        <span
                                                            key={index}
                                                            className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                                {event.type}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                {selectedDate && getEventsForDate(selectedDate).length === 0 && (
                                    <p className="text-center text-gray-500">No events scheduled for this date.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventPage;
