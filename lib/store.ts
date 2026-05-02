import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserProfile {
  country: string;
  region: string;
  isFirstTimeVoter: boolean;
  ageGroup: string;
  registrationStatus: 'not-registered' | 'registered' | 'unsure';
  preferredLanguage: string;
  needsVoiceSupport: boolean;
  needsNearbyCenter: boolean;
  onboardingComplete: boolean;
}

export interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
  category: 'eligibility' | 'registration' | 'documents' | 'preparation' | 'election-day';
}

export interface AppState {
  profile: UserProfile;
  checklist: ChecklistItem[];
  currentStep: number;
  language: string;
  setProfile: (p: Partial<UserProfile>) => void;
  setLanguage: (lang: string) => void;
  toggleChecklistItem: (id: string) => void;
  setCurrentStep: (step: number) => void;
  resetProfile: () => void;
}

const defaultProfile: UserProfile = {
  country: '',
  region: '',
  isFirstTimeVoter: true,
  ageGroup: '',
  registrationStatus: 'unsure',
  preferredLanguage: 'en',
  needsVoiceSupport: false,
  needsNearbyCenter: false,
  onboardingComplete: false,
};

const defaultChecklist: ChecklistItem[] = [
  { id: 'age-check', label: 'Confirm you are 18 or older', completed: false, category: 'eligibility' },
  { id: 'citizenship', label: 'Verify citizenship status', completed: false, category: 'eligibility' },
  { id: 'register', label: 'Register to vote online or in person', completed: false, category: 'registration' },
  { id: 'verify-reg', label: 'Verify registration confirmation', completed: false, category: 'registration' },
  { id: 'id-card', label: 'Prepare valid photo ID', completed: false, category: 'documents' },
  { id: 'address-proof', label: 'Prepare address proof document', completed: false, category: 'documents' },
  { id: 'voter-slip', label: 'Download or collect voter slip', completed: false, category: 'documents' },
  { id: 'find-center', label: 'Locate your polling center', completed: false, category: 'preparation' },
  { id: 'know-time', label: 'Check polling hours for your area', completed: false, category: 'preparation' },
  { id: 'vote-day', label: 'Cast your vote on election day', completed: false, category: 'election-day' },
  { id: 'verify-mark', label: 'Verify ink mark after voting', completed: false, category: 'election-day' },
];

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      profile: defaultProfile,
      checklist: defaultChecklist,
      currentStep: 0,
      language: 'en',
      setProfile: (p) => set((s) => ({ profile: { ...s.profile, ...p } })),
      setLanguage: (lang) => set({ language: lang }),
      toggleChecklistItem: (id) =>
        set((s) => ({
          checklist: s.checklist.map((item) =>
            item.id === id ? { ...item, completed: !item.completed } : item
          ),
        })),
      setCurrentStep: (step) => set({ currentStep: step }),
      resetProfile: () => set({ profile: defaultProfile, checklist: defaultChecklist, currentStep: 0 }),
    }),
    { name: 'voteguide-storage' }
  )
);
