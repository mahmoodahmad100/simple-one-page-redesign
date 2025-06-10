import { motion } from 'framer-motion';
import type { SkipCardProps } from '../types/skip';

export const SkipCard = ({ skip, isSelected, onSelect }: SkipCardProps) => {
  const totalPrice = skip.price_before_vat + (skip.price_before_vat * skip.vat) / 100;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative p-6 rounded-lg shadow-lg cursor-pointer transition-all duration-200 ${
        isSelected
          ? 'bg-green-50 border-2 border-green-500'
          : 'bg-white border-2 border-gray-200 hover:border-green-300'
      }`}
      onClick={() => onSelect(skip)}
    >
      <div className="flex flex-col h-full">
        <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
          <img
            src="https://placehold.co/600x400"
            alt={`${skip.size} Yard Skip`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-gray-800">
            {skip.size} Yard Skip
          </h3>
          <div className="text-right">
            <p className="text-sm text-gray-600">Hire Period</p>
            <p className="font-semibold text-gray-600">{skip.hire_period_days} days</p>
          </div>
        </div>

        <div className="flex-grow">
          <div className="space-y-2">
            <p className={`text-sm flex items-center ${skip.allowed_on_road ? 'text-green-600' : 'text-red-600'}`}>
              <span className="mr-2">{skip.allowed_on_road ? '✓' : '✕'}</span>
              {skip.allowed_on_road ? 'Allowed on road' : 'Not allowed on road'}
            </p>
            <p className={`text-sm flex items-center ${skip.allows_heavy_waste ? 'text-green-600' : 'text-red-600'}`}>
              <span className="mr-2">{skip.allows_heavy_waste ? '✓' : '✕'}</span>
              {skip.allows_heavy_waste ? 'Accepts heavy waste' : 'Does not accept heavy waste'}
            </p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-baseline">
            <div>
              <p className="text-sm text-gray-600">Price (excl. VAT)</p>
              <p className="text-lg font-semibold text-gray-600">£{skip.price_before_vat}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total (incl. VAT)</p>
              <p className="text-xl font-bold text-green-600">£{totalPrice}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}; 