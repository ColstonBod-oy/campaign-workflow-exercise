"use client";

import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import {
	Mail,
	ShoppingCart,
	Users,
	Target,
	Megaphone,
	Heart,
} from "lucide-react";

interface CampaignType {
	id: string;
	name: string;
	description: string;
	icon: React.ReactNode;
	features: string[];
	recommended?: boolean;
}

const campaignTypes: CampaignType[] = [
	{
		id: "seeding-gifting",
		name: "Seeding/Gifting",
		description:
			"Send free products to influencers and potential customers to generate authentic content and reviews",
		icon: <Heart className="h-8 w-8" />,
		features: [
			"Influencer outreach",
			"Product samples",
			"User-generated content",
			"Authentic reviews",
		],
		recommended: true,
	},
	{
		id: "paid-promotion",
		name: "Paid Promotion",
		description:
			"Partner with creators for sponsored content and paid collaborations",
		icon: <Target className="h-8 w-8" />,
		features: [
			"Sponsored posts",
			"Brand partnerships",
			"Performance tracking",
			"ROI optimization",
		],
	},
	{
		id: "other",
		name: "Other",
		description:
			"Custom campaign type for unique marketing initiatives and strategies",
		icon: <Megaphone className="h-8 w-8" />,
		features: [
			"Custom objectives",
			"Flexible targeting",
			"Tailored messaging",
			"Unique strategies",
		],
	},
];

interface CampaignTypeSelectionProps {
	selectedType: string;
	onTypeSelect: (type: string) => void;
}

export function CampaignTypeSelection({
	selectedType,
	onTypeSelect,
}: CampaignTypeSelectionProps) {
	return (
		<div className="space-y-6">
			<div className="text-center space-y-2">
				<p className="text-muted-foreground">
					Choose the type of campaign that best fits your marketing goals
				</p>
			</div>

			<div className="grid grid-cols-1 gap-4">
				{campaignTypes.map((type) => (
					<Card
						key={type.id}
						className={`cursor-pointer transition-all hover:shadow-md ${
							selectedType === type.id
								? "ring-2 ring-primary border-primary"
								: "hover:border-primary/50"
						}`}
						onClick={() => onTypeSelect(type.id)}
					>
						<CardContent className="p-6">
							<div className="flex items-start space-x-4">
								<div
									className={`p-3 rounded-lg ${
										selectedType === type.id
											? "bg-primary text-primary-foreground"
											: "bg-muted"
									}`}
								>
									{type.icon}
								</div>
								<div className="flex-1">
									<div className="flex items-center space-x-2 mb-2">
										<CardTitle className="text-lg">{type.name}</CardTitle>
										{type.recommended && (
											<Badge variant="secondary">Recommended</Badge>
										)}
									</div>
									<CardDescription className="text-sm mb-3">
										{type.description}
									</CardDescription>
									<div className="space-y-2">
										<p className="text-sm">Key features:</p>
										<ul className="text-sm text-muted-foreground space-y-1">
											{type.features.map((feature, index) => (
												<li key={index} className="flex items-center space-x-2">
													<div className="h-1.5 w-1.5 rounded-full bg-primary" />
													<span>{feature}</span>
												</li>
											))}
										</ul>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{selectedType && (
				<div className="text-center p-4 bg-muted/50 rounded-lg">
					<p className="text-sm text-muted-foreground">
						You selected:{" "}
						<span className="font-medium text-foreground">
							{campaignTypes.find((t) => t.id === selectedType)?.name}
						</span>
					</p>
				</div>
			)}
		</div>
	);
}
