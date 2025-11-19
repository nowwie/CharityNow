import { Icon, LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface StatsCardProps {
  label: string;
  value: string;
  subtext: string;
  icon: LucideIcon;
  badgeText: string;
  badgeColor: string; 
  iconBg: string; 
}

export default function StatsCard({
  label,
  value,
  subtext,
  icon : Icon,
  badgeText,
  badgeColor,
  iconBg,
}: StatsCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-4">
      
      <div className="flex justify-between items-start">
        
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBg}`}>
          <Icon size={20} />
        </div>

        
        <span className="text-gray-500 text-sm">{label}</span>
      </div>

      
      <div>
        <h3 className="text-3xl font-semibold">{value}</h3>
        <p className="text-gray-600">{subtext}</p>
      </div>

    
      <div className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${badgeColor}`}>
        <Icon size={20} />
        {badgeText}
      </div>
    </div>
  );
}
