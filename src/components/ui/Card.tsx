export const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-[#FDFDFD] rounded-[1.5rem] p-8 border border-[#EBECEB] shadow-[0_8px_30px_rgba(0,0,0,0.03)] ${className}`}>
    {children}
  </div>
);