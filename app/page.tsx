import Image from "next/image";
import { CampaignWizard } from '../components/CampaignWizard';

export default function Home() {
  return (
    <div className="h-screen bg-background overflow-hidden">
      <CampaignWizard />
    </div>
  );
}
