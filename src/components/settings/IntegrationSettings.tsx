"use client"

import * as React from "react"
import { Copy, Plus, Trash2, CreditCard, Key } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

export function IntegrationSettings() {
    const { toast } = useToast()

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        toast({
            title: "Copied to clipboard",
            description: "API Key copied successfully.",
        })
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Payment Gateways</CardTitle>
                    <CardDescription>Manage payment providers and credentials.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                            <div className="p-2 h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center">
                                <CreditCard className="h-6 w-6 text-blue-600" />
                            </div>
                            <div className="space-y-1">
                                <p className="font-medium">Stripe</p>
                                <p className="text-sm text-muted-foreground">Credit/Debit cards, Apple Pay, Google Pay</p>
                                <div className="flex gap-2">
                                    <Badge variant="outline" className="text-xs">Testing</Badge>
                                </div>
                            </div>
                        </div>
                        <Switch defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                            <div className="p-2 h-12 w-12 bg-blue-900 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xs">RZP</span>
                            </div>
                            <div className="space-y-1">
                                <p className="font-medium">Razorpay</p>
                                <p className="text-sm text-muted-foreground">UPI, Netbanking, Wallets</p>
                                <div className="flex gap-2">
                                    <Badge className="bg-green-600 hover:bg-green-700 text-xs">Active</Badge>
                                </div>
                            </div>
                        </div>
                        <Switch defaultChecked />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>API Keys</CardTitle>
                            <CardDescription>Manage access keys for third-party integrations.</CardDescription>
                        </div>
                        <Button variant="outline" size="sm">
                            <Plus className="mr-2 h-4 w-4" /> Generate New Key
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/40">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <Key className="h-4 w-4 text-muted-foreground" />
                                <p className="font-medium text-sm">Production App Key</p>
                            </div>
                            <p className="text-xs font-mono text-muted-foreground">pk_live_51M...</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Created 2 months ago</span>
                            <Button variant="ghost" size="icon" onClick={() => copyToClipboard('pk_live_51M_dummy_key')}>
                                <Copy className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-100">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/40">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <Key className="h-4 w-4 text-muted-foreground" />
                                <p className="font-medium text-sm">Staging Key</p>
                            </div>
                            <p className="text-xs font-mono text-muted-foreground">pk_test_88X...</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Created 1 week ago</span>
                            <Button variant="ghost" size="icon" onClick={() => copyToClipboard('pk_test_88X_dummy_key')}>
                                <Copy className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-100">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
