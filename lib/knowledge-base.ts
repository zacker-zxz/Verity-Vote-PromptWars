export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
];

export interface TimelineStage {
  id: string;
  title: string;
  description: string;
  details: string;
  icon: string;
  status: 'complete' | 'active' | 'upcoming';
  deadline?: string;
}

export const ELECTION_TIMELINE: TimelineStage[] = [
  {
    id: 'eligibility',
    title: 'Check Eligibility',
    description: 'Confirm you meet all requirements to vote',
    details: 'You must be a citizen aged 18 or older and a resident of your voting district. Some regions require prior registration. Check your local election commission website for exact requirements.',
    icon: 'shield-check',
    status: 'complete',
  },
  {
    id: 'registration',
    title: 'Register to Vote',
    description: 'Complete your voter registration before the deadline',
    details: 'Registration can typically be done online, by mail, or in person at your local election office. You will need a valid ID, proof of address, and your citizenship information. Registration deadlines vary by region.',
    icon: 'clipboard-list',
    status: 'active',
    deadline: 'Varies by region — check early!',
  },
  {
    id: 'verification',
    title: 'Verify Registration',
    description: 'Make sure your registration is confirmed and active',
    details: 'After registering, verify your status on your election commission\'s website. Confirm your name, address, and polling station are correct. If there are errors, contact your local office immediately.',
    icon: 'check-circle',
    status: 'upcoming',
  },
  {
    id: 'documents',
    title: 'Prepare Documents',
    description: 'Gather all required IDs and documents before election day',
    details: 'Common requirements include a government-issued photo ID, voter registration card or slip, and proof of address. Some regions accept alternative IDs. Check your local requirements and prepare copies.',
    icon: 'file-text',
    status: 'upcoming',
  },
  {
    id: 'polling',
    title: 'Find Polling Center',
    description: 'Locate your assigned voting station and plan your route',
    details: 'Your polling center is assigned based on your registered address. Use our center finder or your election commission website. Note the hours, accessibility features, and bring directions.',
    icon: 'map-pin',
    status: 'upcoming',
  },
  {
    id: 'vote-day',
    title: 'Election Day',
    description: 'Cast your vote — arrive early, stay patient, make your voice count',
    details: 'Arrive at your polling center during designated hours. Bring your ID and voter slip. Follow instructions from polling staff. After voting, verify your ink mark and collect any receipt if offered.',
    icon: 'vote',
    status: 'upcoming',
  },
  {
    id: 'post-vote',
    title: 'After Voting',
    description: 'Track results and know your post-voting rights',
    details: 'After casting your vote, you can track election results through official channels. If you experience any issues while voting, report them to your election commission. Keep your voting receipt if provided.',
    icon: 'trending-up',
    status: 'upcoming',
  },
];

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const FAQ_DATA: FAQItem[] = [
  { question: 'Am I eligible to vote?', answer: 'You are generally eligible if you are a citizen aged 18 or older and a resident of your voting district. Some regions have additional requirements. Use our eligibility checker for a personalized answer.', category: 'eligibility' },
  { question: 'How do I register to vote?', answer: 'Registration methods vary by region. Most areas offer online registration through the election commission website, in-person registration at government offices, or mail-in registration forms. Start early to meet deadlines.', category: 'registration' },
  { question: 'What documents do I need?', answer: 'Typically you need a government-issued photo ID (passport, driver\'s license, national ID), proof of address (utility bill, bank statement), and your voter registration card or slip. Requirements vary by region.', category: 'documents' },
  { question: 'Where is my nearest voting center?', answer: 'Use our Nearby Centers feature to find your assigned polling station based on your registered address. You can also check your election commission website for your designated center.', category: 'centers' },
  { question: 'What should I do on election day?', answer: 'Arrive at your assigned polling center during voting hours. Bring your valid ID and voter slip. Follow the instructions of polling officials. Mark your ballot clearly. Verify your ink mark after voting.', category: 'election-day' },
  { question: 'What if I miss a registration deadline?', answer: 'Some regions offer same-day registration. Otherwise, you may need to wait for the next election cycle. Contact your local election office immediately to explore your options.', category: 'deadlines' },
  { question: 'Can I vote if I have a disability?', answer: 'Yes. Most polling centers are required to provide accessibility accommodations including wheelchair access, assistive devices, and assistance from a companion. Contact your center in advance to confirm available accommodations.', category: 'accessibility' },
  { question: 'How do I change my language preference?', answer: 'Use the language switcher in the top navigation bar or go to Settings to change your preferred language. All content, guides, and FAQs will be translated.', category: 'language' },
];

