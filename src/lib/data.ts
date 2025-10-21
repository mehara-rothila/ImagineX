// Mock data for events
export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  location: string;
  category: string;
  organizer: string;
  image: string;
  participants: Participant[];
  status: "past" | "ongoing" | "upcoming";
  attendeesCount: number;
}

export interface Participant {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface Feedback {
  id: string;
  eventId: string;
  participantId: string;
  participantName: string;
  participantEmail: string;
  rating: number;
  feedbackCategories: {
    venue: string;
    content: string;
    organization: string;
    overall: string;
  };
  recommendation: string;
  comments: string;
  improvements: string;
  submittedAt: string;
}

export const pastEvents: Event[] = [
  {
    id: "1",
    title: "Music in the Park: Summer Concert Series",
    date: "2024-10-15",
    description:
      "A comprehensive technology summit featuring the latest innovations in AI, cloud computing, and software development.",
    location: "Central Park, New York City, United States",
    category: "Dance & Music",
    organizer: "World Fusion Events",
    image: "/events/img1.jpg", // Place in public/events/
    status: "past",
    attendeesCount: 1200,
    participants: [
      {
        id: "p1",
        name: "John Doe",
        email: "john@example.com",
        role: "Attendee",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      },
      {
        id: "p2",
        name: "Jane Smith",
        email: "jane@example.com",
        role: "Speaker",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
      },
      {
        id: "p3",
        name: "Bob Johnson",
        email: "bob@example.com",
        role: "Organizer",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
      },
      {
        id: "p4",
        name: "Alice Brown",
        email: "alice@example.com",
        role: "Attendee",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
      },
    ],
  },
  {
    id: "2",
    title: "Tech Innovation Showcase",
    date: "2024-09-20",
    description:
      "An exhibition showcasing marketing strategies, digital campaigns, and brand management techniques.",
    location: "Silicon Valley Convention Center, CA",
    category: "Technology",
    organizer: "TechForward Inc",
    image: "/events/img2.jpg",
    status: "past",
    attendeesCount: 850,
    participants: [
      {
        id: "p5",
        name: "Charlie Wilson",
        email: "charlie@example.com",
        role: "Attendee",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
      },
      {
        id: "p6",
        name: "Diana Prince",
        email: "diana@example.com",
        role: "Speaker",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diana",
      },
      {
        id: "p7",
        name: "Eve Adams",
        email: "eve@example.com",
        role: "Attendee",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Eve",
      },
    ],
  },
  {
    id: "3",
    title: "Annual Gala Dinner",
    date: "2024-08-30",
    description:
      "A formal evening event celebrating achievements and networking with industry leaders.",
    location: "Grand Ballroom, Hotel Plaza",
    category: "Networking",
    organizer: "Elite Events Co",
    image: "/events/img3.jpeg",
    status: "past",
    attendeesCount: 300,
    participants: [
      {
        id: "p8",
        name: "Frank Miller",
        email: "frank@example.com",
        role: "VIP Guest",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Frank",
      },
      {
        id: "p9",
        name: "Grace Lee",
        email: "grace@example.com",
        role: "Attendee",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Grace",
      },
      {
        id: "p10",
        name: "Henry Davis",
        email: "henry@example.com",
        role: "Speaker",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Henry",
      },
      {
        id: "p11",
        name: "Ivy Chen",
        email: "ivy@example.com",
        role: "Organizer",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ivy",
      },
      {
        id: "p12",
        name: "Jack Taylor",
        email: "jack@example.com",
        role: "Attendee",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jack",
      },
    ],
  },
  {
    id: "4",
    title: "Startup Pitch Competition",
    date: "2024-07-15",
    description:
      "Entrepreneurs pitch their innovative ideas to investors and industry experts.",
    location: "Innovation Hub, Tech Park",
    category: "Business",
    organizer: "Venture Labs",
    image: "/events/img4.png",
    status: "past",
    attendeesCount: 450,
    participants: [
      {
        id: "p13",
        name: "Karen White",
        email: "karen@example.com",
        role: "Investor",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Karen",
      },
      {
        id: "p14",
        name: "Liam Garcia",
        email: "liam@example.com",
        role: "Entrepreneur",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Liam",
      },
      {
        id: "p15",
        name: "Mia Rodriguez",
        email: "mia@example.com",
        role: "Mentor",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mia",
      },
    ],
  },
];

export const feedbackData: Feedback[] = [
  {
    id: "f1",
    eventId: "1",
    participantId: "p1",
    participantName: "John Doe",
    participantEmail: "john@example.com",
    rating: 5,
    feedbackCategories: {
      venue: "excellent",
      content: "excellent",
      organization: "excellent",
      overall: "excellent",
    },
    recommendation: "yes",
    comments: "Absolutely fantastic event! The music was incredible and the atmosphere was perfect. The park setting made it even more special.",
    improvements: "Maybe add more food options for vegetarians.",
    submittedAt: "2024-10-16T10:30:00Z",
  },
  {
    id: "f2",
    eventId: "1",
    participantId: "p4",
    participantName: "Alice Brown",
    participantEmail: "alice@example.com",
    rating: 4,
    feedbackCategories: {
      venue: "good",
      content: "excellent",
      organization: "good",
      overall: "very good",
    },
    recommendation: "yes",
    comments: "Great concert series! The lineup was amazing and the sound quality was excellent. Had a wonderful time with friends.",
    improvements: "The parking situation could be better organized.",
    submittedAt: "2024-10-16T14:20:00Z",
  },
  {
    id: "f3",
    eventId: "2",
    participantId: "p5",
    participantName: "Charlie Wilson",
    participantEmail: "charlie@example.com",
    rating: 5,
    feedbackCategories: {
      venue: "excellent",
      content: "excellent",
      organization: "excellent",
      overall: "excellent",
    },
    recommendation: "yes",
    comments: "This tech showcase was groundbreaking! The AI demonstrations were mind-blowing and the networking opportunities were invaluable.",
    improvements: "Would love to see more hands-on workshops next time.",
    submittedAt: "2024-09-21T09:15:00Z",
  },
  {
    id: "f4",
    eventId: "2",
    participantId: "p7",
    participantName: "Eve Adams",
    participantEmail: "eve@example.com",
    rating: 4,
    feedbackCategories: {
      venue: "good",
      content: "excellent",
      organization: "good",
      overall: "very good",
    },
    recommendation: "yes",
    comments: "Impressive showcase of innovations. The speakers were knowledgeable and the exhibits were well-curated.",
    improvements: "Some sessions ran over time, better time management would help.",
    submittedAt: "2024-09-21T16:45:00Z",
  },
  {
    id: "f5",
    eventId: "3",
    participantId: "p8",
    participantName: "Frank Miller",
    participantEmail: "frank@example.com",
    rating: 5,
    feedbackCategories: {
      venue: "excellent",
      content: "excellent",
      organization: "excellent",
      overall: "excellent",
    },
    recommendation: "yes",
    comments: "Elegant gala dinner with excellent networking opportunities. The food was outstanding and the speeches were inspiring.",
    improvements: "Everything was perfect, no suggestions for improvement.",
    submittedAt: "2024-08-31T22:00:00Z",
  },
  {
    id: "f6",
    eventId: "3",
    participantId: "p9",
    participantName: "Grace Lee",
    participantEmail: "grace@example.com",
    rating: 4,
    feedbackCategories: {
      venue: "excellent",
      content: "good",
      organization: "excellent",
      overall: "very good",
    },
    recommendation: "yes",
    comments: "Beautiful venue and great atmosphere. Enjoyed meeting industry leaders and the dinner was delicious.",
    improvements: "More interactive sessions would be nice.",
    submittedAt: "2024-08-31T23:30:00Z",
  },
  {
    id: "f7",
    eventId: "4",
    participantId: "p13",
    participantName: "Karen White",
    participantEmail: "karen@example.com",
    rating: 5,
    feedbackCategories: {
      venue: "excellent",
      content: "excellent",
      organization: "excellent",
      overall: "excellent",
    },
    recommendation: "yes",
    comments: "Outstanding pitch competition! The quality of startups was impressive and the judging process was fair and thorough.",
    improvements: "Consider having more time for Q&A after each pitch.",
    submittedAt: "2024-07-16T11:20:00Z",
  },
  {
    id: "f8",
    eventId: "4",
    participantId: "p14",
    participantName: "Liam Garcia",
    participantEmail: "liam@example.com",
    rating: 4,
    feedbackCategories: {
      venue: "good",
      content: "excellent",
      organization: "good",
      overall: "very good",
    },
    recommendation: "yes",
    comments: "Great platform to showcase our startup. Got valuable feedback from investors and made important connections.",
    improvements: "The time slots were a bit tight for thorough presentations.",
    submittedAt: "2024-07-16T15:10:00Z",
  },
];

export {};
