import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function GeneralSettings() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Platform Information</CardTitle>
                    <CardDescription>Basic details about your platform.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="platformName">Platform Name</Label>
                        <Input id="platformName" defaultValue="Zomato Admin" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="supportEmail">Support Email</Label>
                        <Input id="supportEmail" defaultValue="support@zomato.com" type="email" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="supportPhone">Support Phone</Label>
                        <Input id="supportPhone" defaultValue="+91 99999 00000" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Branding</CardTitle>
                    <CardDescription>Manage logos and assets.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="h-20 w-20 bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground">Logo Preview</div>
                        <div className="grid gap-2">
                            <Label htmlFor="logo">Upload Logo</Label>
                            <Input id="logo" type="file" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button>Save Changes</Button>
            </div>
        </div>
    );
}
