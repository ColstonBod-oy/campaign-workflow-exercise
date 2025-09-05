"use client";

import React, { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { CheckCircle, Plus, Settings, ExternalLink } from "lucide-react";

interface Integration {
	id: string;
	name: string;
	description: string;
	icon: string;
	category: string;
	connected: boolean;
	popular?: boolean;
	config?: Record<string, any>;
}

const availableIntegrations: Integration[] = [
	{
		id: "mailchimp",
		name: "Mailchimp",
		description: "Sync your email lists and automate email campaigns",
		icon: "📧",
		category: "Email Marketing",
		connected: false,
		popular: true,
	},
	{
		id: "hubspot",
		name: "HubSpot",
		description: "Connect your CRM data and lead tracking",
		icon: "🔄",
		category: "CRM",
		connected: false,
		popular: true,
	},
	{
		id: "salesforce",
		name: "Salesforce",
		description: "Integrate with your Salesforce CRM and automation",
		icon: "☁️",
		category: "CRM",
		connected: false,
	},
	{
		id: "google-analytics",
		name: "Google Analytics",
		description: "Track campaign performance and user behavior",
		icon: "📊",
		category: "Analytics",
		connected: false,
		popular: true,
	},
	{
		id: "facebook-ads",
		name: "Facebook Ads",
		description: "Create and manage Facebook advertising campaigns",
		icon: "📱",
		category: "Advertising",
		connected: false,
	},
	{
		id: "google-ads",
		name: "Google Ads",
		description: "Integrate with Google Ads for cross-platform campaigns",
		icon: "🔍",
		category: "Advertising",
		connected: false,
	},
	{
		id: "shopify",
		name: "Shopify",
		description: "Connect your e-commerce store data and customer info",
		icon: "🛒",
		category: "E-commerce",
		connected: false,
	},
	{
		id: "stripe",
		name: "Stripe",
		description: "Track payment events and customer lifetime value",
		icon: "💳",
		category: "Payments",
		connected: false,
	},
	{
		id: "slack",
		name: "Slack",
		description: "Get campaign notifications and team updates",
		icon: "💬",
		category: "Communication",
		connected: false,
	},
	{
		id: "webhooks",
		name: "Custom Webhooks",
		description: "Send campaign data to your custom endpoints",
		icon: "🔗",
		category: "Developer",
		connected: false,
	},
];

interface IntegrationsProps {
	integrations: string[];
	onIntegrationsChange: (integrations: string[]) => void;
}

export function Integrations({
	integrations,
	onIntegrationsChange,
}: IntegrationsProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [configuringIntegration, setConfiguringIntegration] = useState<
		string | null
	>(null);

	const categories = [
		"All",
		...Array.from(new Set(availableIntegrations.map((i) => i.category))),
	];

	const filteredIntegrations = availableIntegrations.filter((integration) => {
		const matchesSearch =
			integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			integration.description.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCategory =
			selectedCategory === "All" || integration.category === selectedCategory;
		return matchesSearch && matchesCategory;
	});

	const toggleIntegration = (integrationId: string) => {
		if (integrations.includes(integrationId)) {
			onIntegrationsChange(integrations.filter((id) => id !== integrationId));
		} else {
			onIntegrationsChange([...integrations, integrationId]);
		}
	};

	const renderConfigDialog = (integration: Integration) => (
		<Dialog>
			<DialogTrigger asChild>
				<Button size="sm" variant="outline">
					<Settings className="h-4 w-4 mr-2" />
					Configure
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Configure {integration.name}</DialogTitle>
					<DialogDescription>
						Set up your {integration.name} integration settings
					</DialogDescription>
				</DialogHeader>
				<div className="space-y-4">
					{/* Mock configuration fields based on integration type */}
					{integration.id === "mailchimp" && (
						<>
							<div>
								<Label htmlFor="api-key">API Key</Label>
								<Input
									id="api-key"
									placeholder="Enter your Mailchimp API key"
								/>
							</div>
							<div>
								<Label htmlFor="list-id">Default List ID</Label>
								<Input id="list-id" placeholder="Enter default list ID" />
							</div>
						</>
					)}
					{integration.id === "google-analytics" && (
						<>
							<div>
								<Label htmlFor="tracking-id">Tracking ID</Label>
								<Input
									id="tracking-id"
									placeholder="UA-XXXXXXXX-X or G-XXXXXXXXXX"
								/>
							</div>
							<div>
								<Label htmlFor="property-id">Property ID</Label>
								<Input
									id="property-id"
									placeholder="Enter Google Analytics Property ID"
								/>
							</div>
						</>
					)}
					{integration.id === "webhooks" && (
						<>
							<div>
								<Label htmlFor="webhook-url">Webhook URL</Label>
								<Input
									id="webhook-url"
									placeholder="https://your-app.com/webhook"
								/>
							</div>
							<div>
								<Label htmlFor="secret">Secret (Optional)</Label>
								<Input
									id="secret"
									placeholder="Webhook secret for verification"
								/>
							</div>
						</>
					)}
					{/* Generic fallback */}
					{!["mailchimp", "google-analytics", "webhooks"].includes(
						integration.id
					) && (
						<div>
							<Label htmlFor="generic-config">Configuration</Label>
							<Input
								id="generic-config"
								placeholder="Enter configuration details"
							/>
						</div>
					)}

					<div className="flex justify-end space-x-2 pt-4">
						<Button variant="outline">Cancel</Button>
						<Button>Save Configuration</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);

	return (
		<div className="space-y-6">
			<div className="text-center space-y-2">
				<p className="text-muted-foreground">
					Connect your favorite tools to enhance your campaign capabilities
				</p>
			</div>

			{/* Search and Filter */}
			<div className="flex flex-col sm:flex-row gap-4">
				<div className="flex-1">
					<Input
						placeholder="Search integrations..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
				<div className="flex gap-2 flex-wrap">
					{categories.map((category) => (
						<Button
							key={category}
							variant={selectedCategory === category ? "default" : "outline"}
							size="sm"
							onClick={() => setSelectedCategory(category)}
						>
							{category}
						</Button>
					))}
				</div>
			</div>

			{/* Connected Integrations Summary */}
			{integrations.length > 0 && (
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center space-x-2">
							<CheckCircle className="h-5 w-5 text-green-500" />
							<span>Connected Integrations ({integrations.length})</span>
						</CardTitle>
						<CardDescription>
							These integrations will be active for your campaign
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex flex-wrap gap-2">
							{integrations.map((integrationId) => {
								const integration = availableIntegrations.find(
									(i) => i.id === integrationId
								);
								return integration ? (
									<Badge
										key={integrationId}
										variant="default"
										className="flex items-center space-x-1"
									>
										<span>{integration.icon}</span>
										<span>{integration.name}</span>
									</Badge>
								) : null;
							})}
						</div>
					</CardContent>
				</Card>
			)}

			{/* Available Integrations */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{filteredIntegrations.map((integration) => {
					const isConnected = integrations.includes(integration.id);

					return (
						<Card
							key={integration.id}
							className={`relative ${isConnected ? "ring-2 ring-primary" : ""}`}
						>
							{integration.popular && (
								<Badge className="absolute top-2 right-2" variant="secondary">
									Popular
								</Badge>
							)}

							<CardHeader className="pb-3">
								<div className="flex items-start space-x-3">
									<div className="text-2xl">{integration.icon}</div>
									<div className="flex-1">
										<CardTitle className="text-lg">
											{integration.name}
										</CardTitle>
										<Badge variant="outline" className="text-xs mt-1">
											{integration.category}
										</Badge>
									</div>
								</div>
								<CardDescription className="text-sm">
									{integration.description}
								</CardDescription>
							</CardHeader>

							<CardContent className="pt-0">
								<div className="flex items-center justify-between">
									<Switch
										checked={isConnected}
										onCheckedChange={() => toggleIntegration(integration.id)}
									/>

									<div className="flex space-x-2">
										{isConnected && renderConfigDialog(integration)}
										<Button size="sm" variant="ghost" asChild>
											<a href="#" target="_blank" rel="noopener noreferrer">
												<ExternalLink className="h-4 w-4" />
											</a>
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>

			{filteredIntegrations.length === 0 && (
				<div className="text-center py-8">
					<p className="text-muted-foreground">
						No integrations found matching your search.
					</p>
				</div>
			)}

			{/* Custom Integration */}
			<Card className="border-dashed">
				<CardContent className="p-6 text-center">
					<Plus className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
					<h3>Need a Custom Integration?</h3>
					<p className="text-sm text-muted-foreground mb-4">
						Contact our team to discuss building a custom integration for your
						specific needs.
					</p>
					<Button variant="outline">Request Integration</Button>
				</CardContent>
			</Card>
		</div>
	);
}
