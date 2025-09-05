"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { CheckCircle, Circle } from "lucide-react";
import { CampaignTypeSelection } from "./CampaignTypeSelection";
import { CampaignInformation } from "./CampaignInformation";
import { CampaignRules } from "./CampaignRules";

import { EmailSetup } from "./EmailSetup";

interface CampaignData {
	type: string;
	name: string;
	description: string;
	productUrl: string;
	uploadedFile: File | null;
	rules: Array<{
		id: string;
		type: string;
		condition: string;
		action: string;
		enabled: boolean;
	}>;
	integrations: string[];
	emailConfig: {
		fromName: string;
		fromEmail: string;
		subject: string;
		template: string;
	};
}

const steps = [
	{ id: 1, title: "Campaign Type", description: "Choose your campaign type" },
	{ id: 2, title: "Information", description: "Add campaign details" },
	{ id: 3, title: "Rules", description: "Configure campaign rules" },
	{ id: 4, title: "Email Setup", description: "Configure email settings" },
];

export function CampaignWizard() {
	const [currentStep, setCurrentStep] = useState(1);
	const [campaignData, setCampaignData] = useState<CampaignData>({
		type: "",
		name: "",
		description: "",
		productUrl: "",
		uploadedFile: null,
		rules: [],
		integrations: [],
		emailConfig: {
			fromName: "",
			fromEmail: "",
			subject: "",
			template: "",
		},
	});

	const updateCampaignData = (data?: Partial<CampaignData> | undefined) => {
		setCampaignData((prev) => ({ ...prev, ...data }));
	};

	const nextStep = () => {
		if (currentStep < steps.length) {
			setCurrentStep(currentStep + 1);
		}
	};

	const prevStep = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1);
		}
	};

	const progress = (currentStep / steps.length) * 100;

	const renderStepContent = () => {
		switch (currentStep) {
			case 1:
				return (
					<CampaignTypeSelection
						selectedType={campaignData.type}
						onTypeSelect={(type) => updateCampaignData({ type })}
					/>
				);
			case 2:
				return (
					<CampaignInformation
						data={campaignData}
						onDataChange={updateCampaignData}
					/>
				);
			case 3:
				return (
					<CampaignRules
						rules={campaignData.rules}
						onRulesChange={(rules) => updateCampaignData({ rules })}
					/>
				);
			case 4:
				return (
					<EmailSetup
						emailConfig={campaignData.emailConfig}
						onEmailConfigChange={(emailConfig) =>
							updateCampaignData({
								emailConfig: {
									...campaignData.emailConfig,
									...emailConfig,
								},
							})
						}
					/>
				);
			default:
				return null;
		}
	};

	const isStepValid = () => {
		switch (currentStep) {
			case 1:
				return campaignData.type !== "";
			case 2:
				return campaignData.name !== "" && campaignData.description !== "";
			case 3:
				return true; // Rules are optional
			case 4:
				return (
					campaignData.emailConfig.fromName !== "" &&
					campaignData.emailConfig.fromEmail !== ""
				);
			default:
				return false;
		}
	};

	const handleFinish = () => {
		console.log("Campaign created:", campaignData);
		alert("Campaign created successfully!");
	};

	return (
		<div className="h-screen flex bg-background">
			{/* Vertical Sidebar with Progress */}
			<div className="w-80 bg-muted/30 border-r border-border p-6 flex flex-col">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-xl font-medium mb-2">Create New Campaign</h1>
					<p className="text-sm text-muted-foreground">
						Follow the steps below to create and configure your campaign
					</p>
				</div>

				{/* Vertical Progress Steps */}
				<div className="flex-1 space-y-6">
					{steps.map((step, index) => (
						<div key={step.id} className="flex items-start space-x-4">
							{/* Step indicator */}
							<div className="flex flex-col items-center">
								{step.id < currentStep ? (
									<div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
										<CheckCircle className="h-5 w-5 text-primary-foreground" />
									</div>
								) : step.id === currentStep ? (
									<div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
										<span className="text-sm font-medium text-primary-foreground">
											{step.id}
										</span>
									</div>
								) : (
									<div className="w-8 h-8 rounded-full border-2 border-muted-foreground/30 bg-background flex items-center justify-center">
										<span className="text-sm font-medium text-muted-foreground">
											{step.id}
										</span>
									</div>
								)}
								{/* Vertical line */}
								{index < steps.length - 1 && (
									<div
										className={`w-0.5 h-12 mt-2 ${
											step.id < currentStep
												? "bg-primary"
												: "bg-muted-foreground/30"
										}`}
									/>
								)}
							</div>

							{/* Step content */}
							<div
								className={`pt-1 ${
									step.id <= currentStep
										? "text-foreground"
										: "text-muted-foreground"
								}`}
							>
								<div className="font-medium text-sm">{step.title}</div>
								<div className="text-xs text-muted-foreground mt-1">
									{step.description}
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Navigation Buttons */}
				<div className="flex justify-between pt-6 border-t border-border">
					<Button
						variant="outline"
						onClick={prevStep}
						disabled={currentStep === 1}
						size="sm"
					>
						Previous
					</Button>

					{currentStep === steps.length ? (
						<Button onClick={handleFinish} disabled={!isStepValid()} size="sm">
							Create Campaign
						</Button>
					) : (
						<Button onClick={nextStep} disabled={!isStepValid()} size="sm">
							Next
						</Button>
					)}
				</div>
			</div>

			{/* Main Content */}
			<div className="flex-1 flex flex-col">
				<div className="p-8 flex-1 overflow-auto">
					<div className="max-w-4xl mx-auto">
						<div className="mb-6">
							<h2 className="text-xl font-medium">
								{steps[currentStep - 1].title}
							</h2>
							<p className="text-muted-foreground text-sm mt-1">
								{steps[currentStep - 1].description}
							</p>
						</div>
						{renderStepContent()}
					</div>
				</div>
			</div>
		</div>
	);
}
