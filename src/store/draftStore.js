import { create } from 'zustand';
import Cookies from 'js-cookie';
import config from '../config/apiConfig';

const useDraftStore = create((set, get) => ({
  draftData: null,
  
  saveDraft: async (draftData) => {
    try {
      const token = Cookies.get('accessToken');
      const response = await fetch(`${config.CURRENT_URL}/qlms/newCourseDraft`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(draftData),
      });

      if (!response.ok) {
        throw new Error('Failed to save draft');
      }

      const savedDraft = await response.json();
      set({ draftData: savedDraft });
      return savedDraft;
    } catch (error) {
      console.error('Error saving draft:', error);
      throw error;
    }
  },

  getDraft: async (draftId) => {
    try {
      const token = Cookies.get('accessToken');
      const response = await fetch(`${config.CURRENT_URL}/qlms/getDraft/${draftId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch draft');
      }

      const draft = await response.json();
      set({ draftData: draft });
      return draft;
    } catch (error) {
      console.error('Error fetching draft:', error);
      throw error;
    }
  },

  updateDraft: async (draftId, draftData) => {
    try {
      const token = Cookies.get('accessToken');
      const response = await fetch(`${config.CURRENT_URL}/qlms/updateDraft/${draftId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(draftData),
      });

      if (!response.ok) {
        throw new Error('Failed to update draft');
      }

      const updatedDraft = await response.json();
      set({ draftData: updatedDraft });
      return updatedDraft;
    } catch (error) {
      console.error('Error updating draft:', error);
      throw error;
    }
  },
}));

export default useDraftStore; 