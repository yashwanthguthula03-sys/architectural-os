export const Input = ({ label, ...props }: any) => (
  <div className="w-full">
    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">
      {label}
    </label>
    <input 
      {...props} 
      className="w-full p-4 bg-white border border-gray-200/80 rounded-xl text-sm outline-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)] focus:ring-1 focus:ring-gray-300 focus:border-gray-400 transition-all text-gray-800" 
    />
  </div>
);