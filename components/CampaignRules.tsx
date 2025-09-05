"use client";

import React, { useState, useEffect } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

interface CampaignRule {
	id: string;
	type: string;
	condition: string;
	action: string;
	enabled: boolean;
}

interface CampaignRulesProps {
	rules: CampaignRule[];
	onRulesChange: (rules: CampaignRule[]) => void;
}

const ruleTypes = [
	{
		value: "trigger",
		label: "Trigger Rule",
		description: "Automatically trigger actions based on user behavior",
	},
	{
		value: "targeting",
		label: "Targeting Rule",
		description: "Define who should receive the campaign",
	},
	{
		value: "timing",
		label: "Timing Rule",
		description: "Control when the campaign should be sent",
	},
	{
		value: "frequency",
		label: "Frequency Rule",
		description: "Limit how often users receive messages",
	},
	{
		value: "content",
		label: "Content Rule",
		description: "Customize content based on conditions",
	},
];

const conditionTemplates = {
	trigger: [
		"User visits product page",
		"User abandons cart",
		"User signs up",
		"User makes purchase",
		"User clicks email link",
	],
	targeting: [
		"User location is in US",
		"User age is between 25-45",
		"User has made purchase before",
		"User is subscribed to newsletter",
		"User engagement score > 70",
	],
	timing: [
		"Send immediately",
		"Send after 1 hour",
		"Send after 24 hours",
		"Send on weekdays only",
		"Send at optimal time",
	],
	frequency: [
		"Max 1 email per day",
		"Max 3 emails per week",
		"Wait 7 days between emails",
		"No limit",
		"Respect user preferences",
	],
	content: [
		"Show product recommendations",
		"Include discount code",
		"Personalize with user name",
		"Show local weather",
		"Include dynamic pricing",
	],
};

const actionTemplates = {
	trigger: [
		"Send welcome email",
		"Add to nurture sequence",
		"Create retargeting audience",
		"Send push notification",
		"Update user segment",
	],
	targeting: [
		"Include in campaign",
		"Exclude from campaign",
		"Send to specific list",
		"Apply custom template",
		"Set priority level",
	],
	timing: [
		"Queue for sending",
		"Schedule delivery",
		"Add to drip campaign",
		"Send test email",
		"Track engagement",
	],
	frequency: [
		"Throttle sending",
		"Skip this send",
		"Update frequency cap",
		"Move to lower frequency list",
		"Send preference center",
	],
	content: [
		"Customize email content",
		"Show dynamic content",
		"Apply A/B test variant",
		"Include personalized offer",
		"Update content blocks",
	],
};

// Mock generated rules based on campaign type
const generateMockRules = (): CampaignRule[] => [
	{
		id: "1",
		type: "trigger",
		condition: "User visits product page",
		action: "Add to nurture sequence",
		enabled: true,
	},
	{
		id: "2",
		type: "targeting",
		condition: "User has made purchase before",
		action: "Include in campaign",
		enabled: true,
	},
	{
		id: "3",
		type: "timing",
		condition: "Send after 24 hours",
		action: "Queue for sending",
		enabled: true,
	},
	{
		id: "4",
		type: "frequency",
		condition: "Max 3 emails per week",
		action: "Throttle sending",
		enabled: false,
	},
];

