import { useAppStore } from './store';

describe('useAppStore', () => {
  beforeEach(() => {
    // Reset the store properly using its own action
    useAppStore.getState().resetProfile();
  });

  it('should initialize with default values', () => {
    const state = useAppStore.getState();
    expect(state.profile.country).toBe('');
    expect(state.profile.isFirstTimeVoter).toBe(true);
    expect(state.language).toBe('en');
    expect(state.checklist.length).toBe(11);
    expect(state.checklist[0].completed).toBe(false);
  });

  it('should set profile data correctly', () => {
    const data = {
      country: 'India',
      isFirstTimeVoter: false,
      ageGroup: '25-34',
    };
    
    useAppStore.getState().setProfile(data);
    
    const state = useAppStore.getState();
    expect(state.profile.country).toBe('India');
    expect(state.profile.isFirstTimeVoter).toBe(false);
    expect(state.profile.ageGroup).toBe('25-34');
  });

  it('should toggle checklist items correctly', () => {
    const firstItemId = useAppStore.getState().checklist[0].id;
    
    useAppStore.getState().toggleChecklistItem(firstItemId);
    expect(useAppStore.getState().checklist[0].completed).toBe(true);
    
    useAppStore.getState().toggleChecklistItem(firstItemId);
    expect(useAppStore.getState().checklist[0].completed).toBe(false);
  });

  it('should set language correctly and update profile preference', () => {
    useAppStore.getState().setLanguage('mr');
    const state = useAppStore.getState();
    expect(state.language).toBe('mr');
    expect(state.profile.preferredLanguage).toBe('mr');
  });

  it('should reset profile and checklist correctly', () => {
    useAppStore.getState().setProfile({ country: 'India' });
    const firstItemId = useAppStore.getState().checklist[0].id;
    useAppStore.getState().toggleChecklistItem(firstItemId);
    
    useAppStore.getState().resetProfile();
    
    const state = useAppStore.getState();
    expect(state.profile.country).toBe('');
    expect(state.checklist[0].completed).toBe(false);
  });
});
