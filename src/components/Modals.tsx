// Modals.tsx
import React from 'react';
import {useModalStore } from '../store';
import PipelineModal from './modals/PipelineViewStafferModal';
import BenchModal from './modals/BenchViewStafferModal';
import BillingModal from './modals/BillingViewStafferModal';

const Modals: React.FC = () => {
 const { isOpen, modalType, data, closeModal } = useModalStore();

 if (!isOpen) return null;

 switch (modalType) {
    case 'pipelineViewStaffer':
      return <PipelineModal data={data} onClose={closeModal} />;
    case 'benchViewStaffer':
      return <BenchModal data={data} onClose={closeModal} />;
    case 'billingViewStaffer':
      return <BillingModal data={data} onClose={closeModal} />;
    default:
      return null;
 }
};

export default Modals;