export function CampaignRules({ rules, onRulesChange }: CampaignRulesProps) {
	const [editingRule, setEditingRule] = useState<string | null>(null);
	const [showAddForm, setShowAddForm] = useState(false);
	const [newRule, setNewRule] = useState<Partial<CampaignRule>>({
		type: "",
		condition: "",
		action: "",
		enabled: true,
	});

	// Generate initial rules if none exist
	useEffect(() => {
		if (rules.length === 0) {
			const mockRules = generateMockRules();
			onRulesChange(mockRules);
		}
	}, [rules.length, onRulesChange]);

	const addRule = () => {
		if (newRule.type && newRule.condition && newRule.action) {
			const rule: CampaignRule = {
				id: Date.now().toString(),
				type: newRule.type,
				condition: newRule.condition,
				action: newRule.action,
				enabled: newRule.enabled ?? true,
			};
			onRulesChange([...rules, rule]);
			setNewRule({ type: "", condition: "", action: "", enabled: true });
			setShowAddForm(false);
		}
	};

	const updateRule = (id: string, updates: Partial<CampaignRule>) => {
		const updatedRules = rules.map((rule) =>
			rule.id === id ? { ...rule, ...updates } : rule
		);
		onRulesChange(updatedRules);
	};

	const deleteRule = (id: string) => {
		const updatedRules = rules.filter((rule) => rule.id !== id);
		onRulesChange(updatedRules);
	};

	const toggleRule = (id: string) => {
		updateRule(id, { enabled: !rules.find((r) => r.id === id)?.enabled });
	};

	const getRuleTypeInfo = (type: string) => {
		return ruleTypes.find((t) => t.value === type);
	};

	return (
		<div className="space-y-6">
			<div className="text-center space-y-2">
				<p className="text-muted-foreground">
					Manage your campaign rules to control targeting, timing, and behavior
				</p>
			</div>

			{/* Generated Rules Alert */}
			{rules.length > 0 && (
				<Alert>
					<AlertDescription>
						<span className="font-medium">Campaign rules generated!</span> We've
						created some recommended rules based on your campaign type. You can
						modify, enable/disable, or delete them as needed.
					</AlertDescription>
				</Alert>
			)}

			{/* Existing Rules */}
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<h3>Campaign Rules ({rules.length})</h3>
					<Button onClick={() => setShowAddForm(true)} size="sm">
						<Plus className="h-4 w-4 mr-2" />
						Add Rule
					</Button>
				</div>

				{rules.map((rule) => (
					<Card key={rule.id}>
						<CardContent className="p-4">
							<div className="flex items-start justify-between">
								<div className="flex-1 space-y-2">
									<div className="flex items-center space-x-2">
										<Badge variant={rule.enabled ? "default" : "secondary"}>
											{getRuleTypeInfo(rule.type)?.label}
										</Badge>
										<Switch
											checked={rule.enabled}
											onCheckedChange={() => toggleRule(rule.id)}
										/>
									</div>

									{editingRule === rule.id ? (
										<div className="space-y-3">
											<div>
												<Label>Condition</Label>
												<Select
													value={rule.condition}
													onValueChange={(value) =>
														updateRule(rule.id, { condition: value })
													}
												>
													<SelectTrigger>
														<SelectValue />
													</SelectTrigger>
													<SelectContent>
														{conditionTemplates[
															rule.type as keyof typeof conditionTemplates
														]?.map((condition) => (
															<SelectItem key={condition} value={condition}>
																{condition}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</div>

											<div>
												<Label>Action</Label>
												<Select
													value={rule.action}
													onValueChange={(value) =>
														updateRule(rule.id, { action: value })
													}
												>
													<SelectTrigger>
														<SelectValue />
													</SelectTrigger>
													<SelectContent>
														{actionTemplates[
															rule.type as keyof typeof actionTemplates
														]?.map((action) => (
															<SelectItem key={action} value={action}>
																{action}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</div>
										</div>
									) : (
										<div className="space-y-1">
											<p>
												<span className="font-medium">When:</span>{" "}
												{rule.condition}
											</p>
											<p>
												<span className="font-medium">Then:</span> {rule.action}
											</p>
										</div>
									)}
								</div>

								<div className="flex items-center space-x-2 ml-4">
									{editingRule === rule.id ? (
										<>
											<Button size="sm" onClick={() => setEditingRule(null)}>
												<Save className="h-4 w-4" />
											</Button>
											<Button
												size="sm"
												variant="outline"
												onClick={() => setEditingRule(null)}
											>
												<X className="h-4 w-4" />
											</Button>
										</>
									) : (
										<>
											<Button
												size="sm"
												variant="outline"
												onClick={() => setEditingRule(rule.id)}
											>
												<Edit className="h-4 w-4" />
											</Button>
											<Button
												size="sm"
												variant="outline"
												onClick={() => deleteRule(rule.id)}
											>
												<Trash2 className="h-4 w-4" />
											</Button>
										</>
									)}
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Add New Rule Form */}
			{showAddForm && (
				<Card>
					<CardHeader>
						<CardTitle>Add New Rule</CardTitle>
						<CardDescription>
							Create a custom rule to control your campaign behavior
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div>
							<Label>Rule Type</Label>
							<Select
								value={newRule.type}
								onValueChange={(value) =>
									setNewRule({
										...newRule,
										type: value,
										condition: "",
										action: "",
									})
								}
							>
								<SelectTrigger>
									<SelectValue placeholder="Choose rule type" />
								</SelectTrigger>
								<SelectContent>
									{ruleTypes.map((type) => (
										<SelectItem key={type.value} value={type.value}>
											<div>
												<div>{type.label}</div>
												<div className="text-xs text-muted-foreground">
													{type.description}
												</div>
											</div>
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						{newRule.type && (
							<>
								<div>
									<Label>Condition</Label>
									<Select
										value={newRule.condition}
										onValueChange={(value) =>
											setNewRule({ ...newRule, condition: value })
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Choose condition" />
										</SelectTrigger>
										<SelectContent>
											{conditionTemplates[
												newRule.type as keyof typeof conditionTemplates
											]?.map((condition) => (
												<SelectItem key={condition} value={condition}>
													{condition}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								<div>
									<Label>Action</Label>
									<Select
										value={newRule.action}
										onValueChange={(value) =>
											setNewRule({ ...newRule, action: value })
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Choose action" />
										</SelectTrigger>
										<SelectContent>
											{actionTemplates[
												newRule.type as keyof typeof actionTemplates
											]?.map((action) => (
												<SelectItem key={action} value={action}>
													{action}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
							</>
						)}

						<div className="flex justify-between pt-4">
							<Button variant="outline" onClick={() => setShowAddForm(false)}>
								Cancel
							</Button>
							<Button
								onClick={addRule}
								disabled={
									!newRule.type || !newRule.condition || !newRule.action
								}
							>
								Add Rule
							</Button>
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	);
}
