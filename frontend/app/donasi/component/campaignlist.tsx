import DonationCampaignCard from "./donationcard";

export default function CampaignList({ data }: { data: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">

      {data.map((item) => {
        const target = Number(item.target_amount) || 0;
        const collected = Number(item.collected_amount) || 0;

        const progress =
          target > 0 ? Math.round((collected / target) * 100) : 0;

        const startDate = new Date(item.start_date);
        const endDate = new Date(item.end_date);

        const today = new Date();
        const daysLeft = Math.max(
          0,
          Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
        );

        return (
          <DonationCampaignCard
            key={item.id}
            title={item.title}
            category={item.category}
            daysLeft={daysLeft}
            collectedAmount={"Rp " + collected.toLocaleString("id-ID")}
            progress={progress}
            image={`http://127.0.0.1:8000/storage/${item.image}`}
            slug={item.slug}
          />
        );
      })}

    </div>
  );
}