export interface LearningCard {
  id: string;
  title: string;
  whatItMeans: string;
  whyItMatters: string;
  whatToDo: string;
  commonMistakes: string;
  actionLabel: string;
  actionLink: string;
  icon: string;
}

export const LEARNING_CARDS: LearningCard[] = [
  {
    id: 'what-is-voting',
    title: 'What is Voting?',
    whatItMeans: 'Voting is how citizens choose their leaders and influence government decisions. Each vote is equal — your voice matters as much as anyone else\'s.',
    whyItMatters: 'Voting shapes policies on education, healthcare, safety, and the economy. It is the most direct way to influence how your community and country are governed.',
    whatToDo: 'Start by checking if you are eligible and registered. This app will guide you through every step.',
    commonMistakes: 'Thinking your single vote does not matter. Close elections are often decided by very few votes.',
    actionLabel: 'Check Eligibility',
    actionLink: '/onboarding',
    icon: 'vote',
  },
  {
    id: 'registration-101',
    title: 'Registration 101',
    whatItMeans: 'Voter registration is the process of adding your name to the official voter list so you are authorized to cast a ballot.',
    whyItMatters: 'Without registration, you cannot vote. Many eligible voters miss elections simply because they did not register on time.',
    whatToDo: 'Visit your election commission website or use the registration link in your dashboard. Have your ID and address proof ready.',
    commonMistakes: 'Waiting until the last minute. Registration deadlines can be weeks before election day.',
    actionLabel: 'Go to Dashboard',
    actionLink: '/dashboard',
    icon: 'clipboard-list',
  },
  {
    id: 'documents-guide',
    title: 'Documents You Need',
    whatItMeans: 'Certain documents are required to verify your identity and eligibility at the polling center.',
    whyItMatters: 'Without proper documents, you may be turned away at the polling station. Preparing them in advance saves time and stress.',
    whatToDo: 'Gather your photo ID, address proof, and voter slip. Keep them in a folder you will bring on election day.',
    commonMistakes: 'Bringing expired IDs or documents with mismatched addresses.',
    actionLabel: 'View Checklist',
    actionLink: '/dashboard',
    icon: 'file-text',
  },
  {
    id: 'election-day-guide',
    title: 'Election Day Guide',
    whatItMeans: 'Election day is when you physically go to your assigned polling center and cast your vote.',
    whyItMatters: 'This is the culmination of your preparation. Being ready ensures a smooth, quick, and stress-free experience.',
    whatToDo: 'Arrive early. Bring all documents. Follow polling staff instructions. Vote clearly. Check your ink mark.',
    commonMistakes: 'Going to the wrong polling center, or arriving after voting hours end.',
    actionLabel: 'Find My Center',
    actionLink: '/centers',
    icon: 'map-pin',
  },
];

export const DEMO_CENTERS = [
  { id: '1', name: 'City Hall Polling Station', address: '123 Main Street, Downtown', distance: '0.8 km', hours: '7:00 AM – 7:00 PM', accessible: true, lat: 40.7128, lng: -74.006 },
  { id: '2', name: 'Public Library – Community Room', address: '456 Oak Avenue, Midtown', distance: '1.2 km', hours: '7:00 AM – 7:00 PM', accessible: true, lat: 40.7148, lng: -74.008 },
  { id: '3', name: 'Lincoln Elementary School', address: '789 Park Road, Westside', distance: '2.1 km', hours: '7:00 AM – 7:00 PM', accessible: false, lat: 40.7168, lng: -74.012 },
  { id: '4', name: 'Community Recreation Center', address: '321 River Drive, Eastside', distance: '3.5 km', hours: '7:00 AM – 7:00 PM', accessible: true, lat: 40.7108, lng: -74.002 },
];

export const COUNTRIES = [
  'United States', 'India', 'United Kingdom', 'Canada', 'Australia',
  'Germany', 'France', 'Brazil', 'Japan', 'South Korea',
  'Mexico', 'Nigeria', 'South Africa', 'Kenya', 'Indonesia',
];

export const AGE_GROUPS = ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'];
