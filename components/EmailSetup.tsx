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
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Eye, Send, Smartphone, Monitor, Code } from "lucide-react";

interface EmailConfig {
	fromName: string;
	fromEmail: string;
	subject: string;
	template: string;
}

interface EmailSetupProps {
	emailConfig: EmailConfig;
	onEmailConfigChange: (config: Partial<EmailConfig>) => void;
}

const emailTemplates = [
	{
		id: "welcome",
		name: "Welcome Email",
		description: "Warm welcome for new subscribers",
		content: `Hi {{first_name}},

Welcome to our community! We're thrilled to have you on board.

Here's what you can expect:
• Exclusive content and updates
• Early access to new features
• Special member-only discounts

Get started by exploring our latest products.

Best regards,
{{from_name}}`,
	},
	{
		id: "product-launch",
		name: "Product Launch",
		description: "Announce new products to your audience",
		content: `Hi {{first_name}},

🎉 Big news! We're excited to introduce our latest product: {{product_name}}.

{{product_description}}

Special launch offer:
• 20% off for the first 100 customers
• Free shipping on orders over $50
• 30-day money-back guarantee

[Shop Now Button]

Limited time only - don't miss out!

Best,
{{from_name}}`,
	},
	{
		id: "cart-abandonment",
		name: "Cart Abandonment",
		description: "Recover lost sales from abandoned carts",
		content: `Hi {{first_name}},

You left something behind! Your cart is waiting for you.

Items in your cart:
{{cart_items}}

Complete your purchase now and get:
• Free shipping on your order
• 10% off with code COMEBACK10
• Fast 2-day delivery

[Complete Purchase Button]

Need help? Reply to this email - we're here to help!

Best,
{{from_name}}`,
	},
	{
		id: "newsletter",
		name: "Newsletter",
		description: "Regular updates and content for subscribers",
		content: `Hi {{first_name}},

Here's what's new this week:

📰 Latest Articles
• {{article_1_title}}
• {{article_2_title}}
• {{article_3_title}}

🎯 Featured Product
{{featured_product}}

💡 Quick Tip
{{weekly_tip}}

Thanks for being part of our community!

Best,
{{from_name}}`,
	},
];

const previewDevices = [
	{ id: "desktop", name: "Desktop", icon: Monitor },
	{ id: "mobile", name: "Mobile", icon: Smartphone },
];

