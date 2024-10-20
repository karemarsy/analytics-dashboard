// app/api/mock-data/route.ts
import { NextResponse } from 'next/server';

function generateVisitData() {
  const data = [];
  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toISOString().split('T')[0],
      pageViews: Math.floor(Math.random() * 1000) + 500,
      uniqueVisitors: Math.floor(Math.random() * 800) + 300,
      bounceRate: (Math.random() * 30 + 20).toFixed(1),
      avgSessionDuration: Math.floor(Math.random() * 300 + 120),
    });
  }
  
  return data;
}

function generateCustomerData() {
  const firstNames = ['John', 'Jane', 'Mike', 'Sarah', 'David', 'Emma', 'Chris', 'Lisa'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
  const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
  
  return Array.from({ length: 50 }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    
    return {
      id: i + 1,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`,
      signupDate: new Date(2024, 0, Math.floor(Math.random() * 30) + 1).toISOString(),
      lastActivity: new Date(2024, 2, Math.floor(Math.random() * 30) + 1).toISOString(),
    };
  });
}

export async function GET() {
  return NextResponse.json({
    visits: generateVisitData(),
    customers: generateCustomerData(),
  });
}