import DonationCampaignCard, { DonationCampaignProps } from "./donationcard";

export default function CampaignList({ data }: { data: DonationCampaignProps[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      {data.map((item, idx) => (
        <DonationCampaignCard key={idx} {...item} />
      ))}
    </div>
  );
}