export function EmailSetup({
	emailConfig,
	onEmailConfigChange,
}: EmailSetupProps) {
	const [selectedTemplate, setSelectedTemplate] = useState("welcome");
	const [previewDevice, setPreviewDevice] = useState("desktop");
	const [showAdvanced, setShowAdvanced] = useState(false);

	const currentTemplate = emailTemplates.find((t) => t.id === selectedTemplate);

	const updateConfig = (key: keyof EmailConfig, value: string) => {
		onEmailConfigChange({ [key]: value });
	};

	const applyTemplate = (template: (typeof emailTemplates)[0]) => {
		setSelectedTemplate(template.id);
		updateConfig("template", template.content);
		if (!emailConfig.subject) {
			updateConfig("subject", `${template.name} - {{company_name}}`);
		}
	};

	const sendTestEmail = () => {
		alert("Test email sent to your address!");
	};

	const previewEmail = () => {
		// Mock preview with populated variables
		const previewContent = (emailConfig?.template ?? "")
			.replace(/\{\{first_name\}\}/g, "John")
			.replace(/\{\{from_name\}\}/g, emailConfig?.fromName ?? "Your Company")
			.replace(/\{\{company_name\}\}/g, "Your Company")
			.replace(/\{\{product_name\}\}/g, "Amazing Product")
			.replace(
				/\{\{product_description\}\}/g,
				"This is an amazing product that will change your life."
			);

		return previewContent;
	};

	return (
		<div className="space-y-6">
			<div className="text-center space-y-2">
				<p className="text-muted-foreground">
					Configure your email settings and customize your message template
				</p>
			</div>

			<Tabs defaultValue="settings" className="w-full">
				<TabsList className="grid w-full grid-cols-3">
					<TabsTrigger value="settings">Email Settings</TabsTrigger>
					<TabsTrigger value="template">Template</TabsTrigger>
					<TabsTrigger value="preview">Preview & Test</TabsTrigger>
				</TabsList>

				<TabsContent value="settings" className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Sender Information</CardTitle>
							<CardDescription>
								Configure who the email appears to be from
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<Label htmlFor="from-name">From Name</Label>
									<Input
										id="from-name"
										placeholder="Your Company Name"
										value={emailConfig?.fromName ?? ""}
										onChange={(e) => updateConfig("fromName", e.target.value)}
									/>
								</div>
								<div>
									<Label htmlFor="from-email">From Email</Label>
									<Input
										id="from-email"
										type="email"
										placeholder="noreply@yourcompany.com"
										value={emailConfig?.fromEmail ?? ""}
										onChange={(e) => updateConfig("fromEmail", e.target.value)}
									/>
								</div>
							</div>

							<div>
								<Label htmlFor="subject">Email Subject</Label>
								<Input
									id="subject"
									placeholder="Welcome to our community!"
									value={emailConfig?.subject ?? ""}
									onChange={(e) => updateConfig("subject", e.target.value)}
								/>
								<p className="text-sm text-muted-foreground mt-1">
									You can use variables like {"{"}
									{"{"} first_name {"}"} {"}"} and {"{"}
									{"{"} company_name {"}"}
								</p>
							</div>
						</CardContent>
					</Card>

					{/* Advanced Settings */}
					<Card>
						<CardHeader>
							<div className="flex items-center justify-between">
								<div>
									<CardTitle>Advanced Settings</CardTitle>
									<CardDescription>
										Additional email configuration options
									</CardDescription>
								</div>
								<Switch
									checked={showAdvanced}
									onCheckedChange={setShowAdvanced}
								/>
							</div>
						</CardHeader>
						{showAdvanced && (
							<CardContent className="space-y-4">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<Label htmlFor="reply-to">Reply-To Email</Label>
										<Input
											id="reply-to"
											type="email"
											placeholder="support@yourcompany.com"
										/>
									</div>
									<div>
										<Label htmlFor="delivery-time">Delivery Time</Label>
										<Select defaultValue="immediate">
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="immediate">
													Send Immediately
												</SelectItem>
												<SelectItem value="optimal">Optimal Time</SelectItem>
												<SelectItem value="scheduled">
													Schedule for Later
												</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<Label htmlFor="priority">Email Priority</Label>
										<Select defaultValue="normal">
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="high">High</SelectItem>
												<SelectItem value="normal">Normal</SelectItem>
												<SelectItem value="low">Low</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div>
										<Label htmlFor="tracking">Email Tracking</Label>
										<Select defaultValue="enabled">
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="enabled">Enabled</SelectItem>
												<SelectItem value="disabled">Disabled</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
							</CardContent>
						)}
					</Card>
				</TabsContent>

				<TabsContent value="template" className="space-y-6">
					{/* Template Selection */}
					<Card>
						<CardHeader>
							<CardTitle>Choose Template</CardTitle>
							<CardDescription>
								Select a pre-designed template or create your own
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{emailTemplates.map((template) => (
									<Card
										key={template.id}
										className={`cursor-pointer transition-all hover:shadow-md ${
											selectedTemplate === template.id
												? "ring-2 ring-primary border-primary"
												: "hover:border-primary/50"
										}`}
										onClick={() => applyTemplate(template)}
									>
										<CardHeader className="pb-2">
											<CardTitle className="text-base">
												{template.name}
											</CardTitle>
											<CardDescription className="text-sm">
												{template.description}
											</CardDescription>
										</CardHeader>
										<CardContent className="pt-0">
											{selectedTemplate === template.id && (
												<Badge variant="default" className="text-xs">
													Selected
												</Badge>
											)}
										</CardContent>
									</Card>
								))}
							</div>
						</CardContent>
					</Card>

					{/* Template Editor */}
					<Card>
						<CardHeader>
							<CardTitle>Email Content</CardTitle>
							<CardDescription>Customize your email content.</CardDescription>
						</CardHeader>
						<CardContent>
							<Textarea
								rows={12}
								placeholder="Write your email content here..."
								value={emailConfig?.template ?? ""}
								onChange={(e) => updateConfig("template", e.target.value)}
								className="font-mono text-sm"
							/>
							<div className="mt-2 flex flex-wrap gap-2">
								<Badge variant="outline">
									{"{"}
									{"{"} first_name {"}"} {"}"}
								</Badge>
								<Badge variant="outline">
									{"{"}
									{"{"} last_name {"}"} {"}"}
								</Badge>
								<Badge variant="outline">
									{"{"}
									{"{"} company_name {"}"} {"}"}
								</Badge>
								<Badge variant="outline">
									{"{"}
									{"{"} from_name {"}"} {"}"}
								</Badge>
								<Badge variant="outline">
									{"{"}
									{"{"} product_name {"}"} {"}"}
								</Badge>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="preview" className="space-y-6">
					{/* Preview Controls */}
					<Card>
						<CardHeader>
							<CardTitle>Email Preview</CardTitle>
							<CardDescription>
								Preview how your email will look to recipients
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="flex items-center justify-between mb-4">
								<div className="flex items-center space-x-2">
									{previewDevices.map((device) => {
										const Icon = device.icon;
										return (
											<Button
												key={device.id}
												variant={
													previewDevice === device.id ? "default" : "outline"
												}
												size="sm"
												onClick={() => setPreviewDevice(device.id)}
											>
												<Icon className="h-4 w-4 mr-2" />
												{device.name}
											</Button>
										);
									})}
								</div>
								<div className="flex space-x-2">
									<Button variant="outline" size="sm">
										<Code className="h-4 w-4 mr-2" />
										View HTML
									</Button>
									<Button variant="outline" size="sm" onClick={sendTestEmail}>
										<Send className="h-4 w-4 mr-2" />
										Send Test
									</Button>
								</div>
							</div>

							{/* Email Preview */}
							<div
								className={`border rounded-lg ${
									previewDevice === "mobile" ? "max-w-sm mx-auto" : "w-full"
								}`}
							>
								<div className="bg-muted p-3 border-b">
									<div className="text-sm">
										<div>
											<span className="font-medium">From:</span>{" "}
											{emailConfig.fromName} {"<"}
											{emailConfig.fromEmail}
											{">"}
										</div>
										<div>
											<span className="font-medium">Subject:</span>{" "}
											{emailConfig.subject || "Your Subject Line"}
										</div>
									</div>
								</div>
								<div className="p-4 bg-white">
									<pre className="whitespace-pre-wrap text-sm font-sans">
										{previewEmail()}
									</pre>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Test Email */}
					<Card>
						<CardHeader>
							<CardTitle>Send Test Email</CardTitle>
							<CardDescription>
								Send a test email to verify everything looks correct
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<Label htmlFor="test-email">Test Email Address</Label>
								<Input
									id="test-email"
									type="email"
									placeholder="test@example.com"
									defaultValue={emailConfig.fromEmail}
								/>
							</div>
							<Button onClick={sendTestEmail}>
								<Send className="h-4 w-4 mr-2" />
								Send Test Email
							</Button>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
