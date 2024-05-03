// modalStore.ts
import {create} from 'zustand';

type ModalState = {
 isOpen: boolean;
 modalType: 'pipelineViewStaffer' | 'benchViewStaffer' | 'billingViewStaffer' | null;
 data: any;
 openModal: (modalType: 'pipelineViewStaffer' | 'benchViewStaffer' | 'billingViewStaffer', data?: any) => void;
 closeModal: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
 isOpen: false,
 modalType: null,
 data: null,
 openModal: (modalType, data) => set({ isOpen: true, modalType, data }),
 closeModal: () => set({ isOpen: false, modalType: null, data: null }),
}));
