'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Upload, FileText, X, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

interface CampaignData {
  type: string;
  name: string;
  description: string;
  productUrl: string;
  uploadedFile: File | null;
}

interface CampaignInformationProps {
  data: CampaignData;
  onDataChange: (data: Partial<CampaignData>) => void;
}

export function CampaignInformation({ data, onDataChange }: CampaignInformationProps) {
  const [dragOver, setDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [autoFilledData, setAutoFilledData] = useState<{
    name?: string;
    description?: string;
  } | null>(null);

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    onDataChange({ uploadedFile: file });

    // Simulate file processing and auto-completion
    setTimeout(() => {
      // Mock auto-filled data based on file type
      const mockData = {
        name: file.name.includes('product') ? 'New Product Launch Campaign' : 'Imported Campaign',
        description: file.name.includes('product') 
          ? 'Automated campaign generated from product data to promote our latest offering with targeted messaging and strategic timing.'
          : 'Campaign automatically generated from uploaded content with optimized messaging and targeting parameters.',
      };
      
      setAutoFilledData(mockData);
      onDataChange(mockData);
      setIsProcessing(false);
    }, 2000);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.[0]) {
      handleFileUpload(files[0]);
    }
  };

  const removeFile = () => {
    onDataChange({ uploadedFile: null });
    setAutoFilledData(null);
  };

  const handleProductUrlBlur = async () => {
    if (data.productUrl && !data.name && !data.description) {
      setIsProcessing(true);
      // Simulate URL analysis and auto-completion
      setTimeout(() => {
        const mockData = {
          name: 'Product Page Campaign',
          description: 'Automated campaign generated from product URL analysis with optimized targeting and messaging based on product features and benefits.',
        };
        setAutoFilledData(mockData);
        onDataChange(mockData);
        setIsProcessing(false);
      }, 1500);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Basic Information */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="campaign-name">Campaign Name</Label>
            <Input
              id="campaign-name"
              placeholder="Enter campaign name"
              value={data.name}
              onChange={(e) => onDataChange({ name: e.target.value })}
            />
          </div>
          
          <div>
            <Label htmlFor="campaign-description">Description</Label>
            <Textarea
              id="campaign-description"
              placeholder="Describe your campaign goals and target audience"
              rows={4}
              value={data.description}
              onChange={(e) => onDataChange({ description: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="product-url">Product URL (Optional)</Label>
            <Input
              id="product-url"
              type="url"
              placeholder="https://example.com/product"
              value={data.productUrl}
              onChange={(e) => onDataChange({ productUrl: e.target.value })}
              onBlur={handleProductUrlBlur}
            />
            <p className="text-sm text-muted-foreground mt-1">
              We'll analyze your product page to auto-complete campaign details
            </p>
          </div>
        </div>

        {/* File Upload */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Campaign Materials</CardTitle>
            <CardDescription>
              Upload documents, images, or data files to auto-generate campaign content
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!data.uploadedFile ? (
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  dragOver ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
              >
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="mb-2">Drag and drop files here, or click to browse</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Supports: PDF, DOC, XLS, CSV, JPG, PNG (Max 10MB)
                </p>
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.jpg,.jpeg,.png"
                  onChange={handleFileSelect}
                />
                <Button variant="outline" asChild>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    Choose File
                  </label>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm">{data.uploadedFile.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(data.uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={removeFile}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                {isProcessing && (
                  <Alert>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <AlertDescription>
                      Processing file and generating campaign content...
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Auto-filled Data Alert */}
      {autoFilledData && !isProcessing && (
        <Alert>
          <AlertDescription>
            <span className="font-medium">Auto-completion complete!</span> We've filled in some campaign details based on your {data.uploadedFile ? 'uploaded file' : 'product URL'}. You can modify these as needed.
          </AlertDescription>
        </Alert>
      )}

      {/* Processing Indicator */}
      {isProcessing && (
        <div className="flex items-center justify-center p-8">
          <div className="text-center space-y-2">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="text-sm text-muted-foreground">
              Analyzing content and generating campaign details...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}