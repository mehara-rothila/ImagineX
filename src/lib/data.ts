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

export {};
