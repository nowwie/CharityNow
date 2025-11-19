export interface CampaignProps {
  title: string;
  desc: string;
  progress: number;
  image: string;
}

export default function CampaignCard({ title, desc, progress, image }: CampaignProps) {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden">
      <img src="/assets/campaign.jpg" alt="campaign-image" className="w-full h-40 object-cover" />

      <div className="p-4 space-y-3">
        <h3 className="font-semibold">{title}</h3>
        <h5 className="text-sm text-gray-500">{desc}</h5>

         <div className="flex justify-between text-xs text-gray-600 font-medium">
          <span>Terkumpul</span>
          <span>{progress}%</span>
        </div>

        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <button className="bg-primary w-full py-2 text-white rounded-md hover:bg-primary/90 transition">
          Donasi Sekarang
        </button>
      </div>
    </div>
  );
}
