"use client"

import * as React from "react"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"

export function GeneralSettings() {
    const { toast } = useToast()
    const [loading, setLoading] = React.useState(false)

    const handleSave = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            toast({
                title: "Settings saved",
                description: "Your platform settings have been updated successfully.",
            })
        }, 1000)
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Platform Information</CardTitle>
                    <CardDescription>
                        Configure general details about your Zomato Admin platform.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="platform-name">Platform Name</Label>
                        <Input id="platform-name" defaultValue="Zomato Admin Dashboard" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="contact-email">Support Email</Label>
                        <Input id="contact-email" defaultValue="admin-support@zomato.com" type="email" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="contact-phone">Support Phone</Label>
                        <Input id="contact-phone" defaultValue="+91 98765 43210" type="tel" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>System & Maintenance</CardTitle>
                    <CardDescription>
                        Manage system-wide availability and access.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between space-x-2">
                        <div className="space-y-0.5">
                            <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                            <p className="text-sm text-muted-foreground">
                                Prevent users from accessing the platform during updates.
                            </p>
                        </div>
                        <Switch id="maintenance-mode" />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between space-x-2">
                        <div className="space-y-0.5">
                            <Label htmlFor="registration">Allow New Registrations</Label>
                            <p className="text-sm text-muted-foreground">
                                If disabled, only admins can create new user accounts.
                            </p>
                        </div>
                        <Switch id="registration" defaultChecked />
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button onClick={handleSave} disabled={loading}>
                    {loading && <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />}
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                </Button>
            </div>
        </div>
    )
}
